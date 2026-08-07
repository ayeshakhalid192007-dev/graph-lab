# Global constraints

**Every task's requirements implicitly include this file.** Taken from the plan's Global Constraints section and the spec's non-goals. A task that violates one of these is wrong even if its own verification passes.

---

## Content

**C1 — `content/` is generated, never hand-edited.**
`scripts/sync-docs.mjs` is its only writer. A task that needs different content changes the course repo and re-syncs. It does not edit `content/`.
*Enforced by:* `npm run sync:check` in CI on every push and PR — it re-syncs the pinned commit into a temp dir and diffs. Any difference is a hand-edit and fails the build.

**C2 — No course content is authored in `graph-lab`.**
One exception: the landing page's hero and section copy, which is site chrome. That copy must be **independently worded** from both `graph-engineering-course/README.md` and `content/docs/README.md` — a third fresh phrasing of the same pitch, not a paraphrase of either.
*Enforced by:* Loop 4 Task 16 Step 1 drafts the copy separately, for review before it is buried in JSX.

**C3 — MDX is not used.**
Course markdown stays plain and GitHub-readable, which rules out JSX in source files. All component substitution is pattern-matching on ordinary markdown inside `lib/markdown.ts`.

---

## Scope

**C4 — Three components are deliberately NOT built:** `CodeTabs`, `Callout`, `CheckYourself`.
Zero content exercises them (verified 2026-08-06, re-verified 2026-08-07). Their degraded fallbacks are **correct output, not bugs**: paired fences render as two ordinary code blocks, a GitHub alert renders as a plain blockquote, a comment marker renders as nothing. Adding a component later is a self-contained change to `lib/markdown.ts`.

**C5 — `TwoGraphsSplit`, `LifecycleDiagram`, `SubgraphViewer` are landing-page components only.**
Embedding them in doc pages would require inventing a marker convention inside `docs/` — a course-content change, and out of scope.

**C6 — No backend, database, accounts, auth, analytics, or comments.**
Every stateful feature — reading progress, quiz scores, the certification checklist — is `localStorage` on the reader's own machine. The output is a static export servable from any file host.

---

## Platform

**C7 — Node >= 24.**
`scripts/check-content-shape.mjs` imports `lib/parse-content.ts` directly so the quiz and flashcard parsers have exactly one definition. Only Node >= 23.6 strips types from an imported `.ts` without a flag; on older Node the check dies with `ERR_UNKNOWN_FILE_EXTENSION`.
Keep these three in step — **never lower one in isolation:**
- `.nvmrc`
- `package.json` → `engines.node`
- `.github/workflows/deploy.yml`

**C8 — `basePath` comes from `PAGES_BASE_PATH`.**
Unset locally, so the dev server and `npm run build` serve from root. Set to `/graph-lab` in CI, because GitHub Pages serves a project site from `/<repo>` and a static export without a matching `basePath`/`assetPrefix` 404s on `/_next` assets.
Every component that emits a bare `href` or `src` string goes through `withBasePath()` from `lib/base-path.ts`.

**C9 — Package manager is npm.** Not pnpm, not yarn, not bun.

**C10 — Versions are pinned as the plan states.** Next.js 16.2.11, React 19.2.4, Tailwind v4 (CSS-configured — there is no `tailwind.config.ts`), TypeScript 5. Adding a dependency not in the plan's `package.json` requires a *Decision* entry in `shared/state.md`.

---

## Design

**C11 — Blueprint palette only.**
Warm paper white / ink blue / graphite in light; deep slate / cyan in dark. **No shadows, no gradients, no glow.** Hairline rules instead of card borders. Corner ticks on panels. A faint dot-grid background.
Nothing is copied from `loop-lab`'s palette or type scale — **structure is borrowed, visuals are not.**

**C12 — Typography alternates deliberately.** A sans face for body prose; a monospace face for node names, edge labels, section numbers, buttons, and code. That alternation carries the identity.

**C13 — All motion is suppressed under `prefers-reduced-motion: reduce`.**

**C14 — Every interactive element gets a visible focus state and an accessible name.**

**C15 — Both themes are first-class.** Class-based dark mode, reader's choice persisted, defaulting to system preference. Mermaid receives an explicit dark theme so diagrams stay legible. No flash of wrong theme on load.

---

## Process

**C16 — Verification before checkbox.** A checkbox is ticked only after its command was run and its output read. A red command means the task is not done.

**C17 — Commit after every task.** Conventional-commit style, as each task's final step names.

**C18 — Creating the GitHub repo, pushing site code, and enabling Pages require explicit user confirmation** at Loop 5 Task 22. Everything before that is local.

---

## Precedence

When two sources disagree:

```
spec  >  plan  >  this file  >  your judgment
```

`plan/2026-08-06-course-website-design.md` is authoritative. Where the plan and the spec disagree, **the spec wins and the plan is wrong** — record the discrepancy under *Known deviations* in `shared/state.md`.
