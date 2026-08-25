"use client";
import { motion } from "framer-motion";

const STAGES = [
  {
    step: 1,
    title: "Extraction",
    accent: "var(--accent-primary)",
    accentBg: "var(--accent-primary)",
    desc: "Raw input is parsed into structured facts. Unstructured prose becomes typed, queryable triples that downstream systems can reason about.",
  },
  {
    step: 2,
    title: "Resolution",
    accent: "var(--accent-secondary)",
    accentBg: "var(--accent-secondary)",
    desc: "New facts merge with existing ones. Contradictions are flagged rather than silently overwritten, preserving the full decision trail.",
  },
  {
    step: 3,
    title: "Provenance",
    accent: "var(--accent-success)",
    accentBg: "var(--accent-success)",
    desc: "Every fact carries a receipt — who created it, when, and under what context. Auditors and agents can trace any claim back to its source.",
  },
];

function StageNode({ stage, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center flex-1 min-w-0"
    >
      <div
        className="relative flex items-center justify-center w-14 h-14 rounded-full mb-4"
        style={{
          background: `color-mix(in srgb, ${stage.accentBg} 10%, transparent)`,
          border: `1.5px solid color-mix(in srgb, ${stage.accent} 25%, transparent)`,
          boxShadow: `0 0 24px color-mix(in srgb, ${stage.accent} 12%, transparent)`,
        }}
      >
        <span className="font-mono text-base font-bold" style={{ color: stage.accent }}>
          {stage.step}
        </span>
        <div
          className="absolute inset-0 rounded-full lifecycle-pulse"
          style={{
            border: `1px solid color-mix(in srgb, ${stage.accent} 20%, transparent)`,
            animationDelay: `${index * 0.8}s`,
          }}
        />
      </div>
      <h3 className="font-mono text-sm font-bold text-ink mb-1.5 tracking-tight">
        {stage.title}
      </h3>
      <p className="text-xs text-graphite leading-relaxed max-w-[200px]">
        {stage.desc}
      </p>
    </motion.div>
  );
}

function HorizontalConnector({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.15 + 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden sm:flex items-center justify-center flex-shrink-0 w-16 md:w-20 lg:w-24 relative self-start mt-7"
    >
      <div className="absolute w-full h-px bg-card-border" />
      <div
        className="absolute h-px lifecycle-flow-line"
        style={{
          background: `linear-gradient(90deg, var(--accent-primary), var(--accent-success))`,
          animationDelay: `${index * 1.2}s`,
        }}
      />
      <div className="lifecycle-traveler-container">
        <div
          className="lifecycle-traveler"
          style={{
            background: `var(--accent-primary)`,
            boxShadow: `0 0 8px var(--accent-primary), 0 0 16px color-mix(in srgb, var(--accent-primary) 40%, transparent)`,
            animationDelay: `${index * 1.2}s`,
          }}
        />
      </div>
      <svg viewBox="0 0 12 12" className="absolute right-0 w-3 h-3 text-graphite/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6 L9 6 M6 3 L9 6 L6 9" />
      </svg>
    </motion.div>
  );
}

function VerticalConnector({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.15 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sm:hidden flex justify-center py-3 relative"
      style={{ height: "40px" }}
    >
      <div className="absolute top-0 bottom-0 w-px bg-card-border" />
      <div
        className="absolute top-0 bottom-0 w-px lifecycle-flow-line-v"
        style={{
          background: `linear-gradient(180deg, var(--accent-primary), var(--accent-success))`,
          animationDelay: `${index * 1.2}s`,
        }}
      />
      <svg viewBox="0 0 12 12" className="absolute bottom-0 w-3 h-3 text-graphite/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 L6 9 M3 6 L6 9 L9 6" />
      </svg>
    </motion.div>
  );
}

export function LifecycleDiagram() {
  return (
    <div className="w-full" role="img" aria-label="Fact lifecycle: Extraction, Resolution, and Provenance — three connected stages showing how facts flow through the system">
      {/* Desktop / tablet: horizontal layout */}
      <div className="hidden sm:flex items-start justify-center gap-0 px-4 py-8 lg:py-10">
        {STAGES.map((stage, i) => (
          <div key={stage.step} className="flex items-start gap-0">
            <StageNode stage={stage} index={i} />
            {i < STAGES.length - 1 && <HorizontalConnector index={i} />}
          </div>
        ))}
      </div>

      {/* Mobile: vertical layout */}
      <div className="sm:hidden flex flex-col items-center px-2 py-6">
        {STAGES.map((stage, i) => (
          <div key={stage.step} className="flex flex-col items-center w-full">
            <StageNode stage={stage} index={i} />
            {i < STAGES.length - 1 && <VerticalConnector index={i} />}
          </div>
        ))}
      </div>

      {/* Bottom flow bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-6 sm:mt-8 flex items-center justify-center px-2"
      >
        <div className="relative flex items-center justify-center gap-3 sm:gap-0 glass rounded-full px-4 sm:px-6 py-2.5 border border-card-border max-w-full flex-wrap sm:flex-nowrap">
          <div className="hidden sm:block absolute left-[15%] right-[15%] h-px border-t border-dashed border-graphite/20" />
          <div className="hidden sm:block absolute left-[15%] right-[15%] h-px lifecycle-progress-bar">
            <div
              className="h-full lifecycle-progress-fill"
              style={{
                background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-success))",
              }}
            />
          </div>

          <span className="relative z-10 flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent-primary lifecycle-dot-pulse" style={{ animationDelay: "0s" }} />
            <span className="font-mono text-[10px] sm:text-xs text-graphite font-medium">extract</span>
          </span>

          <span className="relative z-10 sm:px-5 font-mono text-[10px] sm:text-xs text-ink font-semibold text-center leading-tight">
            <span className="hidden sm:inline">facts flow through all three stages</span>
            <span className="sm:hidden">3 stages</span>
          </span>

          <span className="relative z-10 flex items-center gap-1.5 flex-shrink-0">
            <span className="font-mono text-[10px] sm:text-xs text-graphite font-medium">provenance</span>
            <span className="w-2 h-2 rounded-full bg-accent-success lifecycle-dot-pulse" style={{ animationDelay: "1.6s" }} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
