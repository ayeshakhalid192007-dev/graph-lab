"use client";
import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  align = "center",
}) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const mxClass = align === "center" ? "mx-auto" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-12 ${alignClass} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full bg-accent-primary/8 text-accent-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold text-ink tracking-tight ${
          align === "center" ? "mb-4" : "mb-3"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-graphite max-w-2xl ${mxClass} text-lg`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
