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
          <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle - representing completeness and connection */}
      <circle cx="24" cy="24" r="21" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.8" />

      {/* Central node - representing the core system */}
      <circle cx="24" cy="24" r="4.5" fill="url(#nodeGradient)" filter="url(#glow)" opacity="0.9" />

      {/* Surrounding nodes - representing distributed systems */}
      <circle cx="24" cy="9" r="2.5" fill="#1E40AF" opacity="0.7" />
      <circle cx="9" cy="24" r="2.5" fill="#1E40AF" opacity="0.7" />
      <circle cx="39" cy="24" r="2.5" fill="#1E40AF" opacity="0.7" />
      <circle cx="24" cy="39" r="2.5" fill="#1E40AF" opacity="0.7" />

      {/* Connecting edges - clean lines showing relationships */}
      <line x1="24" y1="24" x2="24" y2="9" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.6" />
      <line x1="24" y1="24" x2="9" y2="24" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.6" />
      <line x1="24" y1="24" x2="39" y2="24" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.6" />
      <line x1="24" y1="24" x2="24" y2="39" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.6" />

      {/* Inner decorative ring */}
      <circle cx="24" cy="24" r="14" stroke="url(#logoGradient)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />
    </svg>
  );
}
