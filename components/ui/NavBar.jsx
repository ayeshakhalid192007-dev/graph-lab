"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { SearchDialog } from "@/components/ui/SearchDialog";

const LINKS = [
  { href: "/docs/00-start-here/", label: "docs" },
  { href: "/tracks/", label: "tracks" },
  { href: "/patterns/", label: "patterns" },
  { href: "/projects/", label: "projects" },
  { href: "/resources/", label: "resources" },
  { href: "/certification/", label: "certification" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setMobileOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const isActive = (href) => {
    if (href === "/docs/00-start-here/") return pathname.startsWith("/docs");
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,900px)] transition-all duration-300 ${
          scrolled
            ? "glass-strong rounded-2xl shadow-lg shadow-black/20 dark:shadow-black/20"
            : "glass rounded-2xl"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-5 py-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Logo />
            <span className="font-mono text-lg font-bold text-ink tracking-tight hidden sm:inline">
              graph-lab
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-accent-primary bg-accent-primary/10"
                    : "text-graphite hover:text-ink hover:bg-surface-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SearchDialog />
            <ThemeToggle />

            <button
              onClick={toggleMobile}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-graphite hover:text-ink hover:bg-surface-soft transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={closeMobile}
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[72px] left-4 right-4 z-50 glass-strong rounded-2xl p-4 lg:hidden"
              aria-label="Main navigation"
            >
              <div className="flex flex-col gap-1">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-mono text-sm px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-accent-primary bg-accent-primary/10"
                        : "text-graphite hover:text-ink hover:bg-surface-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
