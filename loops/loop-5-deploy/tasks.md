# Loop 5 tasks

Tasks 19–22. Full detail is in `plan/2026-08-07-graph-lab-implementation-plan.md` under each task's heading.

This loop **adds no features.** Anything missing is a defect to fix, not a surface to build.

**Tick a box only after its command was run and its output read** — or, for the manual passes, after it was *looked at* and the observation recorded. Red means not done.

---

## Task 19 — Responsive and accessibility pass

*Plan: `## Task 19` · 4 steps*

- [ ] 19.1 **Check every page type at 375, 768, and 1280** — the sidebar must collapse below 768
- [ ] 19.2 **Keyboard-only pass** — every interactive element reachable, with a visible focus state and an accessible name (constraint C14)
- [ ] 19.3 **Lighthouse accessibility on three pages** — landing, one doc page, `/certification/`. Fix everything flagged critical. **Record all three scores in `state.md`**
- [ ] 19.4 Commit

**Task done when:** all three breakpoints checked on every page type, the keyboard pass is clean, and three Lighthouse scores are recorded with no critical issues outstanding.

Record the observation, not the verdict — "sidebar collapsed at 767px, expanded at 768", not "responsive OK".

---

## Task 20 — Both-themes pass

*Plan: `## Task 20` · 5 steps*

- [ ] 20.1 **Check every page type in both themes** — body prose, mono labels, hairline rules against both surfaces, `Panel` corner ticks, the accent on buttons and links, disabled states
- [ ] 20.2 **Check all 20 mermaid diagrams in dark mode specifically** — node fills, edge lines, and label text all legible against `--paper` dark. If any is unreadable, adjust `GraphDiagram`'s `themeVariables`, **not the course content**
- [ ] 20.3 **Check Shiki in both themes** — confirm the dual-theme CSS variables actually switch. A code block stuck light-themed in dark mode means the `@shikijs/rehype` `.dark` selector needs configuring
- [ ] 20.4 **Confirm no flash of wrong theme on load** — hard refresh, in both themes
- [ ] 20.5 Commit

**Task done when:** every page type has been seen in both themes, all 20 diagrams are legible in dark, Shiki switches, and there is no flash on hard refresh.

---

## Task 21 — Full Definition of Done verification

*Plan: `## Task 21` · 4 steps*

- [ ] 21.1 **Run the full gate** — `npm run verify:all`
- [ ] 21.2 **Walk the spec's Definition of Done line by line** against the running site. For each of the ten bullets, record in `state.md` **what was checked and what was observed** — not "done", but the actual count or the actual behaviour. **Any bullet that cannot be confirmed is a defect to fix now, not a note to file**
- [ ] 21.3 **Verify the emitted export one more time**
- [ ] 21.4 Commit

The ten bullets are in `../shared/goal.md` under *Definition of Done*, taken verbatim from `plan/2026-08-06-course-website-design.md`. **This is where they get ticked** — the only place in the project.

**Task done when:** `verify:all` is green and all ten DoD bullets are confirmed with evidence.

---

## Task 22 — Deploy · **BLOCKED**

*Plan: `## Task 22` · 6 steps*

> **Constraint C18.** Creating the repo, pushing site code, and enabling Pages require **explicit user confirmation**. The remote already holding the loop scaffold does **not** pre-authorise this — see D1 in `../shared/state.md`.
>
> **Stop here and ask.** Report Tasks 19–21 complete and `verify:all` green; do not proceed until the user answers.

- [ ] 22.1 *(once unblocked)* Write `.github/workflows/deploy.yml` — keep Node in step with `.nvmrc` and `package.json` engines; `PAGES_BASE_PATH=/graph-lab`
- [ ] 22.2 Write `README.md` — what the repo is, that `content/` is generated and how to refresh it (`npm run sync:latest`), the local dev command, the four verification commands, a link to the live site
- [ ] 22.3 **Create the repo and push — only after confirmation**
- [ ] 22.4 Watch the run and verify the live site at `https://ayeshakhalid192007-dev.github.io/graph-lab/`
- [ ] 22.5 Amend the course repo's `docs/README.md` — **the only change this project makes to `graph-engineering-course`**
- [ ] 22.6 Final commit, record loop state, stop

---

## Gate

- [ ] `npm run verify:all` green
- [ ] Task 19, 20, 21 boxes above ticked
- [ ] Three Lighthouse scores recorded in `state.md`
- [ ] All ten DoD bullets in `../shared/goal.md` ticked, each with what was observed
- [ ] Four entries in `state.md`
- [ ] Any cross-loop repairs recorded in `shared/state.md`
- [ ] Gate entry appended to `shared/state.md`, row set to `gate green, awaiting review`
- [ ] **Stopped at Task 22, awaiting explicit deploy confirmation**

See `gate.md`.
