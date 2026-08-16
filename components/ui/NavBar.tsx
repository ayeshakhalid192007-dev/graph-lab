import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

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
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-6 py-4 sm:px-8">
        {/* Logo & Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
        >
          <Logo />
          <span className="mono text-lg font-bold tracking-tight text-ink hidden sm:inline">
            graph-lab
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono text-sm text-graphite hover:text-accent px-3 py-2 rounded-md transition-colors duration-200 hover:bg-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <details className="border-t border-rule lg:hidden">
        <summary className="mono cursor-pointer px-6 py-3 text-sm text-graphite marker:text-rule font-medium hover:bg-surface transition-colors sm:px-8">
          menu
        </summary>
        <nav aria-label="Main, collapsed" className="flex flex-col gap-1 px-6 pb-4 sm:px-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono py-2 px-3 text-sm text-graphite hover:text-accent transition-colors duration-200 rounded hover:bg-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
