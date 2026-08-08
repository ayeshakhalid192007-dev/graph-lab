import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { NavBar } from "@/components/ui/NavBar";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayeshakhalid192007-dev.github.io/graph-lab";

const DESCRIPTION =
  "Work through Graph Engineering in the browser: 86 pages, 23 patterns, 24 starter kits, quizzes, and the Graph Ready certification.";

/**
 * metadataBase already carries the basePath, so the image is given as a bare
 * "/og-image.png" and Next resolves it against that origin. Passing it through
 * withBasePath() here would double the prefix to /graph-lab/graph-lab/og-image.png.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "graph-lab", template: "%s — graph-lab" },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "graph-lab",
    title: "graph-lab — Graph Engineering, in the browser",
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "graph-lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "graph-lab — Graph Engineering, in the browser",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Same finished state for a reader with JavaScript off entirely: the draw-in
            is an enhancement, and a diagram that never animates must still be a
            diagram rather than an empty frame. */}
        <noscript>
          <style>{".diagram .edge{stroke-dashoffset:0}.diagram .node{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
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
