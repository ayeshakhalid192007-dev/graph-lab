"use client";

import { ReactNode, useState } from "react";

export function Accordion({
  items,
  className = "",
}: {
  items: Array<{
    id: string;
    title: string;
    number?: string | number;
    content: ReactNode;
  }>;
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-surface border border-card-border rounded-lg overflow-hidden transition-all duration-200 hover:border-accent-primary"
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface-soft transition-colors"
          >
            <div className="flex items-center gap-4">
              {item.number !== undefined && (
                <span className="font-mono text-sm font-bold text-accent-primary">{item.number}</span>
              )}
              <span className="font-mono font-semibold text-ink">{item.title}</span>
            </div>
            <svg
              className={`w-5 h-5 text-accent-primary transition-transform duration-200 ${
                openId === item.id ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          {openId === item.id && (
            <div className="px-6 py-4 border-t border-card-border bg-surface-soft text-graphite">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
