"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const allPhotos = [
  {
    id: "p01",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    alt: "Brand Campaign — Luxe",
    project: "Luxe Brand Campaign",
    client: "Luxe Apparel Co.",
    category: "Commercial",
    tall: false,
  },
  {
    id: "p02",
    src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&q=80",
    alt: "Corporate Gala Evening",
    project: "Corporate Gala",
    client: "Infosys Foundation",
    category: "Events",
    tall: true,
  },
  {
    id: "p03",
    src: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&q=80",
    alt: "Rural Rajasthan Documentary",
    project: "Solar Futures",
    client: "Documentary — Self-directed",
    category: "Documentary",
    tall: false,
  },
  {
    id: "p04",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Wedding Coverage",
    project: "The Kapoor Wedding",
    client: "Private Client",
    category: "Events",
    tall: true,
  },
  {
    id: "p05",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    alt: "Product Photography",
    project: "Tech Product Launch",
    client: "Razorpay",
    category: "Commercial",
    tall: false,
  },
  {
    id: "p06",
    src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80",
    alt: "Street Documentary",
    project: "Faces of Pune",
    client: "Personal Project",
    category: "Documentary",
    tall: false,
  },
  {
    id: "p07",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    alt: "Music Concert",
    project: "NH7 Weekender",
    client: "OML Entertainment",
    category: "Events",
    tall: true,
  },
  {
    id: "p08",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    alt: "Restaurant Campaign",
    project: "Gastronomy Series",
    client: "The Fatty Bao",
    category: "Commercial",
    tall: false,
  },
  {
    id: "p09",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    alt: "Nature Documentary",
    project: "Western Ghats",
    client: "WWF India",
    category: "Documentary",
    tall: true,
  },
  {
    id: "p10",
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    alt: "Fashion Campaign",
    project: "Monsoon Collection",
    client: "Studio West",
    category: "Commercial",
    tall: false,
  },
];

const categories = ["All", "Commercial", "Events", "Documentary"] as const;
type Category = (typeof categories)[number];

/* Cinematic reveal for photo cards */
const photoVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.06,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof allPhotos)[0];
  index: number;
}) {
  return (
    <motion.div
      layout
      custom={index}
      variants={photoVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative group overflow-hidden rounded-xl ${
        photo.tall ? "row-span-2" : "row-span-1"
      } bg-surface border border-foreground/5 hover:border-accent-500/20 transition-all duration-500`}
      style={{ breakInside: "avoid" }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={800}
        height={photo.tall ? 1000 : 600}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          <p className="text-xs text-muted tracking-[0.2em] uppercase mb-1">
            {photo.client}
          </p>
          <p className="font-serif italic text-accent-500 text-lg leading-snug">
            {photo.project}
          </p>
        </motion.div>
      </div>

      {/* Category badge */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] tracking-[0.2em] uppercase bg-black/60 backdrop-blur-sm border border-accent-500/30 text-accent-500 px-2.5 py-1 rounded-full">
          {photo.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function PhotosPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? allPhotos
      : allPhotos.filter((p) => p.category === active);

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
            — Portfolio —
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl tracking-widest uppercase text-foreground mb-4"
          >
            Photos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted text-base max-w-md mx-auto leading-relaxed"
          >
            Each frame, a deliberate choice. Each project, a story worth
            telling.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-20 z-30 bg-background/90 backdrop-blur-md border-y border-foreground/5 px-4">
        <div className="container mx-auto max-w-7xl flex items-center gap-1 py-3 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                active === cat
                  ? "border border-accent-500 text-accent-500 shadow-[0_0_20px_rgba(255,68,51,0.2)]"
                  : "text-muted hover:text-foreground hover:bg-surface"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted/40 flex-shrink-0 pl-4">
            {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
          </span>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              layout
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filtered.map((photo, i) => (
                <div key={photo.id} className="break-inside-avoid mb-4">
                  <PhotoCard photo={photo} index={i} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
