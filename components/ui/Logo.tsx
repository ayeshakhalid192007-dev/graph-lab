export function Logo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Graph Lab"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4169E1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3654C5', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Central node */}
      <circle cx="16" cy="16" r="4" fill="url(#logoGrad)" />

      {/* Four surrounding nodes */}
      <circle cx="8" cy="8" r="2.5" fill="#4169E1" opacity="0.8" />
      <circle cx="24" cy="8" r="2.5" fill="#D4AF37" opacity="0.7" />
      <circle cx="8" cy="24" r="2.5" fill="#D4AF37" opacity="0.7" />
      <circle cx="24" cy="24" r="2.5" fill="#4169E1" opacity="0.8" />

      {/* Connecting edges */}
      <line x1="16" y1="16" x2="8" y2="8" stroke="#4169E1" strokeWidth="1" opacity="0.6" />
      <line x1="16" y1="16" x2="24" y2="8" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
      <line x1="16" y1="16" x2="8" y2="24" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
      <line x1="16" y1="16" x2="24" y2="24" stroke="#4169E1" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
