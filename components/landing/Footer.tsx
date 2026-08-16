import { getSource } from "@/lib/content.ts";
import { CopyButton } from "@/components/ui/CopyButton";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls =
    "inline-flex min-h-[24px] items-center text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm";

  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

export function Footer() {
  const { repo, commit, syncedAt } = getSource();
  const synced = new Date(syncedAt).toISOString().slice(0, 10);

  const footerGroups = [
    {
      heading: "Course",
      links: [
        { label: "Start here", href: "/docs/00-start-here/" },
        { label: "Tracks", href: "/tracks/" },
        { label: "Patterns", href: "/patterns/" },
      ],
    },
    {
      heading: "Learn",
      links: [
        { label: "Roadmap", href: "/roadmap/" },
        { label: "Projects", href: "/projects/" },
        { label: "Resources", href: "/resources/" },
      ],
    },
    {
      heading: "Reference",
      links: [
        { label: "GitHub", href: `https://github.com/${repo}` },
        { label: "MIT License", href: `https://github.com/${repo}/blob/main/LICENSE` },
      ],
    },
  ];

  return (
    <footer className="border-t border-rule bg-bg">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)]">
          {/* brand column */}
          <div className="max-w-sm">
            <p className="font-display text-lg font-extrabold tracking-tight text-ink">
              Graph Engineering
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Learn to build memory systems that scale across multiple agents.
            </p>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-rule bg-surface/40 px-3 py-2">
              <code className="min-w-0 truncate font-mono text-[13px] text-ink">
                <span className="text-muted">$ </span>
                npm install @graph-engineering/core
              </code>
              <CopyButton text="npm install @graph-engineering/core" />
            </div>
          </div>

          {/* link groups */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.heading}>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {group.heading}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* meta bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Graph Engineering. MIT licensed.
          </p>
          <p className="max-w-md text-xs text-muted/70 sm:text-right">
            Content synced from{" "}
            <a
              href={`https://github.com/${repo}/tree/${commit}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              {commit.slice(0, 8)}
            </a>{" "}
            on {synced}
          </p>
        </div>
      </div>
    </footer>
  );
}
