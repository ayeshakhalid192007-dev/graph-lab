"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/Panel";

function categoryLabel(category) {
  const [letter, ...rest] = category.split("-");
  const word = rest.join("-");
  return `${letter} · ${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

function FilterGroup({
  legend,
  options,
  selected,
  label = (v) => v,
  onToggle,
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mono text-xs uppercase tracking-wider text-muted">
        {legend}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.has(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(option)}
              className={`mono border px-2 py-1 text-xs rounded-lg transition-all ${
                on
                  ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                  : "border-glass-border text-graphite hover:border-accent-primary/30"
              }`}
            >
              {label(option)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PatternBrowser({ patterns, facets }) {
  const [picked, setPicked] = useState({
    categories: new Set(),
    stages: new Set(),
    tools: new Set(),
  });

  function toggle(group, value) {
    setPicked((prev) => {
      const next = new Set(prev[group]);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return { ...prev, [group]: next };
    });
  }

  const active = ["categories", "stages", "tools"].filter(
    (g) => picked[g].size > 0
  );

  const results = useMemo(
    () =>
      patterns.filter(
        (p) =>
          (picked.categories.size === 0 ||
            picked.categories.has(p.category)) &&
          (picked.stages.size === 0 ||
            picked.stages.has(p.stage)) &&
          (picked.tools.size === 0 ||
            p.tools.some((t) => picked.tools.has(t)))
      ),
    [patterns, picked]
  );

  return (
    <div>
      <div className="grid gap-5 border-y border-rule-strong py-5 sm:grid-cols-3">
        <FilterGroup
          legend="Category"
          options={facets.categories}
          selected={picked.categories}
          label={categoryLabel}
          onToggle={(v) => toggle("categories", v)}
        />
        <FilterGroup
          legend="Stage"
          options={facets.stages}
          selected={picked.stages}
          onToggle={(v) => toggle("stages", v)}
        />
        <FilterGroup
          legend="Tool"
          options={facets.tools}
          selected={picked.tools}
          onToggle={(v) => toggle("tools", v)}
        />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <p className="mono text-sm text-graphite" aria-live="polite">
          {results.length}{" "}
          {results.length === 1 ? "pattern" : "patterns"}
        </p>
        {active.length > 0 && (
          <button
            type="button"
            onClick={() =>
              setPicked({
                categories: new Set(),
                stages: new Set(),
                tools: new Set(),
              })
            }
            className="mono glass border border-glass-border px-2 py-1 text-xs text-graphite hover:border-accent-primary/30 rounded-lg transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <Panel className="mt-5">
          <p className="text-sm text-graphite">
            No pattern matches every filter at once. Clear the{" "}
            <strong className="text-ink">
              {active
                .map((g) =>
                  g === "categories"
                    ? "category"
                    : g === "stages"
                    ? "stage"
                    : "tool"
                )
                .join(" or ")}
            </strong>{" "}
            filter to widen the set.
          </p>
        </Panel>
      ) : (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>
              <Panel className="h-full">
                <p className="mono text-xs tracking-wider text-muted">
                  {categoryLabel(p.category)}
                </p>
                <h2 className="mono mt-1 text-base">
                  <Link
                    href={`/patterns/${p.slug}/`}
                    className="text-ink hover:text-accent-primary transition-colors"
                  >
                    {p.title}
                  </Link>
                </h2>
                <dl className="mono mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted">
                  <div>
                    <dt className="sr-only">Stage</dt>
                    <dd>stage: {p.stage}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Cost</dt>
                    <dd>cost: {p.cost}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Kit</dt>
                    <dd>{p.core ? "core" : "extended"}</dd>
                  </div>
                </dl>
                <p className="mono mt-2 text-[11px] text-muted">
                  <span className="sr-only">Tools: </span>
                  {p.tools.join(" · ") || "—"}
                </p>
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
