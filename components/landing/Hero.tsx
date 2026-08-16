import { getAllDocs } from "@/lib/docs.ts";
import { getAllPatterns, getStarterSlugs } from "@/lib/patterns.ts";
import { getRoadmap } from "@/lib/docs.ts";
import { PillButton } from "@/components/ui/PillButton";

/**
 * The one place in this project where new prose is written (C2). The wording is
 * drafted and independence-checked in loops/loop-4-landing/state.md under
 * "Landing copy" — change it there first, not here.
 *
 * Every number in the stat strip is computed. Typed literals rot the moment the
 * course repo gains a page, and a landing page that lies about its own size is
 * worse than one that shows no numbers at all.
 */
export function Hero() {
  const stats = [
    [getAllDocs().length, "PAGES"],
    [getAllPatterns().length, "PATTERNS"],
    [getStarterSlugs().length, "STARTER KITS"],
    [getRoadmap().length, "QUIZZES"],
  ] as const;

  return (
    <div className="max-w-3xl">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-label {
          animation: fadeInDown 0.8s ease-out 0.1s both;
        }

        .hero-heading {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .hero-description {
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .hero-buttons {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .hero-stats {
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }

        .stat-item {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .stat-item:nth-child(1) { animation-delay: 0.55s; }
        .stat-item:nth-child(2) { animation-delay: 0.65s; }
        .stat-item:nth-child(3) { animation-delay: 0.75s; }
        .stat-item:nth-child(4) { animation-delay: 0.85s; }

        @media (prefers-reduced-motion: reduce) {
          .hero-label,
          .hero-heading,
          .hero-description,
          .hero-buttons,
          .hero-stats,
          .stat-item {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <p className="hero-label mono text-xs uppercase tracking-[0.2em] text-muted">
        Graph Engineering
      </p>
      <h1 className="hero-heading mono mt-4 text-3xl leading-tight text-ink sm:text-5xl">
        Build memory that more than one agent can trust.
      </h1>
      <p className="hero-description mt-6 text-base leading-relaxed text-graphite sm:text-lg">
        A file holds up fine while one loop owns it start to finish. Bring in a
        second worker and you can no longer say who wrote a line, when it landed,
        or whether anybody checked it. Graph Engineering swaps that file for two
        graphs — one recording what was attempted, one holding what turned out to
        be true — so work that runs in parallel stays auditable afterwards.
      </p>

      <div className="hero-buttons mt-8 flex flex-wrap gap-3">
        <PillButton href="/docs/00-start-here/">Start here</PillButton>
        <PillButton href="/tracks/" variant="outline">
          Pick a track
        </PillButton>
      </div>

      {/* A plain list, not a <dl>: the visible label already names the number, so a
          sr-only <dt> would only make a screen reader say "PAGES, 86 PAGES". */}
      <ul className="hero-stats mono mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-5 text-xs tracking-wider text-muted">
        {stats.map(([n, label]) => (
          <li key={label} className="stat-item">
            <span className="text-accent font-semibold">{n}</span> {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
