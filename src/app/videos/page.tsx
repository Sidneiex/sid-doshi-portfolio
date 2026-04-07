"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const videos = [
  {
    id: "01",
    title: "BNP TV Ad",
    client: "BNP Paribas",
    thumbnail:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80",
    videoId: "LXb3EKWsInQ",
    platform: "youtube",
  },
  {
    id: "02",
    title: "Sports Documentary",
    client: "Personal Project",
    thumbnail:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    videoId: "aqz-KE-bpKQ",
    platform: "youtube",
  },
  {
    id: "03",
    title: "Skate Brand",
    client: "Urban Skate Co.",
    thumbnail:
      "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&q=80",
    videoId: "ysz5S6PUM-U",
    platform: "youtube",
  },
  {
    id: "04",
    title: "Lux Le Morne",
    client: "Lux Hotels",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    videoId: "jNQXAC9IVRw",
    platform: "youtube",
  },
  {
    id: "05",
    title: "Team Building",
    client: "Infosys",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    videoId: "ZqXmF1wuPKA",
    platform: "youtube",
  },
  {
    id: "06",
    title: "Cinematic Teaser",
    client: "Dr. Reddy's Labs",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    videoId: "lE6RYpe9IT0",
    platform: "youtube",
  },
  {
    id: "07",
    title: "Viral Brand Film",
    client: "Confidential",
    thumbnail:
      "https://images.unsplash.com/photo-1588666579899-2e1bb18b6fc8?w=800&q=80",
    videoId: "WbJgEgR2Oio",
    platform: "youtube",
  },
  {
    id: "08",
    title: "Sports Highlight",
    client: "Decathlon India",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    videoId: "fJ9rUzIMcZQ",
    platform: "youtube",
  },
  {
    id: "09",
    title: "Solar Rajasthan",
    client: "Documentary",
    thumbnail:
      "https://images.unsplash.com/photo-1564996962459-a6fed2557982?w=800&q=80",
    videoId: "Bey4XXJAqS8",
    platform: "youtube",
  },
];

/* ─── Cinematic card variants ──────────────────────────────── */
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

/* ─── Tilt card ─────────────────────────────────────────────── */
function TiltCard({
  video,
  index,
  onPlay,
}: {
  video: (typeof videos)[0];
  index: number;
  onPlay: (id: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

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
      {/* Ghost number */}
      <span
        className="absolute -top-6 -left-2 font-display text-8xl leading-none text-ghost pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {video.id}
      </span>

      <div
        ref={cardRef}
        onClick={() => onPlay(video.videoId)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group rounded-xl overflow-hidden cursor-pointer aspect-video bg-surface border border-foreground/5 transition-all duration-300 hover:border-accent-500/30 hover:shadow-[0_0_40px_rgba(255,68,51,0.15)] z-10"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease, box-shadow 0.3s ease",
        }}
        id={`video-card-${video.id}`}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-90 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 rounded-full border-2 border-accent-500 flex items-center justify-center backdrop-blur-sm bg-black/30 shadow-[0_0_30px_rgba(255,68,51,0.3)] transition-transform duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 text-accent-500 fill-accent-500 ml-1" />
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-xs text-muted tracking-widest uppercase mb-1">
            {video.client}
          </p>
          <h3 className="font-serif italic text-foreground text-lg group-hover:text-accent-400 transition-colors">
            {video.title}
          </h3>
        </div>

        {/* Number overlay */}
        <div className="absolute top-4 right-4">
          <span className="font-display text-2xl text-foreground/20 group-hover:text-accent-500/60 transition-colors duration-300">
            {video.id}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ──────────────────────────────────────────────── */
function VideoLightbox({
  videoId,
  onClose,
}: {
  videoId: string;
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
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
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

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,68,51,0.04)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-accent-500 tracking-[0.3em] uppercase mb-4"
          >
            — Work —
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl tracking-widest uppercase text-foreground mb-4"
          >
            Videos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted text-base max-w-md mx-auto"
          >
            Click any frame to watch in full screen.
          </motion.p>
        </div>
      </section>

      {/* 3x3 Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="container mx-auto max-w-7xl"
          style={{ perspective: "1200px" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {videos.map((video, i) => (
              <TiltCard
                key={video.id}
                video={video}
                index={i}
                onPlay={setActiveVideo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeVideo && (
        <VideoLightbox
          videoId={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
