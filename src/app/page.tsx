import { HeroSection } from "@/components/ui/HeroSection";
import { SixStepApproach } from "@/components/ui/SixStepApproach";
import { ShowreelSection } from "@/components/ui/ShowreelSection";
import { ExperimentalSection } from "@/components/ui/ExperimentalSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sid Doshi — Filmmaker & Developer",
  description:
    "Film direction meets software engineering. Cinematic narratives and clean code — crafted with the same precision. A portfolio by Sid Doshi.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SixStepApproach />
      <ShowreelSection />
      <ExperimentalSection />
    </>
  );
}
