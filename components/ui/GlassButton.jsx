"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function GlassButton({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono text-sm font-semibold transition-all duration-300 rounded-xl";

  const variantStyles = {
    primary:
      "border border-accent-primary/60 text-accent-primary hover:bg-accent-primary hover:text-paper hover:border-accent-primary hover:shadow-lg hover:shadow-accent-primary/20",
    secondary:
      "glass border border-glass-border text-ink hover:border-accent-primary/30 hover:bg-glass-bg-hover",
    outline:
      "border border-accent-primary/60 text-accent-primary hover:bg-accent-primary hover:text-paper hover:border-accent-primary hover:shadow-lg hover:shadow-accent-primary/20",
    ghost:
      "text-graphite hover:text-ink hover:bg-surface-soft",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link href={href} className={`px-6 py-3 ${styles}`}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`px-6 py-3 ${styles}`}
    >
      {children}
    </motion.button>
  );
}
