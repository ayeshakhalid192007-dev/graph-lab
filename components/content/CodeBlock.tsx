import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/CopyButton";

/**
 * The frame around one fenced code block: a hairline panel, the language in
 * monospace, and a copy button.
 *
 * Shiki highlights at build time, so this is a server component with zero client
 * JS of its own — `children` is already-highlighted markup handed over by the
 * rehype pipeline. It is passed as React children rather than an HTML string so
 * nothing has to serialise hast back to HTML and re-parse it.
 */
export function CodeBlock({
  lang,
  raw,
  children,
}: {
  lang?: string;
  raw?: string;
  children?: ReactNode;
}) {
  return (
    <div className="tick relative my-5 border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule px-3 py-1">
        <span className="mono text-[11px] uppercase tracking-wider text-muted">{lang || "text"}</span>
        {raw ? <CopyButton text={raw} /> : null}
      </div>
      <div className="overflow-x-auto p-3 text-sm [&_pre]:bg-transparent">{children}</div>
    </div>
  );
}
