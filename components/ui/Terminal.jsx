"use client";
import { useState } from "react";

export function Terminal({ commands, title = "Commands" }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (command, index) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="mono text-lg text-ink font-semibold">{title}</h3>
      )}
      <div className="space-y-3">
        {commands.map((cmd, idx) => (
          <div
            key={idx}
            className="glass-card hover:border-accent-primary/30 transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="mono text-sm text-graphite break-all">
                  <span className="text-muted">$</span> {cmd.command}
                </div>
                {cmd.description && (
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {cmd.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleCopy(cmd.command, idx)}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-rule-strong text-xs mono font-medium text-graphite hover:text-accent-primary hover:border-accent-primary/30 transition-colors duration-200 bg-transparent hover:bg-surface-soft"
              >
                {copiedIndex === idx ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
