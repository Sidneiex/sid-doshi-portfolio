"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Interactive Particle Canvas ─────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }[] = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
      });
    }

    function animate() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 116, ${0.25 + p.size * 0.1})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 165, 116, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    function handleMouse(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    canvas.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0"
      style={{ touchAction: "none" }}
    />
  );
}

/* ─── Type Writer ─────────────────────────────────────────── */
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, text, delay]);

  return (
    <span ref={ref} className="font-mono text-sm text-accent-500/70">
      {displayed}
      <span className="animate-pulse text-accent-500">|</span>
    </span>
  );
}

/* ─── Skill Orbit ─────────────────────────────────────────── */
const techSkills = [
  "React",
  "Next.js",
  "Python",
  "TypeScript",
  "Node.js",
  "Framer Motion",
  "Three.js",
  "SQL",
];

function SkillOrbit() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-500 shadow-[0_0_16px_rgba(212,165,116,0.4)]" />

      <div className="absolute inset-4 rounded-full border border-accent-500/10" />
      <div className="absolute inset-12 rounded-full border border-accent-500/5" />

      {techSkills.map((skill, i) => {
        const angle = (i / techSkills.length) * 360;
        const radius = 110;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={skill}
            className="absolute top-1/2 left-1/2"
            style={{
              x: x - 30,
              y: y - 10,
            }}
            animate={{
              x: [x - 30, x - 30 + Math.sin(i) * 8, x - 30],
              y: [y - 10, y - 10 + Math.cos(i) * 8, y - 10],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-[10px] tracking-widest uppercase text-muted hover:text-accent-500 transition-colors cursor-default whitespace-nowrap font-mono">
              {skill}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main Export ──────────────────────────────────────────── */
export function ExperimentalSection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs text-accent-500 tracking-[0.3em] uppercase mb-4 font-mono">
            — The Other Side —
          </p>
          <h2 className="font-serif text-5xl md:text-6xl tracking-wide text-foreground mb-4 font-bold">
            Experimental
          </h2>
          <p className="text-muted max-w-lg mx-auto leading-relaxed">
            Not just a filmmaker. Interactive experiments, generative visuals,
            and code-driven motion — where engineering meets aesthetics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interactive Particle Field */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-square rounded-2xl overflow-hidden border border-foreground/5 bg-background-alt group hover:border-accent-500/15 transition-all duration-500"
          >
            <ParticleField />
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-xs text-muted tracking-widest uppercase mb-1 font-mono">
                Interactive
              </p>
              <p className="text-sm text-foreground font-medium">
                Particle Network — move your cursor
              </p>
            </div>
            <div className="absolute top-6 right-6 z-10">
              <span className="text-[10px] tracking-widest uppercase text-accent-500/50 border border-accent-500/15 px-2 py-1 rounded-full font-mono">
                Canvas API
              </span>
            </div>
          </motion.div>

          {/* Right column: Code + Skills */}
          <div className="flex flex-col gap-8">
            {/* Code block */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl border border-foreground/5 bg-background-alt p-8 hover:border-accent-500/15 transition-all duration-500"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-accent-600/50" />
                <div className="w-3 h-3 rounded-full bg-accent-500/30" />
                <div className="w-3 h-3 rounded-full bg-accent-400/20" />
                <span className="ml-auto text-[10px] text-muted tracking-widest uppercase font-mono">
                  terminal
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-accent-500/40 text-xs font-mono">$</span>
                  <TypeWriter text="const sid = new Creator();" delay={300} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent-500/40 text-xs font-mono">$</span>
                  <TypeWriter
                    text='sid.blend("film", "code");'
                    delay={1800}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent-500/40 text-xs font-mono">$</span>
                  <TypeWriter
                    text="// output: something new"
                    delay={3200}
                  />
                </div>
              </div>
            </motion.div>

            {/* Skill orbit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-2xl border border-foreground/5 bg-background-alt p-8 flex-1 flex flex-col items-center justify-center hover:border-accent-500/15 transition-all duration-500"
            >
              <p className="text-xs text-muted tracking-widest uppercase mb-6 font-mono">
                Tech Stack
              </p>
              <SkillOrbit />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
