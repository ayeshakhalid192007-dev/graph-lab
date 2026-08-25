import { CopyButton } from "@/components/ui/CopyButton";

export function CodeBlock({ lang, raw, children }) {
  return (
    <div className="my-5 glass-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-glass-border px-3 py-1">
        <span className="mono text-[11px] uppercase tracking-wider text-muted">
          {lang || "text"}
        </span>
        {raw ? <CopyButton text={raw} /> : null}
      </div>
      <div className="overflow-x-auto p-3 text-sm [&_pre]:bg-transparent">
        {children}
      </div>
    </div>
  );
}
