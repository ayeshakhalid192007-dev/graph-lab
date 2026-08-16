import Link from "next/link";
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
    <header className="border-b border-rule bg-paper shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200">
          <Logo />
          <span className="mono text-lg font-semibold tracking-tight text-ink">graph-lab</span>
        </Link>

        {/* At and above 768px the links sit inline. */}
        <nav aria-label="Main" className="hidden md:flex md:items-center md:gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono text-sm text-graphite hover:text-accent transition-colors duration-200 border-b-2 border-transparent hover:border-accent pb-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Below 768px the same links collapse behind a native disclosure. */}
      <details className="border-t border-rule md:hidden">
        <summary className="mono cursor-pointer px-5 py-3 text-sm text-graphite marker:text-rule font-medium hover:bg-surface transition-colors">
          menu
        </summary>
        <nav aria-label="Main, collapsed" className="flex flex-col gap-2 px-5 pb-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono py-2 text-sm text-graphite hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
