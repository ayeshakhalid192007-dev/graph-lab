"use client";
import { useEffect, useMemo, useState } from "react";
import { withBasePath } from "@/lib/base-path.js";

const TOOL_ROOT = { claude: ".claude/", opencode: "opencode/" };
const TOOL_LABEL = { claude: "Claude Code", opencode: "OpenCode" };

function dirOf(path) {
  const i = path.lastIndexOf("/");
  return i === -1 ? "" : path.slice(0, i);
}

function baseOf(path) {
  return path.slice(path.lastIndexOf("/") + 1);
}

export function StarterViewer({ slug, repo, commit }) {
  const [loaded, setLoaded] = useState(null);
  const [tool, setTool] = useState("claude");
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    let live = true;
    fetch(withBasePath(`/starters/${slug}.json`))
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (live) setLoaded({ slug, files: data.files, error: null });
      })
      .catch((e) => {
        if (live) {
          setLoaded({
            slug,
            files: null,
            error:
              e instanceof Error ? e.message : "unknown error",
          });
        }
      });
    return () => {
      live = false;
    };
  }, [slug]);

  const fresh = loaded?.slug === slug ? loaded : null;
  const files = fresh?.files ?? null;
  const error = fresh?.error ?? null;
  const hasClaude = !!files?.some((f) =>
    f.path.startsWith(TOOL_ROOT.claude)
  );
  const hasOpencode = !!files?.some((f) =>
    f.path.startsWith(TOOL_ROOT.opencode)
  );
  const bothTools = hasClaude && hasOpencode;

  const visible = useMemo(() => {
    if (!files) return [];
    if (!bothTools) return files;
    const hidden = TOOL_ROOT[tool === "claude" ? "opencode" : "claude"];
    return files.filter((f) => !f.path.startsWith(hidden));
  }, [files, bothTools, tool]);

  const groups = useMemo(() => {
    const byDir = new Map();
    for (const file of visible) {
      const dir = dirOf(file.path);
      const bucket = byDir.get(dir);
      if (bucket) bucket.push(file);
      else byDir.set(dir, [file]);
    }
    return [...byDir].sort(([a], [b]) => a.localeCompare(b));
  }, [visible]);

  const current =
    visible.find((f) => f.path === picked) ??
    visible.find((f) => f.path === "README.md") ??
    visible[0] ??
    null;
  const selected = current?.path ?? null;

  if (error) {
    return (
      <p className="mono mt-4 glass rounded-xl p-4 text-sm text-graphite">
        The starter kit files could not be loaded ({error}). Browse
        them in the course repo instead:{" "}
        <a
          href={`https://github.com/${repo}/tree/${commit}/starters/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary underline underline-offset-2"
        >
          starters/{slug}
        </a>
        .
      </p>
    );
  }

  if (!files) {
    return (
      <p
        className="mono mt-4 text-sm text-muted"
        aria-live="polite"
      >
        Loading the {slug} starter kit…
      </p>
    );
  }

  return (
    <div className="mt-4">
      {bothTools && (
        <fieldset className="border-0 p-0">
          <legend className="mono text-xs uppercase tracking-wider text-muted">
            Harness
          </legend>
          <div className="mt-2 flex gap-2">
            {["claude", "opencode"].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tool === t}
                onClick={() => setTool(t)}
                className={`mono border px-2 py-1 text-xs rounded-lg transition-all ${
                  tool === t
                    ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                    : "border-glass-border text-graphite hover:border-accent-primary/30"
                }`}
              >
                {TOOL_LABEL[t]}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-4 glass-card overflow-hidden md:grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <nav
          aria-label={`${slug} starter kit files`}
          className="border-b md:border-b-0 md:border-r border-glass-border p-3"
        >
          <p className="mono text-xs uppercase tracking-wider text-muted">
            {visible.length} files
          </p>
          {groups.map(([dir, entries]) => (
            <details key={dir || "/"} open className="mt-3">
              <summary className="mono cursor-pointer text-xs text-graphite marker:text-rule-strong">
                {dir || "/"}
              </summary>
              <ul className="mt-1">
                {entries.map((file) => (
                  <li key={file.path}>
                    <button
                      type="button"
                      aria-current={
                        selected === file.path ? "true" : undefined
                      }
                      onClick={() => setPicked(file.path)}
                      className={`mono block w-full truncate py-0.5 pl-3 text-left text-xs rounded transition-colors ${
                        selected === file.path
                          ? "text-accent-primary"
                          : "text-graphite hover:text-accent-primary"
                      }`}
                    >
                      {baseOf(file.path)}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>

        <div className="min-w-0 p-3">
          {current === null ? (
            <p className="mono text-sm text-muted">
              Pick a file to read it.
            </p>
          ) : current.content === null ? (
            <p className="mono text-sm text-graphite">
              Binary or oversized —{" "}
              <a
                href={`https://github.com/${repo}/blob/${commit}/starters/${slug}/${current.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-primary underline underline-offset-2"
              >
                view on GitHub
              </a>
              .
            </p>
          ) : (
            <>
              <p className="mono mb-2 truncate text-xs text-muted">
                {current.path}
              </p>
              <pre
                tabIndex={0}
                role="region"
                aria-label={`${current.path} contents`}
                className="mono max-h-[32rem] overflow-auto glass rounded-xl p-3 text-xs leading-relaxed text-graphite"
              >
                {current.content}
              </pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
