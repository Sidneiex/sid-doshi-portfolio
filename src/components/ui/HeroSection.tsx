"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="border border-accent-500/50 px-8 py-4 rounded text-accent-500 font-bold uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-accent-500 hover:text-background hover:shadow-[0_0_40px_rgba(255,68,51,0.35)] transform-gpu"
      id="hero-cta-btn"
    >
      {children}
    </a>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/70 md:bg-background/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1535016120720-40c746a51d27?q=80&w=2670&auto=format&fit=crop"
          alt="Cinematic Portfolio — Sid Doshi"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Film scan-lines overlay */}
      <div
        className="absolute inset-0 z-5 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-500 text-xs font-semibold tracking-[0.3em] uppercase">
              Filmmaker & Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="text-5xl sm:text-6xl md:text-8xl font-display tracking-widest text-foreground uppercase leading-none"
          >
            I Create
            <br />
            <span className="font-serif italic font-normal text-accent-gradient tracking-normal normal-case text-5xl sm:text-6xl md:text-7xl">
              Stories
            </span>
            <br />& Systems
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 text-base sm:text-lg text-muted max-w-lg leading-relaxed"
          >
            Film direction meets software engineering. Cinematic narratives and
            clean code — crafted with the same precision.{" "}
            <span className="text-foreground/70">
              A portfolio by Sid Doshi.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton href="/contact">
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <Link
              href="/videos"
              className="border border-foreground/15 px-8 py-4 rounded text-foreground text-sm font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:border-accent-500/50 hover:text-accent-500 transition-all duration-300"
              id="hero-reel-btn"
            >
              Watch My Work
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted/50 tracking-widest uppercase">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-accent-500/50 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
