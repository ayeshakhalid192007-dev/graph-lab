import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { NavBar } from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: { default: "graph-lab", template: "%s — graph-lab" },
  description:
    "Work through Graph Engineering in the browser: 86 pages, 23 patterns, 24 starter kits, quizzes, and the Graph Ready certification.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <a href="#main" className="mono sr-only focus:not-sr-only focus:absolute focus:p-3">
            Skip to content
          </a>
          <NavBar />
          <main id="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
