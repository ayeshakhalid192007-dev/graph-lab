"use client";

export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`
        inline-block px-3 py-1 rounded-full
        bg-accent-primary/8 text-accent-primary
        text-xs font-mono font-bold uppercase tracking-wider
        ${className}
      `}
    >
      {children}
    </span>
  );
}
