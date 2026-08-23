"use client";

/**
 * Premium Panel component with subtle elevation, border, and hover effects.
 * Uses corner ticks for Blueprint-style visual treatment.
 */
export function Panel({ className = "", children }:
  { className?: string; children: React.ReactNode }) {
  return (
    <div className={`premium-panel ${className}`}>
      {children}
    </div>
  );
}
