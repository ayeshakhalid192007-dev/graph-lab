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
          <stop offset="0%" style={{ stopColor: '#38BDF8', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#818CF8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#C084FC', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Outer decorative circle */}
      <circle cx="24" cy="24" r="22" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.3" />

      {/* Graph nodes - representing interconnected systems */}
      <circle cx="24" cy="24" r="5" fill="url(#nodeGradient)" filter="drop-shadow(0 0 8px rgba(96, 165, 250, 0.4))" />

      {/* Surrounding nodes representing distributed systems */}
      <circle cx="12" cy="12" r="3" fill="url(#accentGradient)" filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.3))" />
      <circle cx="36" cy="12" r="3" fill="url(#accentGradient)" filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.3))" />
      <circle cx="12" cy="36" r="3" fill="url(#accentGradient)" filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.3))" />
      <circle cx="36" cy="36" r="3" fill="url(#accentGradient)" filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.3))" />

      {/* Connecting edges - representing data flow and connections */}
      <line x1="24" y1="24" x2="12" y2="12" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="24" y1="24" x2="36" y2="12" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="24" y1="24" x2="12" y2="36" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="24" y1="24" x2="36" y2="36" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Connecting outer nodes to show network */}
      <line x1="12" y1="12" x2="12" y2="36" stroke="url(#accentGradient)" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="12" x2="36" y2="36" stroke="url(#accentGradient)" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="12" x2="36" y2="12" stroke="url(#accentGradient)" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="36" x2="36" y2="36" stroke="url(#accentGradient)" strokeWidth="1" opacity="0.5" />

      {/* Decorative ring for elegance */}
      <circle cx="24" cy="24" r="21" stroke="url(#logoGradient)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
    </svg>
  );
}
