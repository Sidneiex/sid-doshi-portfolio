"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy-load the heavy spiral animation
const SpiralAnimation = dynamic(
  () =>
    import("@/components/ui/spiral-animation").then(
      (mod) => mod.SpiralAnimation
    ),
  { ssr: false }
);

export function IntroGate({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem("sid-intro-seen");
    if (visited) {
      setShowIntro(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("sid-intro-seen", "1");
    setShowIntro(false);
  };

  // SSR: render children immediately
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showIntro && <SpiralAnimation onComplete={handleComplete} />}
      <div
        className={`transition-opacity duration-700 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
