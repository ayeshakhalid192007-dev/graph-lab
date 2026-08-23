"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Theme switch.
 *
 * Uses a mounted state to avoid hydration mismatch: the button shows a neutral
 * placeholder on the server and only renders the actual theme indicator after
 * the component mounts on the client.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show placeholder during SSR/until mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="mono flex items-center gap-2 border border-rule px-3 py-1.5 rounded-md text-xs font-medium text-muted cursor-not-allowed opacity-50"
        aria-label="Loading theme"
      >
        <span className="w-2 h-2 rounded-full bg-gray-400" />
        <span>Loading...</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="mono flex items-center gap-2 border border-rule px-3 py-1.5 rounded-md text-xs font-medium text-graphite hover:text-ink hover:border-accent-primary hover:bg-surface-soft transition-all"
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <>
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span>LIGHT</span>
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-slate-600" />
          <span>DARK</span>
        </>
      )}
    </button>
  );
}
