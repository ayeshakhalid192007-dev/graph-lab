"use client";
import { motion } from "framer-motion";

export function StepCard({
  number,
  title,
  description,
  children,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass-card ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/30">
            <span className="font-mono font-bold text-accent-primary">
              {number}
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="font-mono font-semibold text-ink mb-1">{title}</h3>
          {description && (
            <p className="text-graphite text-sm">{description}</p>
          )}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    </motion.div>
  );
}
