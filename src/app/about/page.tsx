"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ─── Animated counter ──────────────────────────────────────── */
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Section reveal wrapper ────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax text reveal ──────────────────────────────────── */
function ParallaxText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Story act section ─────────────────────────────────────── */
function StoryAct({
  act,
  heading,
  body,
  index,
}: {
  act: string;
  heading: string;
  body: string;
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ghost act label */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none font-display text-[12vw] leading-none text-ghost opacity-60 ${
          isEven ? "-left-8" : "-right-8"
        }`}
        aria-hidden="true"
      >
        {act}
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <Reveal delay={0.1}>
          <div
            className={`flex flex-col ${
              isEven ? "items-start" : "items-end"
            } gap-6`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-accent-500 text-xs font-semibold tracking-[0.3em] uppercase">
                {act}
              </span>
            </div>
            <h2
              className={`text-5xl sm:text-6xl md:text-7xl font-display tracking-widest uppercase text-foreground leading-none ${
                isEven ? "text-left" : "text-right"
              }`}
            >
              {heading}
            </h2>
            <p
              className={`text-lg text-muted leading-[1.9] max-w-2xl font-serif ${
                isEven ? "text-left" : "text-right"
              }`}
            >
              {body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Skills ────────────────────────────────────────────────── */
const skills = [
  { label: "Adobe Premiere Pro", icon: "🎬" },
  { label: "After Effects", icon: "✨" },
  { label: "DaVinci Resolve", icon: "🎨" },
  { label: "Figma", icon: "🖌️" },
  { label: "React / Next.js", icon: "⚛️" },
  { label: "Python", icon: "🐍" },
  { label: "TypeScript", icon: "⚡" },
  { label: "C++", icon: "⚙️" },
];

/* ─── Stats ─────────────────────────────────────────────────── */
const stats = [
  { value: 500, suffix: "K+", label: "Instagram Views" },
  { value: 2, suffix: "M+", label: "Total Reach" },
  { value: 4, suffix: "+", label: "Websites Delivered" },
  { value: 1, suffix: "", label: "Documentary Film" },
];

const acts = [
  {
    act: "Act I",
    heading: "The Spark",
    body: "Born in Pune. Built his first website at 17. Picked up a camera around the same time. Realized early that storytelling and systems were not opposites — they were the same instinct expressed differently. Enrolled in Computer Science and Entrepreneurship at FLAME University not to choose between the two, but to master both.",
  },
  {
    act: "Act II",
    heading: "First Moves",
    body: "At 19, joined PSYCAT-pro as a Business Technologist. Rebuilt their HR platform from scratch — sales went up 21%. Built and ran an ambassador program that generated real revenue. Sat across from investors and corporate clients in strategic meetings. At 20, stepped into data science — Python, SQL, machine learning, generative AI. But the camera kept pulling him back to the set.",
  },
  {
    act: "Act III",
    heading: "The Company",
    body: "Co-founded WhyUs Creatives in February 2024. Delivered professional websites for clients across India. Managed social media strategies that crossed 500,000 Instagram views and 2 million total reach. Then came the project that changed everything — a cinematic documentary on solar energy's socioeconomic impact in rural Rajasthan. A film made for communities that had never seen a camera crew. Still one of the most important things he has made.",
  },
  {
    act: "Act IV",
    heading: "What\u2019s Next",
    body: "Now building at the intersection of film and code. Combining cinematic storytelling with interactive, code-driven experiences. Every project is a blend of both worlds — visual narratives powered by robust engineering. The camera and the keyboard sit side by side. Neither collects dust.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 -mt-20 overflow-hidden bg-background">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,68,51,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.4] mb-8"
          >
            &ldquo;Some people choose between code and camera.
            <br />
            <span className="text-accent-gradient">I never had to.</span>
            &rdquo;
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="accent-rule my-8 max-w-xs mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <p className="font-display text-xl tracking-[0.3em] uppercase text-foreground mb-1">
              Siddharth Doshi
            </p>
            <p className="font-serif italic text-sm text-accent-500 tracking-widest">
              Filmmaker · Developer · Creator
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-12"
          >
            <Link
              href="/videos"
              id="about-see-work-btn"
              className="border border-accent-500/50 px-8 py-4 rounded text-accent-500 font-bold uppercase tracking-[0.15em] text-sm inline-flex items-center gap-2 hover:bg-accent-500 hover:text-background hover:shadow-[0_0_40px_rgba(255,68,51,0.35)] transition-all duration-300 group"
            >
              See My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/40"
        >
          <span className="text-xs tracking-widest uppercase">
            Scroll to read
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── LARGE TYPOGRAPHY INTRO ──────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <ParallaxText>
            <h2 className="font-display text-6xl sm:text-7xl md:text-[8rem] leading-[0.9] tracking-widest uppercase text-foreground">
              Film
              <span className="text-accent-gradient font-serif italic normal-case tracking-normal text-5xl sm:text-6xl md:text-8xl block mt-2">
                meets
              </span>
              Code
            </h2>
          </ParallaxText>

          <ParallaxText className="mt-16">
            <p className="text-xl md:text-2xl text-muted leading-[1.8] max-w-3xl font-serif">
              I sit at the intersection of two worlds that rarely overlap.
              Cinematic visual storytelling on one hand — robust software
              engineering on the other. This portfolio is the proof that they
              belong together.
            </p>
          </ParallaxText>
        </div>
      </section>

      {/* ── DIVIDER ───────────────────────────────────────────── */}
      <div className="accent-rule mx-8" />

      {/* ── STORY ACTS ────────────────────────────────────────── */}
      {acts.map((act, i) => (
        <StoryAct key={act.act} {...act} index={i} />
      ))}

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-surface border-y border-foreground/5 overflow-hidden">
        <Reveal>
          <div className="container mx-auto max-w-6xl">
            <p className="text-center text-xs text-muted/60 tracking-[0.3em] uppercase mb-16">
              — By the numbers —
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="font-display text-5xl md:text-6xl text-accent-gradient tracking-widest">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2200}
                    />
                  </span>
                  <span className="text-xs text-muted tracking-[0.2em] uppercase font-semibold">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SKILLS GRID ───────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs text-muted/60 tracking-[0.3em] uppercase mb-4">
                — Toolkit —
              </p>
              <h2 className="font-display text-5xl tracking-widest uppercase text-foreground">
                Skills
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 0 30px rgba(255,68,51,0.15)",
                  borderColor: "rgba(255,68,51,0.3)",
                }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-foreground/5 bg-surface transition-colors duration-300 group cursor-default"
              >
                <span className="text-3xl">{skill.icon}</span>
                <span className="text-xs text-muted group-hover:text-accent-500 text-center tracking-wide transition-colors duration-300">
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="relative py-36 px-4 bg-background-alt border-t border-foreground/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,68,51,0.05)_0%,transparent_65%)] pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Reveal>
            <p className="text-xs text-accent-500 tracking-[0.3em] uppercase mb-6">
              — Ready? —
            </p>
            <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.2] mb-10">
              &ldquo;Got a vision?
              <br />
              <span className="text-accent-gradient">
                Let&apos;s make it real.&rdquo;
              </span>
            </h2>
            <Link
              href="/contact"
              id="about-start-project-btn"
              className="border border-accent-500/50 inline-flex items-center gap-2 px-10 py-5 rounded text-accent-500 font-bold uppercase tracking-[0.2em] text-sm hover:bg-accent-500 hover:text-background hover:shadow-[0_0_60px_rgba(255,68,51,0.4)] transition-all duration-500 group"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
