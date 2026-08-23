import { getSource } from "@/lib/content.ts";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-muted hover:text-accent-primary transition-colors flex items-center gap-2"
    >
      {children}
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M18.25 12a.75.75 0 0 0-.75-.75H8.31l-4.47 4.47a.75.75 0 1 0 1.06 1.06l3.72-3.72H17.5a.75.75 0 0 0 0-1.5Z" />
        <path d="M15.5 4.25a.75.75 0 0 0-1.5 0v2.5h-11a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-11h1.75a.75.75 0 0 0 0-1.5h-1.75v-2.5Z" />
      </svg>
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
    <footer className="border-t border-rule bg-surface mt-20">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:px-8 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)]">
          {/* brand column */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="#8C7B63" strokeWidth="0.5" opacity="0.2" />
                <circle cx="24" cy="24" r="5" fill="#6B8C75" />
                <circle cx="12" cy="12" r="3" fill="#8C6B72" />
                <circle cx="36" cy="12" r="3" fill="#8C6B72" />
                <circle cx="12" cy="36" r="3" fill="#8C6B72" />
                <circle cx="36" cy="36" r="3" fill="#8C6B72" />
              </svg>
              <span className="font-mono text-xl font-bold text-ink">graph-lab</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Learn to build memory systems that scale across multiple agents using Graph Engineering.
            </p>

            <div className="mt-8">
              <p className="text-xs font-mono text-muted mb-3 uppercase tracking-wider">Install</p>
              <code className="block font-mono text-xs bg-surface-soft border border-rule rounded p-3 text-ink">
                <span className="text-muted">$ </span>npm install @graph-engineering/core
              </code>
            </div>
          </div>

          {/* link groups */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.heading}>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                  {group.heading}
                </p>
                <ul className="space-y-3">
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
        <div className="mt-12 pt-6 border-t border-rule flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm">
          <p className="text-muted">
            © {new Date().getFullYear()} Graph Engineering. MIT licensed.
          </p>
          <p className="text-muted flex items-center gap-2">
            <span className="text-xs font-mono bg-surface-soft px-2 py-1 rounded">
              {commit.slice(0, 8)}
            </span>
            synced on {synced}
          </p>
        </div>
      </div>
    </footer>
  );
}
