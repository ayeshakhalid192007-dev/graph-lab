import Link from "next/link";

export function PillButton({ href, variant = "solid", children }:
  { href: string; variant?: "solid" | "outline"; children: React.ReactNode }) {
  const styles = variant === "solid"
    ? "bg-accent text-paper hover:opacity-90"
    : "border border-rule text-ink hover:border-accent";
  return (
    <Link href={href} className={`mono inline-flex items-center px-4 py-2 text-sm tracking-tight ${styles}`}>
      {children}
    </Link>
  );
}
