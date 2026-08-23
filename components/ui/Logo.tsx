export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Graph Engineering"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8C7B63', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6B8C75', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle - representing completeness and connection */}
      <circle cx="24" cy="24" r="21" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.6" />

      {/* Central node - representing the core system */}
      <circle cx="24" cy="24" r="4" fill="url(#logoGradient)" filter="url(#softGlow)" opacity="0.9" />

      {/* Surrounding nodes - representing distributed systems */}
      <circle cx="24" cy="9" r="2" fill="#6B8C75" opacity="0.5" />
      <circle cx="9" cy="24" r="2" fill="#8C7B63" opacity="0.5" />
      <circle cx="39" cy="24" r="2" fill="#8C7B63" opacity="0.5" />
      <circle cx="24" cy="39" r="2" fill="#6B8C75" opacity="0.5" />

      {/* Connecting edges - clean lines showing relationships */}
      <line x1="24" y1="24" x2="24" y2="9" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="24" x2="9" y2="24" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="24" x2="39" y2="24" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="24" x2="24" y2="39" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.4" />

      {/* Inner decorative ring - subtle detail */}
      <circle cx="24" cy="24" r="14" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}
