import Link from "next/link";

export function PillButton({ href, variant = "solid", children, className = "" }:
  { href: string; variant?: "solid" | "outline"; children: React.ReactNode; className?: string }) {
  const baseStyles = "inline-flex items-center justify-center font-mono text-sm font-semibold transition-all duration-300 rounded-lg";
  const styles = variant === "solid"
    ? "bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary text-paper hover:shadow-lg hover:shadow-accent-primary/25 px-6 py-3"
    : "bg-transparent border-2 border-rule text-ink hover:border-accent-primary hover:text-accent-primary px-6 py-3";
  return (
    <Link href={href} className={`${baseStyles} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
