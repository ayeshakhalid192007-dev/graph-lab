"use client";
import { motion } from "framer-motion";

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  y = 24,
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
