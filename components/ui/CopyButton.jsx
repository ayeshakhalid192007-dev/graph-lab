"use client";
import { useEffect, useRef, useState } from "react";

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Code copied to clipboard" : "Copy code"}
      className="mono text-[11px] uppercase tracking-wider text-graphite hover:text-accent-primary border border-rule-strong px-2 py-1 rounded-lg hover:border-accent-primary/30 hover:bg-surface-soft transition-all"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
