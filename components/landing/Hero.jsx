"use client";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/GlassButton";
import { HeroGraph } from "@/components/landing/HeroGraph";

export function Hero({ docsCount, patternsCount, starterCount }) {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Graph Visual - Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <HeroGraph className="w-full h-full" />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none dark:opacity-20"
        style={{ background: "var(--accent-primary)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent-primary/8 text-accent-primary text-xs font-mono font-bold uppercase tracking-wider mb-6">
            Graph Engineering
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-[1.1] mb-6"
        >
          Build resilient systems that{" "}
          <br className="hidden sm:block" />
          <span className="text-accent-primary">scale across agents</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl text-graphite leading-relaxed max-w-2xl mb-10"
        >
          Graph Engineering transforms how distributed systems handle complexity.
          Instead of fragile file-based states, it uses resilient graph structures
          where multiple workers can coordinate safely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <GlassButton href="/docs/00-start-here/" variant="outline" className="px-8 py-4 text-base">
            Start Learning
          </GlassButton>
          <GlassButton href="/tracks/" variant="outline" className="px-8 py-4 text-base">
            View Roadmap
          </GlassButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 glass rounded-2xl p-6"
        >
          {[
            { value: `${docsCount}+`, label: "Pages" },
            { value: `${patternsCount}+`, label: "Patterns" },
            { value: `${starterCount}+`, label: "Starter Kits" },
            { value: "17", label: "Learning Steps" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
