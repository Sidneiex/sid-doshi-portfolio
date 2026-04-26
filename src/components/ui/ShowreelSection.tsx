"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import { LightboxVideoPlayer } from "./LightboxVideoPlayer";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const horizontalVideos = [
  { id: "TLN6IQtjKHU", index: 1 },
  { id: "0VUyOxHMHcU", index: 2 },
  { id: "fNcu_ocV9k0", index: 3 },
  { id: "OGShLvHHa4E", index: 4 },
  { id: "HIr7zGTdZpI", index: 5 },
];

const shortVideos = [
  { id: "zR0c_Rsj_tc", index: 1 },
  { id: "aYpf0-Ahlj8", index: 2 },
  { id: "A9QnraTMTPk", index: 3 },
];

/* ═══════════════════════════════════════════════════════════════
   TEXT SCRAMBLE HOOK
   ═══════════════════════════════════════════════════════════════ */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useTextScramble(target: string, trigger: boolean, speed = 30) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const length = target.length;

    const interval = setInterval(() => {
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= length) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [target, trigger, speed]);

  return display;
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC VIDEO CARD
   ═══════════════════════════════════════════════════════════════ */

function MagneticVideoCard({
  videoId,
  index,
  onPlay,
}: {
  videoId: string;
  index: number;
  onPlay: (id: string, isVertical: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;

    el.style.transform = `
      perspective(800px)
      rotateY(${deltaX * 6}deg)
      rotateX(${-deltaY * 6}deg)
      translateX(${deltaX * 10}px)
      translateY(${deltaY * 6}px)
      scale(1.02)
    `;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) translateX(0) translateY(0) scale(1)";
    }
  }, []);

  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 8, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="flex-shrink-0"
    >
      <div
        ref={cardRef}
        onClick={() => onPlay(videoId, false)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="magnetic-card relative w-[400px] sm:w-[460px] lg:w-[540px] aspect-video rounded-2xl overflow-hidden cursor-pointer group border border-foreground/5 hover:border-accent-500/20"
        style={{ transformStyle: "preserve-3d" }}
        id={`showreel-card-${index}`}
      >
        <div className="absolute inset-0 bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={`Project ${index}`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
          />
        </div>

        <div className="vignette-overlay absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-18 h-18 rounded-full border border-foreground/15 flex items-center justify-center backdrop-blur-sm bg-black/20 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 ease-out group-hover:border-accent-500/40 group-hover:shadow-[0_0_40px_rgba(212,165,116,0.15)]">
            <Play className="w-7 h-7 text-foreground/80 ml-1" />
          </div>
        </div>

        <div className="absolute top-5 left-6">
          <span className="font-mono text-sm text-foreground/15 group-hover:text-accent-400/50 transition-colors duration-500 tracking-widest">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHORTS CARD
   ═══════════════════════════════════════════════════════════════ */

function ShortsCard({
  videoId,
  index,
  isCenter,
  onPlay,
}: {
  videoId: string;
  index: number;
  isCenter: boolean;
  onPlay: (id: string, isVertical: boolean) => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const bobClass =
    index === 0
      ? "float-bob"
      : index === 1
      ? "float-bob-delayed-1"
      : "float-bob-delayed-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15 + 0.2,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`${bobClass} ${isCenter ? "z-10" : "z-0"}`}
    >
      <div
        onClick={() => onPlay(videoId, true)}
        className={`spotlight-card relative rounded-3xl overflow-hidden cursor-pointer group border border-accent-500/15 hover:border-accent-500/30 transition-all duration-500 ${
          isCenter
            ? "w-[200px] sm:w-[240px] aspect-[9/16]"
            : "w-[170px] sm:w-[200px] aspect-[9/16] opacity-75 hover:opacity-100"
        }`}
        id={`shorts-card-${index}`}
      >
        <div className="absolute inset-0 bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={`Short ${index + 1}`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-foreground/15 flex items-center justify-center backdrop-blur-sm bg-black/20 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 ease-out group-hover:border-accent-500/40 group-hover:shadow-[0_0_30px_rgba(212,165,116,0.2)]">
            <Play className="w-5 h-5 text-foreground/80 ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="text-[10px] tracking-widest uppercase text-foreground/30 font-mono bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-foreground/5 group-hover:text-accent-400/70 group-hover:border-accent-500/15 transition-all duration-500">
            Short
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════════════════════════════ */

function ScrollProgress({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;
      setProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return (
    <div className="scroll-progress-track w-full max-w-xs mx-auto h-[2px] mt-8">
      <div
        className="scroll-progress-fill"
        style={{ width: `${Math.max(progress, 5)}%` }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export function ShowreelSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isVertical, setIsVertical] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrambledText = useTextScramble("SELECTIVE", headerInView);

  function handlePlay(id: string, vertical: boolean) {
    setActiveVideo(id);
    setIsVertical(vertical);
  }

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-background-alt relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.02)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-gradient-to-r from-transparent to-accent-500"
              />
              <span className="text-xs text-accent-500 tracking-[0.3em] uppercase font-mono">
                Work
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-gradient-to-l from-transparent to-accent-500"
              />
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-foreground mb-6 font-bold">
              <span className="scramble-glow inline-block">{scrambledText}</span>
            </h2>

            <p className="text-muted max-w-lg mx-auto leading-relaxed text-base">
              A curated selection — not everything, just the work that matters.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Film Strip */}
        <div className="mb-4 px-4 sm:px-8">
          <div className="flex items-center gap-3 mb-8 max-w-7xl mx-auto">
            <div className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(212,165,116,0.4)]" />
            <span className="text-xs text-muted tracking-[0.2em] uppercase font-mono">
              Films — Drag to explore
            </span>
            <div className="flex-1 h-px bg-foreground/5" />
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="film-strip-scroll flex gap-6 px-8 sm:px-16 lg:px-24 pb-4 cursor-grab select-none"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <div className="flex-shrink-0 w-4 lg:w-12" />
          {horizontalVideos.map((video) => (
            <MagneticVideoCard
              key={video.id}
              videoId={video.id}
              index={video.index}
              onPlay={handlePlay}
            />
          ))}
          <div className="flex-shrink-0 w-4 lg:w-12" />
        </div>

        <ScrollProgress scrollRef={scrollContainerRef} />

        {/* Shorts Section */}
        <div className="mt-32 px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyber-400 shadow-[0_0_8px_rgba(148,163,184,0.4)]" />
                <span className="text-xs text-cyber-400 tracking-[0.2em] uppercase font-mono">
                  Shorts
                </span>
                <div className="w-8 h-px bg-cyber-400/20" />
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-3 font-semibold">
                Quick Cuts
              </h3>
              <p className="text-muted text-sm max-w-sm mx-auto">
                Vertical stories. Bite-sized cinema.
              </p>
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {shortVideos.map((video, i) => (
              <ShortsCard
                key={video.id}
                videoId={video.id}
                index={i}
                isCenter={i === 1}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>
      </div>

      <LightboxVideoPlayer
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoId={activeVideo || ""}
        isVertical={isVertical}
      />
    </section>
  );
}
