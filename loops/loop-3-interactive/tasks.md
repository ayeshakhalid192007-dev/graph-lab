# Loop 3 tasks

Tasks 10–14. Full detail is in `plan/2026-08-07-graph-lab-implementation-plan.md` under each task's heading.

All components in this loop are **client components**; all persistence is **`localStorage`**.

**Tick a box only after its command was run and its output read.** Red means not done.

---

## Task 10 — Tracks page, `TrackSelector`, `ProgressTracker`

*Plan: `## Task 10` · 5 steps*

**Consumes:** `lib/docs.ts` (Task 5).

**Produces:** `TRACKS: Track[]` from `lib/tracks.ts`, where
`Track = { id: "G1"|"G2"|"G3"|"G4"; name: string; level: string; startsKnowing: string; finishesAbleTo: string; steps: string[]; firstStepRoute: string }`.
`ProgressTracker` takes `{ steps: DocMeta[] }` and is **reused on the landing page by Loop 4**.

- [ ] 10.1 Write `lib/tracks.ts` — the four G1–G4 definitions; structural site data, not course content
- [ ] 10.2 Write `components/interactive/ProgressTracker.tsx` — records completed step slugs against the 17 steps
- [ ] 10.3 Write `components/interactive/TrackSelector.tsx`
- [ ] 10.4 Write `app/tracks/page.tsx`
- [ ] 10.5 **Verify the track routes are real**, then build and commit

**Task done when:** 4 tracks render, 17 roadmap steps render, and every `firstStepRoute` points at a page that exists.

---

## Task 11 — Pattern browser and starter viewer

*Plan: `## Task 11` · 6 steps*

**Consumes:** `content/patterns/registry.yaml`, `content/patterns/*.md`, `content/starters/*/` (Task 2); `renderMarkdown` (Task 7).

**Produces:** `/patterns/` and `/patterns/[slug]/`, plus `public/starters/<slug>.json` payloads.

- [ ] 11.1 Write `lib/patterns.ts` — registry + pattern specs + starter kits
- [ ] 11.2 Write `scripts/build-starters.mjs` — emits per-kit JSON so files load on demand rather than inlining into pages
- [ ] 11.3 Write `components/interactive/PatternBrowser.tsx` — filters across category A–G, stage, and tool
- [ ] 11.4 Write `components/interactive/StarterViewer.tsx` — file tree + content pane, with a Claude Code / OpenCode switcher where the kit ships both
- [ ] 11.5 Write both pattern routes
- [ ] 11.6 Build, verify counts, commit

**Task done when:** **23 patterns** browse and filter correctly, and all **24 starter kits** have viewable files.

---

## Task 12 — Quizzes and flashcards

*Plan: `## Task 12` · 4 steps*

**Consumes:** `parseQuiz`, `parseFlashcards`, `QuizQuestion`, `Flashcard` from `lib/parse-content.ts` (Task 3) — **the same functions `check-content-shape.mjs` runs in CI.** Import them; do not write a second parser. Also `getRoadmap()` (Task 5).

**Produces:** `/quiz/[part]/` × 7 and `/flashcards/[part]/` × 6.

- [ ] 12.1 Write `components/interactive/Quiz.tsx` — one question at a time, reveal-answer, running tally
- [ ] 12.2 Write `components/interactive/Flashcards.tsx` — flip cards with a shuffle control
- [ ] 12.3 Write both routes
- [ ] 12.4 Build, verify counts, commit

**Task done when:** **7 quizzes** and **6 flashcard sets** are playable. Part 6 having no flashcards is by design — not a bug.

---

## Task 13 — Projects and resources pages

*Plan: `## Task 13` · 3 steps*

- [ ] 13.1 Write `app/projects/page.tsx` — 8 practice projects as cards, linking into `/docs/projects/…`
- [ ] 13.2 Write `app/resources/page.tsx` — 10 attributed sources plus the anti-patterns summary
- [ ] 13.3 Build, verify, commit

**Task done when:** 8 projects and 10 sources render, and every project card's link resolves.

---

## Task 14 — Certification

*Plan: `## Task 14` · 5 steps*

**Consumes:** `getRoadmap()` (Task 5).

- [ ] 14.1 Write `components/interactive/GraphReadyChecklist.tsx` — the seven Graph Ready criteria; **all seven unlock the generator**
- [ ] 14.2 Write `components/interactive/CertificateGenerator.tsx` — renders to canvas, downloads as PNG; name typed in, no accounts
- [ ] 14.3 Write `app/certification/page.tsx`
- [ ] 14.4 **Run the Loop 3 gate** — `npm run verify:3`
- [ ] 14.5 Commit and record loop state

**Task done when:** the checklist unlocks at seven of seven and a certificate **actually downloads**. Report the downloaded file.

---

## Gate

- [ ] `npm run verify:3` green
- [ ] All Task 10–14 boxes above ticked
- [ ] Five entries in `state.md`, one per task
- [ ] A certificate downloaded and reported
- [ ] Gate entry appended to `shared/state.md`, row set to `gate green, awaiting review`
- [ ] **Stopped.** Loop 4 not started.

See `gate.md`.
