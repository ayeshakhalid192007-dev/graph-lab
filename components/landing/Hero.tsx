import { getAllDocs } from "@/lib/docs.ts";
import { getAllPatterns, getStarterSlugs } from "@/lib/patterns.ts";
import { getRoadmap } from "@/lib/docs.ts";
import { PillButton } from "@/components/ui/PillButton";

/**
 * Hero section with value proposition, CTA buttons, and key stats.
 * Numbers are computed dynamically from course content.
 */
export function Hero() {
  const stats = [
    [getAllDocs().length, "PAGES"],
    [getAllPatterns().length, "PATTERNS"],
    [getStarterSlugs().length, "STARTER KITS"],
    [getRoadmap().length, "QUIZZES"],
  ] as const;

  return (
    <div className="max-w-4xl">
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

      <p className="hero-label mono text-sm uppercase tracking-widest text-accent font-semibold">
        Graph Engineering Course
      </p>

      <h1 className="hero-heading mono mt-6 text-4xl sm:text-5xl leading-tight font-bold text-ink">
        Build memory that more than one agent can trust.
      </h1>

      <p className="hero-description mt-6 text-lg leading-relaxed text-graphite max-w-2xl">
        A file holds up fine while one loop owns it start to finish. Bring in a second worker and you can no longer say who wrote a line. Graph Engineering swaps that file for two graphs — one recording what was attempted, one holding what turned out to be true.
      </p>

      <div className="hero-buttons mt-8 flex flex-wrap gap-4">
        <PillButton href="/docs/00-start-here/">Start the course</PillButton>
        <PillButton href="/tracks/" variant="outline">
          Browse tracks
        </PillButton>
      </div>

      <ul className="hero-stats mono mt-12 flex flex-wrap gap-8 border-t border-rule pt-8 text-sm tracking-wider">
        {stats.map(([n, label]) => (
          <li key={label} className="stat-item">
            <div className="text-2xl font-bold text-primary">{n}</div>
            <div className="text-xs uppercase tracking-widest text-muted mt-1">{label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
