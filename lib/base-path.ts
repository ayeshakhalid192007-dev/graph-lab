/**
 * GitHub Pages serves this site from /graph-lab, and Next only rewrites hrefs it
 * controls — a bare string in a `content` attribute, a canvas image source, or a
 * fetch() URL is left alone. Anything hand-built goes through withBasePath().
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
