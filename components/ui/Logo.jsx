export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Graph Lab"
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5C518" />
          <stop offset="100%" stopColor="#FFE08A" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="20" cy="20" r="18.5" stroke="url(#lg)" strokeWidth="1" opacity="0.2" />

      {/* Edges */}
      <line x1="20" y1="20" x2="20" y2="8" stroke="url(#lg)" strokeWidth="1.2" opacity="0.5" />
      <line x1="20" y1="20" x2="30.4" y2="26" stroke="url(#lg)" strokeWidth="1.2" opacity="0.5" />
      <line x1="20" y1="20" x2="9.6" y2="26" stroke="url(#lg)" strokeWidth="1.2" opacity="0.5" />

      {/* Outer nodes */}
      <circle cx="20" cy="8" r="3" fill="url(#lg)" opacity="0.65" />
      <circle cx="30.4" cy="26" r="3" fill="url(#lg)" opacity="0.65" />
      <circle cx="9.6" cy="26" r="3" fill="url(#lg)" opacity="0.65" />

      {/* Center node */}
      <circle cx="20" cy="20" r="4.5" fill="url(#lg)" />

      {/* Subtle arc connecting outer nodes */}
      <path
        d="M20 8 A18.5 18.5 0 0 1 30.4 26"
        fill="none"
        stroke="url(#lg)"
        strokeWidth="0.6"
        opacity="0.2"
      />
      <path
        d="M30.4 26 A18.5 18.5 0 0 1 9.6 26"
        fill="none"
        stroke="url(#lg)"
        strokeWidth="0.6"
        opacity="0.2"
      />
      <path
        d="M9.6 26 A18.5 18.5 0 0 1 20 8"
        fill="none"
        stroke="url(#lg)"
        strokeWidth="0.6"
        opacity="0.2"
      />
    </svg>
  );
}
