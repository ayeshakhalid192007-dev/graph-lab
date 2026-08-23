'use client';

import { useState } from 'react';

export interface TerminalCommand {
  command: string;
  description?: string;
}

export interface TerminalProps {
  commands: TerminalCommand[];
  title?: string;
}

export function Terminal({ commands, title = 'Commands' }: TerminalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (command: string, index: number) => {
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
            className="bg-surface border border-rule rounded-lg p-4 hover:border-accent transition-colors duration-200"
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
                className="flex-shrink-0 px-3 py-1.5 rounded border border-rule text-xs mono font-medium text-graphite hover:text-accent hover:border-accent transition-colors duration-200 bg-paper hover:bg-surface"
              >
                {copiedIndex === idx ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
