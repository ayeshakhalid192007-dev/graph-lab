"use client";

import { ReactNode } from "react";

export function Card({
  className = "",
  children,
  hover = true,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={`
        bg-surface border border-card-border rounded-lg p-6
        transition-all duration-200
        ${hover ? "hover:border-accent-primary hover:bg-surface-soft" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
