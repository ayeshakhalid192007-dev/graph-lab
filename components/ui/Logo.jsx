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
        <linearGradient
          id="logoGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#F5C518", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#FFE08A", stopOpacity: 1 }}
          />
        </linearGradient>
        <filter
          id="softGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur
            stdDeviation="2"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle */}
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Central node */}
      <circle
        cx="24"
        cy="24"
        r="4"
        fill="url(#logoGradient)"
        filter="url(#softGlow)"
        opacity="0.9"
      />

      {/* Surrounding nodes */}
      <circle cx="24" cy="9" r="2.5" fill="#F5C518" opacity="0.6" />
      <circle cx="9" cy="24" r="2.5" fill="#F5C518" opacity="0.6" />
      <circle cx="39" cy="24" r="2.5" fill="#F5C518" opacity="0.6" />
      <circle cx="24" cy="39" r="2.5" fill="#F5C518" opacity="0.6" />

      {/* Connecting edges */}
      <line
        x1="24"
        y1="24"
        x2="24"
        y2="9"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="24"
        y1="24"
        x2="9"
        y2="24"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="24"
        y1="24"
        x2="39"
        y2="24"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="24"
        y1="24"
        x2="24"
        y2="39"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Inner decorative ring */}
      <circle
        cx="24"
        cy="24"
        r="14"
        stroke="url(#logoGradient)"
        strokeWidth="0.5"
        opacity="0.25"
      />
    </svg>
  );
}
