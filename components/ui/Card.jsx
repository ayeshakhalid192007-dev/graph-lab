"use client";
import { motion } from "framer-motion";

export function Card({
  className = "",
  children,
  hover = true,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        glass-card
        ${hover ? "hover:border-accent-primary/30" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
