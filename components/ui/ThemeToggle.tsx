"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Before mount the server-rendered HTML has no theme, so render a same-size
  // placeholder rather than a wrong icon that would flip on hydration.
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="mono border border-rule px-2 py-1 text-xs text-graphite hover:text-ink"
    >
      {mounted ? (dark ? "LIGHT" : "DARK") : "     "}
    </button>
  );
}
