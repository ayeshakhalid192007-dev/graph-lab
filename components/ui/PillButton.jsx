import Link from "next/link";
import { motion } from "framer-motion";

export function PillButton({
  href,
  variant = "solid",
  children,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono text-sm font-semibold transition-all duration-300 rounded-xl";

  const styles =
    variant === "solid"
      ? "bg-accent-primary text-paper hover:bg-accent-secondary px-6 py-3 shadow-lg shadow-accent-primary/20"
      : "glass border border-glass-border text-ink hover:border-accent-primary/30 px-6 py-3";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Link href={href} className={`${baseStyles} ${styles} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
