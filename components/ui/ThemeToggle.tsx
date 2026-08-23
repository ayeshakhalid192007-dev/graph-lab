"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      setMounted(true);
    }
  }, []);

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
