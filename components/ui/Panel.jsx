"use client";

export function Panel({ className = "", children }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}
