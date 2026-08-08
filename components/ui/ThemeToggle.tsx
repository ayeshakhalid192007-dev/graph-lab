"use client";
import { useTheme } from "next-themes";

/**
 * Theme switch, with both labels always in the DOM and CSS choosing between them.
 *
 * The obvious version keeps a `mounted` flag so the server-rendered button does
 * not guess the theme, but that costs a setState in an effect (which React now
 * warns about) and renders a blank placeholder on every first paint. next-themes
 * already puts `.dark` on <html> from a blocking script before paint, so the
 * right label can simply be selected by the same class the rest of the palette
 * uses — correct on the very first frame, no state, no effect, no flash.
 *
 * resolvedTheme is only read inside onClick, which cannot fire before hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="mono border border-rule px-2 py-1 text-xs text-graphite hover:text-ink"
    >
      <span className="dark:hidden">
        DARK<span className="sr-only"> — switch to dark theme</span>
      </span>
      <span className="hidden dark:inline">
        LIGHT<span className="sr-only"> — switch to light theme</span>
      </span>
    </button>
  );
}
