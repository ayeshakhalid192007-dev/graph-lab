import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// eslint-config-next 16 ships flat configs directly. Loading them through
// FlatCompat — the Next 14/15 pattern — makes eslintrc re-validate an already
// flat config and die with "Converting circular structure to JSON", which is a
// crash in its error *formatter*, so the real schema complaint is never printed.
const config = [
  { ignores: ["content/**", "out/**", ".next/**", ".claude/**", "public/**", "server.js", "server.ts", "start-server.js", "test_server.pid", "server.pid", "test_server_*.pid", "*.log"] },
  ...coreWebVitals,
  ...typescript,
];

export default config;
