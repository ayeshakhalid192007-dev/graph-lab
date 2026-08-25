"use client";
import { useStoredSet } from "@/lib/use-stored-set.js";
import { CertificateGenerator } from "@/components/interactive/CertificateGenerator";

const KEY = "graph-lab:graph-ready";

export function GraphReadyChecklist({ criteria }) {
  const { values: met, toggle, clear } = useStoredSet(KEY);
  const count = criteria.filter((c) => met.has(c)).length;
  const complete = count === criteria.length;

  return (
    <div>
      <p className="mono text-sm text-graphite" aria-live="polite">
        {count} of {criteria.length} met
      </p>
      <div
        className="mt-2 h-1.5 w-full glass rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={criteria.length}
        aria-label="Graph Ready criteria met"
      >
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-300"
          style={{ width: `${(count / criteria.length) * 100}%` }}
        />
      </div>

      <ul className="mt-6 space-y-3">
        {criteria.map((item, i) => (
          <li key={item} className="flex items-start gap-3">
            <input
              id={`gr-${i}`}
              type="checkbox"
              checked={met.has(item)}
              onChange={() => toggle(item)}
              className="mt-1 accent-[var(--accent-primary)]"
            />
            <label
              htmlFor={`gr-${i}`}
              className="text-sm text-graphite"
            >
              <span className="mono mr-2 text-xs text-muted">
                {i + 1}
              </span>
              {item}
            </label>
          </li>
        ))}
      </ul>

      {count > 0 && (
        <button
          type="button"
          onClick={clear}
          className="mono mt-4 glass border border-glass-border px-3 py-1 text-xs text-graphite hover:border-accent-primary/30 rounded-xl transition-colors"
        >
          Reset the checklist
        </button>
      )}

      <div className="mt-8">
        {complete ? (
          <CertificateGenerator criteria={criteria} />
        ) : (
          <p className="mono glass rounded-xl p-4 text-sm text-muted">
            {criteria.length - count}{" "}
            {criteria.length - count === 1
              ? "criterion"
              : "criteria"}{" "}
            still to go. The certificate unlocks at{" "}
            {criteria.length} of {criteria.length}.
          </p>
        )}
      </div>
    </div>
  );
}
