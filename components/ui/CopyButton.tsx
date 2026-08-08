"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Copies a code block's source. The only client JS a code block carries — the
 * highlighting itself is done by Shiki at build time.
 *
 * navigator.clipboard is undefined on an insecure origin, so the write is guarded:
 * a failed copy leaves the label alone rather than lying with "Copied".
 */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable. Nothing was copied, so nothing is claimed.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Code copied to clipboard" : "Copy code"}
      className="mono text-[11px] uppercase tracking-wider text-muted hover:text-accent"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
