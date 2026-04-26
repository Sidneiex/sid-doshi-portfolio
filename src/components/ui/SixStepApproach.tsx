"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery\n& Strategy",
    items: [
      "Understand your brand, goals, and audience.",
      "Build a strategic framework for creative direction.",
    ],
    isHighlight: true,
  },
  {
    id: "02",
    title: "Concept\nDevelopment",
    items: [
      "Brainstorm ideas and themes aligned with your vision.",
      "Refine concepts based on feedback and objectives.",
    ],
    isHighlight: false,
  },
  {
    id: "03",
    title: "Pre-Production\nPlanning",
    items: [
      "Scripting, storyboarding, casting, and scheduling.",
      "Ensure seamless logistics for a successful shoot.",
    ],
    isHighlight: false,
  },
  {
    id: "04",
    title: "Production",
    items: [
      "Capture stunning visuals and direct talent on set.",
      "Utilize cutting-edge equipment and techniques.",
    ],
    isHighlight: false,
  },
  {
    id: "05",
    title: "Post-Production\n& Editing",
    items: [
      "Transform raw footage into polished content.",
      "Collaborate closely for feedback and approval.",
    ],
    isHighlight: false,
  },
  {
    id: "06",
    title: "QA &\nDelivery",
    items: [
      "Conduct thorough checks to maintain quality standards.",
      "Deliver the finished product in your preferred format.",
    ],
    isHighlight: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.93,
    filter: "blur(6px)",
    rotateX: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  },
};

export function SixStepApproach() {
  return (
    <section className="py-24 bg-background px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl" style={{ perspective: "1000px" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-surface opacity-30 uppercase tracking-widest absolute left-1/2 -translate-x-1/2 mt-[-40px] pointer-events-none z-0">
            Crafting Excellence
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-accent-gradient font-bold relative z-10">
            My Process
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              className={`group relative p-8 sm:p-10 rounded-2xl flex flex-col h-full overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 border
                ${
                  step.isHighlight
                    ? "border-accent-500/30 bg-surface shadow-[0_0_24px_rgba(212,165,116,0.06)]"
                    : "border-foreground/5 bg-surface hover:border-accent-500/15"
                }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span
                  className={`text-sm tracking-widest uppercase font-semibold font-mono ${
                    step.isHighlight ? "text-accent-500" : "text-muted"
                  }`}
                >
                  Step {step.id}
                </span>
              </div>

              <h4
                className={`text-2xl sm:text-3xl font-bold mb-8 whitespace-pre-line leading-snug transition-colors duration-300 font-serif ${
                  step.isHighlight
                    ? "text-foreground"
                    : "text-foreground group-hover:text-accent-500"
                }`}
              >
                {step.title}
              </h4>

              <div className="mt-auto">
                <ul className="space-y-4">
                  {step.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          step.isHighlight ? "text-accent-500" : "text-accent-500/50"
                        }`}
                      />
                      <span className="text-sm sm:text-base leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-b from-accent-500/[0.02] to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <button className="border border-accent-500/30 px-8 py-3 rounded text-accent-500 font-bold tracking-widest uppercase text-sm hover:bg-accent-500 hover:text-background transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,165,116,0.15)]">
            Book a Free Call
          </button>
        </div>
      </div>
    </section>
  );
}
