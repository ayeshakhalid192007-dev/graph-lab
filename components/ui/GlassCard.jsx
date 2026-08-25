"use client";
import { motion } from "framer-motion";

export function GlassCard({
  className = "",
  children,
  hover = true,
  as = "div",
  ...props
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`glass-card ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
