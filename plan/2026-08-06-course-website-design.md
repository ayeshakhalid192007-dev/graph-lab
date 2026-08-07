# Graph Engineering Course Website — Design Spec

**Date:** 2026-08-06
**Status:** Approved, ready for implementation planning
**Owner:** Ayesha Khalid
**Supersedes:** the architecture assumed by `day-4-plan.md` (same-repo `web/`, Next.js 15, MDX). The feature scope of that plan is kept in full; only the repo location, content pipeline, render layer, and visual direction change.

## Problem

The course exists as 86 markdown files under `docs/`, 23 pattern specs under `patterns/`, and 24 starter kits under `starters/`. All of it is readable on GitHub, but there is no web surface — no navigation, no rendered diagrams, no interactive quizzes, no way to browse the pattern library without cloning the repo.

The constraint that shapes everything below: **the markdown in `docs/` is the only place course content is authored.** A website must render that content, never restate it. If a page reads wrong on the site, the fix belongs in `docs/`.

## Goal

Ship `graph-lab` — a fully static website where a reader can work through the entire course in a browser: every doc page, the 17-step roadmap, the four skill tracks, the pattern library with its starter kits, seven interactive quizzes, six flashcard sets, the eight practice projects, the ten attributed sources, and the Graph Ready certification flow.

## Decisions

| Decision | Choice | Reasoning |
| --- | --- | --- |
| Repo location | Separate repo, `graph-lab` | Keeps the course repo content-only; mirrors the `loop-lab` arrangement the owner already runs. |
| Content pipeline | Sync script, pinned to a commit | Content is copied in by `scripts/sync-docs.mjs` and pinned in `content/SOURCE.json`. |
| Feature scope | Every `day-4-plan.md` feature the content actually exercises, plus site search | The site is the course's primary reading surface, not a landing page. Three planned components are deferred — see the verified content inventory. |
| Visual direction | Blueprint — fresh design, borrowed structure | Route structure and information architecture follow `loop-lab`; every visual choice is new. |
| Deploy target | GitHub Pages at `/graph-lab` | Same setup as `loop-lab`; a static export needs nothing more. |

## Non-goals

No backend, database, accounts, authentication, analytics, or comments. Every stateful feature — reading progress, quiz scores, the certification checklist — is `localStorage` on the reader's own machine. The site is a static export that could be served from any file host.

No content is authored in `graph-lab`. The one exception is the landing page's own hero and section copy, which is site chrome rather than course material, and which must be independently worded from both `README.md` and `docs/README.md`.

## Architecture

### Repo layout

```text
graph-lab/
├── app/
│   ├── page.tsx                    landing
│   ├── layout.tsx                  shell: nav, footer, theme, grid background
│   ├── docs/[...slug]/page.tsx     all 86 doc pages
│   ├── tracks/page.tsx
│   ├── patterns/page.tsx
│   ├── patterns/[slug]/page.tsx
│   ├── quiz/[part]/page.tsx
│   ├── flashcards/[part]/page.tsx
│   ├── projects/page.tsx
│   ├── resources/page.tsx
│   ├── certification/page.tsx
│   └── sitemap.ts
├── components/
│   ├── landing/                    Hero, Curriculum, PatternGrid, GetStarted, Footer
│   ├── docs/                       DocSidebar, DocToc, DocBreadcrumbs, DocFooterNav
│   ├── content/                    GraphDiagram, CodeBlock, Toc anchors
│   ├── interactive/                Quiz, Flashcards, PatternBrowser, StarterViewer, …
│   └── ui/                         Section, Panel, PillButton, ThemeToggle, SearchDialog
├── lib/
│   ├── content.ts                  reads content/, parses frontmatter
│   ├── docs.ts                     slug map, roadmap, prev/next, sidebar tree
│   ├── markdown.ts                 remark/rehype pipeline
│   ├── links.ts                    rewrites relative .md links to routes
│   ├── search.ts                   client-side index query
│   └── base-path.ts                GitHub Pages basePath helper
├── content/                        GENERATED — never hand-edited
│   ├── docs/  patterns/  starters/  resources/
│   └── SOURCE.json
├── scripts/
│   ├── sync-docs.mjs
│   ├── check-sync.mjs
│   ├── check-content-shape.mjs
│   ├── build-search-index.mjs
│   └── check-links.mjs
└── .github/workflows/deploy.yml
```

### Content pipeline

`scripts/sync-docs.mjs` is the only writer of `content/`. It copies four trees from the course repo — `docs/`, `patterns/`, `starters/`, `resources/` — byte for byte, with no added banners or frontmatter, so that a file on the site is textually identical to the file on GitHub. It then writes `content/SOURCE.json`:

```json
{
  "repo": "ayeshakhalid192007-dev/graph-engineering-crash-course",
  "commit": "<full sha>",
  "syncedAt": "<ISO 8601 timestamp>",
  "files": "<count of files copied>"
}
```

Two npm scripts wrap it:

- `npm run sync:latest` — fetches the course repo's newest commit on `main`, re-copies all four trees, updates `SOURCE.json`. This is the only sanctioned way `content/` changes.
- `npm run sync:check` — re-runs the sync against the commit already pinned in `SOURCE.json`, into a temp directory, and diffs it against `content/`. Any difference is a hand-edit, and it fails.

### Single-source guarantees

`sync:check` runs in CI on every push and pull request. The practical effect is that `content/` cannot diverge from the pinned commit without the build going red, so it functions as a build artifact rather than a second copy anyone can author against. Advancing to newer course content is an explicit, reviewable `sync:latest` commit that shows the full diff.

A short `content/README.md` states that the directory is generated, names the script that generates it, and tells a reader where to make the fix instead.

### Documentation follow-up

`docs/README.md` in the course repo currently reads: *"there is exactly one copy of the content, not two that can drift apart."* A pinned snapshot in a second repo is a narrow exception to that claim. When the site ships, that sentence gets a small amendment noting that the website builds from a commit-pinned snapshot of these same files. This is the only change this project makes to the course repo.

## Routes

Every route is prerendered by `output: "export"`. Dynamic segments enumerate their params from `content/` at build time.

| Route | Renders |
| --- | --- |
| `/` | Landing: hero, the two-graph split, curriculum overview, pattern grid, get-started, maintainers |
| `/docs/[...slug]/` | Any of the 86 doc pages, with sidebar, table of contents, breadcrumbs, prev/next |
| `/tracks/` | The G1–G4 track selector and the full 17-step roadmap |
| `/patterns/` | Filterable browser over the 23 patterns |
| `/patterns/[slug]/` | One pattern spec plus its starter kit's files |
| `/quiz/[part]/` | Seven interactive quizzes, one per Part |
| `/flashcards/[part]/` | Six flip-card sets — Part 6 is quiz-only by design |
| `/projects/` | The eight practice projects as cards, linking into `/docs/projects/…` |
| `/resources/` | The ten attributed sources plus the anti-patterns summary |
| `/certification/` | Graph Ready checklist and certificate generator |
| `/sitemap.xml`, `/llms.txt`, `/404` | Generated |

## Render layer

`lib/markdown.ts` runs a remark/rehype pipeline that produces React elements. **MDX is deliberately not used.** Course markdown must stay plain and readable on GitHub, which rules out embedding JSX in the source files; the transformations below are pattern matches on ordinary markdown instead.

### Verified content inventory

`day-4-plan.md` anticipated four markdown conventions. An audit of the shipped content on 2026-08-06 found that Days 1–3 adopted only one of them. What the course actually contains:

| Convention | Occurrences | Handling |
| --- | --- | --- |
| ` ```mermaid ` fence | 20, across 20 files | `GraphDiagram` |
| ` ```markdown ` fence | 41 | Syntax-highlighted code block |
| ` ```json `, `yaml`, `text`, `jsonl` fences | 23 | Syntax-highlighted code block |
| Relative `.md` links | Throughout | Rewritten to site routes |
| ` ```claude ` / ` ```opencode ` pairs | 0 | Deferred — see below |
| `> [!NOTE]`, `> [!WARNING]` | 0 | Deferred — see below |
| `<!-- check -->` markers | 0 | Deferred — see below |

`CodeTabs`, `Callout`, and `CheckYourself` are **not built in v1**, because no content would exercise them. Each has a correct degraded fallback if the course later adopts the convention: paired fences render as two ordinary code blocks, a GitHub alert renders as a plain blockquote, and a comment marker renders as nothing. None of these fallbacks is broken output. Adding a component later is a self-contained change to `lib/markdown.ts`.

### Transformations

| Markdown convention | Component |
| --- | --- |
| ` ```mermaid ` fence | `GraphDiagram` — client-side render to SVG |
| Any other fenced block | Build-time syntax highlighting via Shiki, themed to the Blueprint palette in both modes; zero client-side JavaScript |
| Relative `.md` links | Rewritten to site routes by `lib/links.ts` |
| `##` and `###` headings | Slugged anchors, collected into the page's table of contents |

The three animated diagrams — `TwoGraphsSplit`, `LifecycleDiagram`, `SubgraphViewer` — have no marker convention in the content to trigger them, so in v1 they are **landing-page components only**, where site chrome legitimately lives. Embedding them inside doc pages would require introducing a marker convention into `docs/`, which is a course-content change and therefore out of scope for this project.

`lib/links.ts` resolves a relative link the same way GitHub does, then maps the resulting repo path to its site route — `../02-foundations/glossary.md#node` becomes `/docs/02-foundations/glossary/#node`. A link that resolves to no known page fails the link check rather than shipping as a dead link.

## Search

`scripts/build-search-index.mjs` runs before `next build` and emits `public/search-index.json`: one record per page carrying its route, title, breadcrumb section, heading list, and a body excerpt truncated to roughly 300 characters, plus a compact inverted index over title and heading tokens.

The client loads the index lazily on the first keystroke or `Cmd/Ctrl-K`, so it costs nothing on initial page load. Matching is scored — title hits above heading hits above body hits — and results group under their course section. There is no external search service and no third-party script; matching is a small local function in `lib/search.ts`.

The index is expected to land under 400 KB before compression. If it exceeds that, headings-only indexing is the fallback, and body excerpts are dropped.

## Design system — Blueprint

The visual language is technical drafting: this is an engineering discipline, presented as one.

- **Palette.** Warm paper white, ink blue, and graphite in light mode; deep slate with cyan in dark mode. Both palettes are chosen for this site and share nothing with `loop-lab`.
- **Typography.** A sans face for body prose; a monospace face for node names, edge labels, section numbers, buttons, and code. The deliberate alternation between the two carries the identity.
- **Surface.** A faint dot-grid background, hairline rules in place of card borders, and corner ticks on panels. No shadows, no gradients, no glow.
- **Motion.** Edges draw themselves via SVG `stroke-dashoffset`; nodes snap into position as they scroll in. All motion is suppressed under `prefers-reduced-motion`.
- **Theme.** Class-based dark mode with the reader's choice persisted, defaulting to the system preference. Mermaid receives an explicit dark theme so rendered diagrams stay legible.

## Interactive components

All are client components. All persistence is `localStorage`.

| Component | Behavior |
| --- | --- |
| `ProgressTracker` | Records completed step slugs, renders progress against the 17 steps |
| `TrackSelector` | The four G1–G4 tracks as selectable cards, each linking to its first step |
| `Quiz` | One question at a time, reveal-answer, running tally |
| `Flashcards` | Flip cards with a shuffle control |
| `PatternBrowser` | Filters across category A–G, stage, and tool; grid of pattern cards |
| `StarterViewer` | File tree plus content pane over a kit's real files, with a Claude Code / OpenCode switcher where the kit ships both |
| `GraphReadyChecklist` | The seven Graph Ready criteria as checkboxes; all seven unlock the generator |
| `CertificateGenerator` | Renders a certificate to canvas and downloads it as PNG; name is typed in, no accounts |

## Content shape contract

The quiz and flashcard parsers depend on structures already present in the course repo, verified on 2026-08-06:

**Quizzes** — `## N. Title`, followed by the question paragraph, followed by a `<details>` block whose `<summary>` is `Reveal the answer` and whose body is the answer. All seven files match, with heading counts equal to `<details>` counts (3, 2, 3, 2, 3, 2, 2).

**Flashcards** — a `| Term | Definition |` table whose term cells are bold. All six files match (6, 3, 6, 5, 7, 3 rows). Part 6 has no flashcards file, which is intentional per the master plan.

`scripts/check-content-shape.mjs` asserts both contracts in CI and **fails the build** on a mismatch. A quiz that stops parsing after a future content edit produces a red build, never a silently empty page.

## Deploy

`.github/workflows/deploy.yml` runs on push to `main`:

```text
npm ci
npm run sync:check              content matches the pinned commit
npm run check:content-shape     quizzes and flashcards still parse
npm run build:search            emit public/search-index.json
next build                      PAGES_BASE_PATH=/graph-lab
npm run check:links             validate links in the emitted out/
upload out/ → actions/deploy-pages
```

`next.config.ts` sets `output: "export"`, `images.unoptimized`, `trailingSlash: true`, and reads `basePath`/`assetPrefix` from `PAGES_BASE_PATH`, which is unset for local development so the dev server serves from the root.

The site lands at `https://ayeshakhalid192007-dev.github.io/graph-lab/`.

**Creating the GitHub repo, pushing to it, and enabling Pages require explicit confirmation at that step.** Implementation proceeds locally until then.

## Definition of done

- Every one of the 86 doc pages renders, reachable from the sidebar, with working prev/next.
- All 20 mermaid diagrams render as SVG in both themes; every fenced code block is syntax highlighted; every internal link resolves.
- Search returns correct results for a term drawn from a body paragraph, a heading, and a page title.
- All seven quizzes and six flashcard sets are playable.
- The pattern browser filters correctly and every starter kit's files are viewable.
- The Graph Ready checklist unlocks and downloads a certificate.
- Layout holds at 375, 768, and 1280 pixels; the sidebar collapses below 768.
- Every interactive element has a visible focus state and an accessible name; a Lighthouse accessibility pass reports no critical issues.
- Both themes are checked on every page type, including mermaid diagram legibility.
- `sync:check`, `check-content-shape`, `check-links`, `next build`, and `tsc --noEmit` all pass.

## Risks

**Search index size.** 86 pages of long-form prose could push the index past a comfortable download. Mitigated by excerpt truncation, lazy loading, and a headings-only fallback.

**Mermaid and static export.** Mermaid renders in the browser, so diagrams are absent from the prerendered HTML. Acceptable for a course site; each diagram keeps its source text as a fallback for readers without JavaScript.

**Content drift between syncs.** By design, the site tracks a pinned commit and can lag `main`. `SOURCE.json` records exactly which commit is live, and the footer surfaces the sync date so the gap is visible rather than hidden.

**Starter kit volume.** 24 kits with many files each will inflate the static export. If the build grows unwieldy, `StarterViewer` loads file contents from generated JSON on demand rather than inlining every file into the page.
