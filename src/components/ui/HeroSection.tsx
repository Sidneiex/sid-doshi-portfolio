"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Camera Layers SVG (deconstructed on scroll) ─────────── */
function CameraLayers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".cam-layer");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      });

      layers.forEach((layer, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        const distance = 60 + i * 40;
        gsap.to(layer, {
          y: direction * distance,
          x: direction * (20 + i * 15),
          rotation: direction * (3 + i * 2),
          opacity: 0.3,
          scale: 1.05 + i * 0.02,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1.5,
          },
        });
      });

      gsap.from(".hero-title-line", {
        y: 80,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-text-block",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-alt" />

      {/* Camera deconstruction layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Layer 1: Outer body */}
        <div className="cam-layer absolute w-[280px] h-[200px] sm:w-[400px] sm:h-[280px] md:w-[500px] md:h-[350px] rounded-3xl border border-accent-500/15 bg-surface/40 backdrop-blur-sm shadow-[0_0_60px_rgba(212,165,116,0.06)]" />

        {/* Layer 2: Lens mount ring */}
        <div className="cam-layer absolute w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] rounded-full border-2 border-accent-400/20 bg-surface-2/30 shadow-[inset_0_0_40px_rgba(212,165,116,0.04)]" />

        {/* Layer 3: Sensor / circuit board */}
        <div className="cam-layer absolute w-[120px] h-[90px] sm:w-[180px] sm:h-[130px] md:w-[220px] md:h-[160px] rounded-xl border border-cyber-400/30 bg-background-alt/60">
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 220 160">
            <line x1="10" y1="40" x2="100" y2="40" stroke="var(--color-cyber-400)" strokeWidth="0.5" />
            <line x1="10" y1="80" x2="80" y2="80" stroke="var(--color-cyber-400)" strokeWidth="0.5" />
            <line x1="10" y1="120" x2="120" y2="120" stroke="var(--color-cyber-400)" strokeWidth="0.5" />
            <line x1="140" y1="20" x2="140" y2="140" stroke="var(--color-accent-400)" strokeWidth="0.5" />
            <line x1="180" y1="30" x2="180" y2="130" stroke="var(--color-accent-400)" strokeWidth="0.5" />
            <rect x="90" y="55" width="40" height="50" rx="4" fill="none" stroke="var(--color-cyber-400)" strokeWidth="1" opacity="0.5" />
            <circle cx="110" cy="80" r="12" fill="none" stroke="var(--color-accent-400)" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Layer 4: The chip */}
        <div className="cam-layer absolute w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] rounded-lg border border-cyber-400/40 bg-cyber-500/5 flex items-center justify-center">
          <span className="font-mono text-cyber-400 text-[10px] sm:text-xs opacity-50 select-none">
            {'</>'}
          </span>
        </div>
      </div>

      {/* Hero text content */}
      <div className="hero-text-block relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="hero-title-line flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-px bg-accent-500" />
          <span className="text-accent-400 text-sm font-medium tracking-[0.25em] uppercase font-mono">
            Filmmaker & Developer
          </span>
          <div className="w-10 h-px bg-accent-500" />
        </div>

        <h1 className="hero-title-line font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-foreground leading-[0.9] mb-4 font-bold">
          I Create
        </h1>
        <h1 className="hero-title-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-accent-gradient tracking-normal leading-[1.1] mb-2 font-bold">
          Stories
        </h1>
        <h1 className="hero-title-line font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-foreground leading-[0.9] font-bold">
          & <span className="text-cyber-gradient">Systems</span>
        </h1>

        <p className="hero-title-line mt-8 text-lg sm:text-xl text-muted max-w-xl mx-auto leading-relaxed">
          Film direction meets software engineering. Cinematic narratives and
          clean code — crafted with the same precision.
        </p>

        <div className="hero-title-line mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="border border-accent-500/40 px-8 py-4 rounded-lg text-accent-400 font-semibold uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-accent-500 hover:text-background hover:shadow-[0_0_30px_rgba(212,165,116,0.2)]"
            id="hero-cta-btn"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/videos"
            className="border border-foreground/15 px-8 py-4 rounded-lg text-foreground text-sm font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:border-accent-500/40 hover:text-accent-400 transition-all duration-300"
            id="hero-reel-btn"
          >
            Watch My Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-xs text-muted/50 tracking-widest uppercase font-mono">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent-500/40 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="-mt-20">
      <CameraLayers />
    </section>
  );
}
