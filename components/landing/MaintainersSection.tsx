import { Section } from "@/components/ui/Section";

const MAINTAINERS = [
  {
    name: "Ayesha Khalid",
    initials: "AK",
    github: "https://github.com/ayeshakhalid192007-dev",
  },
  {
    name: "Saram Ali",
    initials: "SA",
    github: "https://github.com/SARAMALI15792",
  },
] as const;

export function MaintainersSection() {
  return (
    <Section id="maintainers">
      <div className="mb-12">
        <p className="mono text-xs uppercase tracking-widest text-accent font-semibold">
          Who&apos;s behind this
        </p>
        <h2 className="mt-4 text-3xl font-bold text-ink tracking-tight">
          Meet the maintainers
        </h2>
      </div>

      <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
        {MAINTAINERS.map((m) => (
          <a
            key={m.name}
            href={m.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-rule bg-surface/40 p-8 transition-all duration-200 hover:border-accent hover:bg-surface/60"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-lg font-bold text-accent">
              {m.initials}
            </div>
            <div className="mt-4">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Maintainer
              </p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">
                {m.name}
              </h3>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted group-hover:text-accent transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97.01 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              GitHub
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
