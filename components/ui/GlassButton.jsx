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
    "inline-flex items-center justify-center font-mono text-sm font-semibold transition-all duration-200 rounded-xl";

  const variantStyles = {
    primary:
      "bg-accent-primary text-paper hover:bg-accent-secondary shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/30",
    secondary:
      "glass border border-glass-border text-ink hover:border-accent-primary/30 hover:bg-glass-bg-hover",
    outline:
      "border border-accent-primary/50 text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary",
    ghost:
      "text-graphite hover:text-ink hover:bg-surface-soft",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-6 py-3 ${styles}`}
    >
      {children}
    </motion.button>
  );
}
