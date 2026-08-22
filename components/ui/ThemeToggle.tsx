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
      className="mono flex items-center gap-2 border border-rule px-3 py-1.5 rounded-md text-xs font-medium text-graphite hover:text-ink hover:border-accent-primary hover:bg-surface-soft transition-all"
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      suppressHydrationWarning
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
