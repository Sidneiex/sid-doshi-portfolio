"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  isVertical?: boolean;
}

export function LightboxVideoPlayer({ isOpen, onClose, videoId, isVertical = false }: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-accent-500 hover:bg-accent-500/10 transition-all duration-300 z-10"
            aria-label="Close Lightbox"
            id="lightbox-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative bg-black rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] ${
              isVertical
                ? "w-full max-w-sm aspect-[9/16] max-h-[85vh]"
                : "w-full max-w-5xl aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
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
