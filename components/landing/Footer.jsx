import Link from "next/link";
import { getSource } from "@/lib/content.js";
import { Logo } from "@/components/ui/Logo";

function FooterLink({ href, children, internal = false }) {
  const className =
    "text-sm text-graphite hover:text-accent-primary transition-colors inline-flex items-center gap-1.5";
  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
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
        { label: "Start here", href: "/docs/00-start-here/", internal: true },
        { label: "Tracks", href: "/tracks/", internal: true },
        { label: "Patterns", href: "/patterns/", internal: true },
      ],
    },
    {
      heading: "Build",
      links: [
        { label: "Roadmap", href: "/tracks/", internal: true },
        { label: "Projects", href: "/projects/", internal: true },
        { label: "Resources", href: "/resources/", internal: true },
      ],
    },
    {
      heading: "Reference",
      links: [
        { label: "GitHub", href: `https://github.com/${repo}`, internal: false },
        {
          label: "License",
          href: `https://github.com/${repo}/blob/main/LICENSE`,
          internal: false,
        },
      ],
    },
  ];

  return (
    <footer className="border-t border-rule-strong mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <Logo />
              <span className="font-mono text-xl font-bold text-ink">graph-lab</span>
            </div>
            <p className="text-sm text-graphite leading-relaxed mb-6">
              Learn to build memory systems that scale across multiple agents using
              Graph Engineering.
            </p>
            <div>
              <p className="text-xs font-mono text-muted mb-2 uppercase tracking-wider">
                Install
              </p>
              <code className="block font-mono text-xs glass rounded-xl p-3 text-ink">
                <span className="text-muted">$</span> npm install
                @graph-engineering/core
              </code>
            </div>
          </div>

          {/* Links */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            {footerGroups.map((group) => (
              <div key={group.heading}>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent-primary mb-4">
                  {group.heading}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} internal={link.internal}>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Maintainers */}
        <div className="mb-12 pb-12 border-b border-rule-strong">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent-primary mb-4">
            Maintainers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="var(--accent-primary)"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-mono font-semibold text-ink text-sm">
                    Ayesha Khalid
                  </h3>
                  <p className="text-xs text-graphite">Creator & Maintainer</p>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href="https://github.com/ayeshakhalid192007-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-primary hover:text-accent-secondary transition-colors inline-flex items-center gap-1"
                    >
                      GitHub
                      <svg
                        viewBox="0 0 24 24"
                        width="10"
                        height="10"
                        fill="currentColor"
                      >
                        <path d="M18.25 12a.75.75 0 0 0-.75-.75H8.31l-4.47 4.47a.75.75 0 1 0 1.06 1.06l3.72-3.72H17.5a.75.75 0 0 0 0-1.5Z" />
                        <path d="M15.5 4.25a.75.75 0 0 0-1.5 0v2.5h-11a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-11h1.75a.75.75 0 0 0 0-1.5h-1.75v-2.5Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-success/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="var(--accent-success)"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-mono font-semibold text-ink text-sm">
                    Saram Ali
                  </h3>
                  <p className="text-xs text-graphite">
                    Graph Engineering Co-Author
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href="https://github.com/SARAMALI15792"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-success hover:text-accent-primary transition-colors inline-flex items-center gap-1"
                    >
                      GitHub
                      <svg
                        viewBox="0 0 24 24"
                        width="10"
                        height="10"
                        fill="currentColor"
                      >
                        <path d="M18.25 12a.75.75 0 0 0-.75-.75H8.31l-4.47 4.47a.75.75 0 1 0 1.06 1.06l3.72-3.72H17.5a.75.75 0 0 0 0-1.5Z" />
                        <path d="M15.5 4.25a.75.75 0 0 0-1.5 0v2.5h-11a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-11h1.75a.75.75 0 0 0 0-1.5h-1.75v-2.5Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Graph Engineering. MIT licensed.</p>
          <p className="flex items-center gap-2">
            <span className="font-mono glass px-2 py-1 rounded-lg text-graphite">
              {commit.slice(0, 8)}
            </span>
            synced {synced}
          </p>
        </div>
      </div>
    </footer>
  );
}
