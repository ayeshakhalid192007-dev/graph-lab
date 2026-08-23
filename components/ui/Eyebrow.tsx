"use client";

import { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`
        inline-block px-2 py-1 rounded-sm
        bg-accent-primary/8 text-accent-primary
        text-xs font-mono font-bold uppercase tracking-wider
        ${className}
      `}
    >
      {children}
    </span>
  );
}
