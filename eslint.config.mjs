import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: ["content/**", "out/**", ".next/**", ".claude/**", "public/**", "server.js", "server.ts", "start-server.js", "test_server.pid", "server.pid", "test_server_*.pid", "*.log", "scripts/**"] },
  ...coreWebVitals,
];

export default config;
