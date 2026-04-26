"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA — Real videos
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
   TILT CARD
   ═══════════════════════════════════════════════════════════════ */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.92,
    filter: "blur(6px)",
    rotateX: 8,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

function TiltCard({
  videoId,
  index,
  isVertical,
  onPlay,
}: {
  videoId: string;
  index: number;
  isVertical?: boolean;
  onPlay: (id: string, vertical: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${
      x * 10
    }deg) translateZ(8px)`;
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative"
    >
      <span
        className="absolute -top-6 -left-2 font-serif text-8xl leading-none text-ghost pointer-events-none select-none z-0 font-bold"
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")}
      </span>

      <div
        ref={cardRef}
        onClick={() => onPlay(videoId, !!isVertical)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative group rounded-xl overflow-hidden cursor-pointer bg-surface border border-foreground/5 transition-all duration-300 hover:border-accent-500/20 hover:shadow-[0_0_30px_rgba(212,165,116,0.08)] z-10 ${
          isVertical ? "aspect-[9/16]" : "aspect-video"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease, box-shadow 0.3s ease",
        }}
        id={`video-card-${index}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl}
          alt={`Video ${index}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 rounded-full border border-accent-500/50 flex items-center justify-center backdrop-blur-sm bg-black/30 shadow-[0_0_24px_rgba(212,165,116,0.15)] transition-transform duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 text-accent-500 fill-accent-500 ml-1" />
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <span className="font-mono text-2xl text-foreground/15 group-hover:text-accent-500/50 transition-colors duration-300">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        {isVertical && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="text-[10px] tracking-widest uppercase text-foreground/30 font-mono bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-foreground/5">
              Short
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════════════════════════════ */

function VideoLightbox({
  videoId,
  isVertical,
  onClose,
}: {
  videoId: string;
  isVertical: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {videoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-accent-500 transition-all duration-200"
            aria-label="Close video"
            id="lightbox-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative bg-black rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] ${
              isVertical
                ? "w-full max-w-sm aspect-[9/16] max-h-[85vh]"
                : "w-full max-w-5xl aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isVertical, setIsVertical] = useState(false);

  function handlePlay(id: string, vertical: boolean) {
    setActiveVideo(id);
    setIsVertical(vertical);
  }

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,165,116,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-accent-500 tracking-[0.3em] uppercase mb-4 font-mono"
          >
            — Selective Work —
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl tracking-wide text-foreground mb-4 font-bold"
          >
            Videos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted text-base max-w-md mx-auto"
          >
            A curated selection — not everything, just the work that matters. Click any frame to watch.
          </motion.p>
        </div>
      </section>

      {/* Horizontal Videos */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl" style={{ perspective: "1200px" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(212,165,116,0.4)]" />
            <span className="text-xs text-muted tracking-[0.2em] uppercase font-mono">
              Films
            </span>
            <div className="flex-1 h-px bg-foreground/5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {horizontalVideos.map((video) => (
              <TiltCard
                key={video.id}
                videoId={video.id}
                index={video.index}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shorts Videos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="container mx-auto max-w-7xl" style={{ perspective: "1200px" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-cyber-400 shadow-[0_0_8px_rgba(148,163,184,0.4)]" />
            <span className="text-xs text-cyber-400 tracking-[0.2em] uppercase font-mono">
              Shorts
            </span>
            <div className="flex-1 h-px bg-foreground/5" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 max-w-3xl mx-auto">
            {shortVideos.map((video) => (
              <TiltCard
                key={video.id}
                videoId={video.id}
                index={video.index}
                isVertical
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeVideo && (
        <VideoLightbox
          videoId={activeVideo}
          isVertical={isVertical}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
