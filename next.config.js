// GitHub Pages serves a project site from /<repo>, so the static export needs a
// matching basePath + assetPrefix or /_next assets 404. The deploy workflow sets
// PAGES_BASE_PATH=/graph-lab; local dev and `npm run build` leave it unset and
// serve from the root.
const basePath = process.env.PAGES_BASE_PATH || "";
const nextConfig = {
    output: "export", // fully static — deploy anywhere
    images: { unoptimized: true }, // required for static export
    basePath: basePath || undefined,
    assetPrefix: basePath || undefined,
    trailingSlash: true, // emit index.html per route so Pages serves it directly
};
export default nextConfig;
