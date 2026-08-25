import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { NavBar } from "@/components/ui/NavBar";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ayeshakhalid192007-dev.github.io/graph-lab";
const DESCRIPTION =
  "Work through Graph Engineering in the browser: 86 pages, 23 patterns, 24 starter kits, quizzes, and the Graph Ready certification.";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const faviconUrl = `${basePath}/favicon.svg?v=4`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "graph-lab", template: "%s — graph-lab" },
  description: DESCRIPTION,
  icons: {
    icon: faviconUrl,
    apple: faviconUrl,
  },
  openGraph: {
    type: "website",
    siteName: "graph-lab",
    title: "graph-lab — Graph Engineering, in the browser",
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "graph-lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "graph-lab — Graph Engineering, in the browser",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>
          <style>
            {".diagram .edge{stroke-dashoffset:0}.diagram .node{opacity:1;transform:none}"}
          </style>
        </noscript>
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <AnimatedBackground />
          <a
            href="#main"
            className="mono sr-only focus:not-sr-only focus:absolute focus:p-3"
          >
            Skip to content
          </a>
          <NavBar />
          <main id="main" className="pt-20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
