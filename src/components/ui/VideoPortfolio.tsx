"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { LightboxVideoPlayer } from "./LightboxVideoPlayer";

const videos = [
  {
    id: "01",
    title: "BNP TV Ad",
    thumbnail:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80",
    videoId: "LXb3EKWsInQ",
    colSpan: "md:col-span-1",
  },
  {
    id: "02",
    title: "Sports",
    thumbnail:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    videoId: "aqz-KE-bpKQ",
    colSpan: "md:col-span-1",
  },
  {
    id: "03",
    title: "Skate Brand",
    thumbnail:
      "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&q=80",
    videoId: "ysz5S6PUM-U",
    colSpan: "md:col-span-1",
  },
  {
    id: "04",
    title: "Lux Le Morne",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    videoId: "jNQXAC9IVRw",
    colSpan: "md:col-span-1 md:row-span-2",
  },
  {
    id: "05",
    title: "Team Building",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    videoId: "ZqXmF1wuPKA",
    colSpan: "md:col-span-1",
  },
  {
    id: "06",
    title: "Cinematic Teaser",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    videoId: "lE6RYpe9IT0",
    colSpan: "md:col-span-1",
  },
  {
    id: "07",
    title: "Viral Brand Film",
    thumbnail:
      "https://images.unsplash.com/photo-1588666579899-2e1bb18b6fc8?w=800&q=80",
    videoId: "WbJgEgR2Oio",
    colSpan: "md:col-span-1",
  },
  {
    id: "08",
    title: "Sports Highlight",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    videoId: "fJ9rUzIMcZQ",
    colSpan: "md:col-span-1",
  },
  {
    id: "09",
    title: "Solar Rajasthan",
    thumbnail:
      "https://images.unsplash.com/photo-1564996962459-a6fed2557982?w=800&q=80",
    videoId: "Bey4XXJAqS8",
    colSpan: "md:col-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

/* Cinematic card entrance: below, smaller, blurred, tilted */
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.92,
    filter: "blur(6px)",
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  },
};

export function VideoPortfolio() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-24 bg-background-alt px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl" style={{ perspective: "1200px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-surface opacity-30 uppercase tracking-widest absolute left-1/2 -translate-x-1/2 mt-[-40px] pointer-events-none z-0">
            Selected Work
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-accent-gradient italic relative z-10">
            Featured Projects
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              onClick={() => setActiveVideo(video.videoId)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer border border-foreground/5 hover:border-accent-500/30 transition-all duration-500 ${video.colSpan}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_40px_rgba(255,68,51,0.1)] rounded-xl pointer-events-none" />

              <div className="absolute top-6 left-6 flex space-x-2">
                <span className="text-5xl font-sans font-light text-foreground/50 group-hover:text-accent-500/70 transition-colors">
                  {video.id}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full border-2 border-accent-500 flex items-center justify-center backdrop-blur-sm bg-black/30 group-hover:shadow-[0_0_30px_rgba(255,68,51,0.3)] transition-shadow">
                  <Play className="w-6 h-6 text-accent-500 fill-accent-500 ml-1" />
                </div>
              </div>

              <h4 className="absolute bottom-6 left-6 text-2xl font-serif italic text-foreground group-hover:text-accent-400 transition-colors">
                {video.title}
              </h4>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <button className="border border-accent-500/40 px-10 py-4 rounded text-accent-500 font-bold uppercase tracking-widest text-sm hover:bg-accent-500 hover:text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,68,51,0.3)]">
            Load More
          </button>
        </div>
      </div>

      <LightboxVideoPlayer
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoId={activeVideo || ""}
      />
    </section>
  );
}
