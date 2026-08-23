"use client";

import { ReactNode } from "react";

export function StepCard({
  number,
  title,
  description,
  children,
  className = "",
}: {
  number: number;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-surface border border-card-border rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary">
            <span className="font-mono font-bold text-accent-primary">{number}</span>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="font-mono font-semibold text-ink mb-1">{title}</h3>
          {description && <p className="text-graphite text-sm">{description}</p>}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    </div>
  );
}
