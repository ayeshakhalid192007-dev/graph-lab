# Graph Lab — Refactoring & Redesign Rules

## 1. Objective

Refactor the existing Graph Lab application into a clean, maintainable Next.js application using:

- Next.js
- React
- JavaScript / JSX
- CSS
- Motion / Framer Motion for UI animation where useful

The visual direction should be premium, modern, polished, and consistent with the product's identity. The exact color palette and theme must be selected by the project owner during implementation.

- dark premium interface
- glassmorphism
- subtle gradients and glow
- animated graph/network visuals
- smooth entrance and scroll animations
- polished hover interactions
- strong typography
- generous spacing
- responsive layouts

---

## 2. Core Rules

1. Preserve existing Graph Lab functionality.
2. Do not rebuild the project from scratch.
3. Do not delete working features for visual reasons.
4. Do not invent content, statistics, testimonials, projects, or claims.
5. Keep routes working unless a route change is explicitly required.
6. Prefer incremental refactoring over large rewrites.
7. Keep components reusable and focused.
8. Prioritize correctness and usability over decoration.
9. Every major visual change must be responsive.
10. Every animation must have a reduced-motion strategy.

---

## 3. JavaScript-Only Migration

If the final requirement is strictly JavaScript:

- `.tsx` → `.jsx`
- `.ts` → `.js`
- remove TypeScript-only types/interfaces
- preserve runtime behavior
- do not change business logic unnecessarily
- do not add new TypeScript

The final application should use Next.js + React + JavaScript/JSX + CSS.

Do not remove HTML semantics from the rendered application. React/Next.js still renders HTML in the browser. The goal is to remove standalone HTML page templates, not HTML as a web standard.

---

## 5. Animation Rules

Use Motion/Framer Motion for:

- page/section entrance
- scroll reveal
- staggered cards
- hover interactions
- navbar transitions
- layout transitions

Use CSS for simple decorative animations.

Only add GSAP, Three.js, Lenis, particle libraries, etc. when the requirement genuinely needs them.

Do not add dependencies merely to reproduce a visual effect that CSS or Motion can handle.

Preferred reveal:

```text
opacity: 0 → 1
translateY: 24px → 0
```

Preferred card hover:

```text
scale: 1 → 1.02
translateY: 0 → -4px
```

Avoid excessive bouncing, spinning, flashing, or constant large-scale movement.

All non-essential animation must respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* reduce or disable non-essential motion */
}
```

---

## 6. Preserve Existing Functionality

Before changing any feature:

1. Understand what it currently does.
2. Identify its route and dependencies.
3. Preserve its behavior.
4. Change presentation separately.
5. Verify it after the change.

Important areas to preserve include:

- documentation
- patterns
- starter/project content
- quizzes
- flashcards
- practice projects
- search
- certification
- interactive learning features

If existing logic works, refactor its UI instead of replacing the logic.

---

## 7. Repository Audit

Before a major refactor inspect:

- `package.json`
- `app/`
- `components/`
- `content/`
- `lib/`
- `public/`
- `scripts/`
- tests
- configuration files

Identify:

- routes
- layouts
- page components
- reusable components
- content/data sources
- CSS
- dependencies
- interactive components
- duplicated UI
- unused code
- current validation/build commands

Do not assume code is unused. Search its references before deleting it.

---

# 9. Required Work Phases

## Phase 0 — Baseline

Before editing:

- run the project locally
- verify the homepage
- verify important routes
- verify search
- verify interactive features
- verify quizzes
- verify flashcards
- verify projects
- verify certification
- run available lint/build/test checks

Record failures before the redesign so new failures can be distinguished from existing ones.

## Phase 1 — Architecture Audit

Map the current application and dependencies.

Do not delete code during this phase unless it is proven dead.

## Phase 2 — JavaScript Migration

Convert TypeScript/TSX to JS/JSX if strict JS-only is required.

After each group of migrations:

- run the app
- check imports
- check routes
- run build/lint checks

Do not combine migration with unrelated behavioral rewrites.

## Phase 3 — Visual Design

Create one consistent visual system before redesigning individual sections.

## Phase 4 — Homepage Redesign

Recommended order:

1. Navbar
2. Hero
3. Animated graph
4. Learning overview
5. Learning path
6. Interactive section
7. Features
8. Projects
9. Certification CTA
10. Footer

## Phase 5 — Internal Pages

Apply the same design language to documentation, patterns, projects, quizzes, flashcards, and interactive pages without sacrificing readability.

## Phase 6 — Responsive + Accessibility + Performance

Test all major surfaces on mobile, tablet, laptop, and desktop.

---

# 9. Design System

```css
:root {

}
```

Tune these values against the actual Graph Lab content.

---

# 10. Glassmorphism Rules

Glassmorphism should be intentional, not applied everywhere.

Use a combination of:

- translucent background
- backdrop blur
- subtle border
- soft shadow
- rounded corners

Example:

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}
```

Good candidates:

- navbar
- feature cards
- code panels
- interactive panels
- project cards
- important CTA surfaces

Do not put long-form text inside unnecessarily blurred surfaces.

---

# 11. Graph Lab Identity

Do not turn Graph Lab into a generic SaaS template.

The visual identity should come from graph engineering:

- nodes
- edges
- graph paths
- connected points
- network structures
- graph diagrams
- code/algorithm motifs
- learning progression

The hero should preferably use an animated graph/network instead of generic floating blobs.

Decorative animation should reinforce the product.

---

# 12. Homepage Structure

Recommended structure:

```text
Floating glass navbar
Hero
Learning overview
Learning path
Interactive graph section
Features / capabilities
Practice projects
Certification CTA
Footer
```

Do not add:

- fake testimonials
- fake statistics
- fake customer logos
- invented claims

---

# 13. Navbar

Create a floating glass navbar with:

- logo/brand
- existing navigation
- active route state
- responsive mobile navigation
- keyboard accessibility
- visible focus states

Animation:

- subtle entrance
- optional compact state on scroll
- smooth transitions

Do not make navigation harder to use for visual effects.

---

# 14. Hero

The hero must immediately explain Graph Lab.

Include:

- strong headline
- short supporting text
- primary CTA
- secondary CTA when useful
- animated graph/network visual
- subtle ambient glow

Keep the hero readable and spacious.

Do not let animation compete with the main message.

---

# 15. Animated Graph

Create a reusable graph visual component.

Possible behavior:

- nodes gently pulse
- edges subtly animate
- selected nodes glow
- graph slowly drifts
- pointer interaction creates subtle movement

Requirements:

- lightweight
- optimized
- isolated from business logic
- reduced-motion support
- no animation required for comprehension

If canvas is required, isolate it in its own component and avoid unnecessary React re-renders.

---

# 16. Cards

Cards should use a consistent glass style.

Possible hover:

- slight upward movement
- slight scale
- brighter border
- subtle glow
- small icon movement

Avoid exaggerated effects.

---

# 17. Learning Path

Create a visual progression such as:

```text
01 Fundamentals
      ↓
02 Graph Modeling
      ↓
03 Graph Patterns
      ↓
04 Practice
      ↓
05 Projects
```

Graph-like connections can illuminate on scroll.

The learning path must remain understandable with animations disabled.

---

# 18. Interactive Learning

Keep existing interactive functionality.

Present it inside polished panels where appropriate.

Improve:

- hierarchy
- spacing
- controls
- labels
- loading states
- empty states
- error states
- responsiveness

Do not sacrifice usability for appearance.

---

# 19. Documentation

Documentation must prioritize:

1. readability
2. navigation
3. search
4. code clarity
5. content hierarchy
6. visual polish

Use glass effects mainly for:

- side navigation
- controls
- code blocks
- callouts
- interactive examples

Avoid excessive blur behind large amounts of text.

---

# 20. Projects and Certification

Project cards should only show metadata already available in the application.

Use:

- project name
- existing difficulty
- existing description
- existing tags
- action

Certification should be a visually strong CTA while preserving the existing certification flow.

Do not invent certification claims.

---

# 21. Component Architecture

Prefer focused components:

```text
components/
  landing/
    Navbar.jsx
    Hero.jsx
    HeroGraph.jsx
    LearningOverview.jsx
    LearningPath.jsx
    InteractiveLearning.jsx
    Projects.jsx
    CertificationCTA.jsx
    Footer.jsx

  ui/
    GlassCard.jsx
    GlassButton.jsx
    SectionHeading.jsx
    AnimatedSection.jsx

  animations/
    FadeIn.jsx
    Stagger.jsx
```

Do not create tiny components without a real reuse or responsibility benefit.

Do not create one giant page component containing all homepage logic.

---

# 22. Routing

Preserve existing routes.

If a route changes:

1. find all references
2. update navigation
3. update internal links
4. add redirect behavior if appropriate
5. verify the old route

Never break deep links accidentally.

---

# 23. Client Components

Do not add `"use client"` everywhere.

Use client components only where browser interactivity is required, such as:

- interactive graph controls
- animation state that requires client execution
- menus
- quizzes
- interactive learning tools

Keep static content server-rendered where possible.

---

# 24. Accessibility

Every redesigned surface must support:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- sufficient contrast
- reduced motion
- responsive text
- non-hover alternatives

No important action may depend only on hover.

---

# 25. Responsive Design

Explicitly test:

- navbar
- hero
- graph animation
- cards
- learning path
- interactive tools
- documentation
- project cards
- footer

on:

- mobile
- tablet
- laptop
- large desktop

Do not simply shrink the desktop design.

---

# 26. Performance

Prefer:

- transforms
- opacity
- CSS animations
- Motion transforms
- optimized assets

Avoid continuously animating expensive layout properties.

Do not create unnecessary client-side rendering.

Do not add heavy libraries for simple effects.

---

# 27. Content Rules

Never modify educational content just for styling.

Never invent:

- lessons
- statistics
- testimonials
- project results
- user counts
- certifications
- companies
- reviews

Separate content from presentation when practical.

---

# 28. Git Rules

Use small meaningful commits.

Suggested progression:

```text
refactor: audit existing application
refactor: migrate components to javascript
refactor: migrate routes to javascript
style: introduce graph lab design system
style: redesign navigation
style: redesign hero
feat: add animated graph visual
style: redesign learning sections
style: redesign interactive sections
style: redesign project cards
style: redesign certification CTA
feat: add responsive behavior
perf: optimize animations
fix: resolve accessibility and responsive issues
```

Do not create one giant commit containing the entire refactor.

---

# 29. Task Execution Protocol

For every task follow:

### Step 1 — Inspect

Read the relevant existing files before editing.

### Step 2 — Plan

Identify:

- what changes
- what remains unchanged
- affected files
- dependencies
- verification method

### Step 3 — Implement

Make the smallest clean set of changes required.

### Step 4 — Verify

Run relevant checks and inspect affected pages.

### Step 5 — Fix

Resolve errors before continuing.

### Step 6 — Report

Report:

- files changed
- functionality changed
- visual changes
- animation changes
- verification performed
- remaining issues

---

# 30. Verification

After each meaningful phase:

1. start the development server
2. inspect affected pages
3. inspect browser console
4. check imports
5. check navigation
6. check responsive behavior
7. run available lint/build/test commands

At minimum verify:

- homepage
- documentation
- patterns
- projects
- quizzes
- flashcards
- search
- certification
- interactive features

---

# 31. Definition of Done

The refactor is complete when:

- [ ] Next.js + React + JavaScript + CSS stack is used
- [ ] TypeScript is removed if strict JS-only migration is required
- [ ] existing functionality still works
- [ ] existing routes still work
- [ ] search still works
- [ ] interactive features still work
- [ ] quizzes work
- [ ] flashcards work
- [ ] projects work
- [ ] certification works
- [ ] homepage uses the new visual system
- [ ] glassmorphism is consistent
- [ ] animated graph visual exists
- [ ] scroll/entrance animations exist
- [ ] hover interactions exist
- [ ] mobile layout works
- [ ] reduced-motion behavior works
- [ ] keyboard navigation works
- [ ] no unnecessary dependencies were added
- [ ] no fake content was introduced
- [ ] build/lint/test checks pass where available
- [ ] no avoidable browser-console errors remain

---

# 32. Final Design Principle

The final Graph Lab should feel like:

> A premium interactive learning platform built around graph engineering.

It should NOT feel like:

> A generic glassmorphism template with Graph Lab text inserted into it.

Every major visual effect should support Graph Lab:

- graph nodes
- graph connections
- learning progression
- interactive exploration
- code
- patterns
- projects
- certification
