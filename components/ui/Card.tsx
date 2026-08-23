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
        bg-surface border border-card-border rounded-md p-5
        transition-all duration-150
        ${hover ? "hover:border-accent-primary hover:bg-surface-soft" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
