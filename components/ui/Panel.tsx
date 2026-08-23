"use client";

/**
 * Premium Panel component with subtle elevation, border, and hover effects.
 * Uses corner ticks for Blueprint-style visual treatment.
 */
export function Panel({ className = "", children }:
  { className?: string; children: React.ReactNode }) {
  return (
    <div className={`tick relative bg-surface-soft p-6 border border-card-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent ${className}`}>
      {children}
    </div>
  );
}
