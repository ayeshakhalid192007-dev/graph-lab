import Link from "next/link";
import { SearchDialog } from "@/components/ui/SearchDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

/**
 * Site chrome. A server component — nothing here needs state, and the mobile
 * disclosure is a native <details>, so the menu works with JavaScript off.
 *
 * The SearchDialog trigger sits between the links and the theme toggle, filled
 * by Loop 4 Task 15. It carries its own dialog and loads the index lazily.
 */
const LINKS = [
  { href: "/docs/00-start-here/", label: "docs" },
  { href: "/tracks/", label: "tracks" },
  { href: "/patterns/", label: "patterns" },
  { href: "/projects/", label: "projects" },
  { href: "/resources/", label: "resources" },
  { href: "/certification/", label: "certification" },
];

export function NavBar() {
  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo />
          <span className="mono text-sm tracking-tight text-ink">graph-lab</span>
        </Link>

        {/* At and above 768px the links sit inline. */}
        <nav aria-label="Main" className="hidden md:flex md:items-center md:gap-5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono text-xs text-graphite hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>

      {/* Below 768px the same links collapse behind a native disclosure. */}
      <details className="border-t border-rule md:hidden">
        <summary className="mono cursor-pointer px-5 py-2 text-xs text-graphite marker:text-rule">
          menu
        </summary>
        <nav aria-label="Main, collapsed" className="flex flex-col gap-1 px-5 pb-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono py-1 text-xs text-graphite hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
