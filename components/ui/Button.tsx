"use client";

import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
}: {
  href?: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono text-sm font-semibold transition-all duration-200 rounded-lg";

  const variantStyles = {
    primary: "bg-accent-primary text-paper hover:bg-accent-secondary hover:text-paper",
    secondary: "bg-surface border border-card-border text-ink hover:border-accent-primary hover:bg-surface-soft",
    outline: "border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-paper",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`px-6 py-3 ${styles}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`px-6 py-3 ${styles}`}>
      {children}
    </button>
  );
}
