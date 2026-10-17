/** Ilustrasi greenhouse + rakit apung — palet Kokonus (#1a3d2e, #d3fa53). */
export function KokonusLandingGreenhouseScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      className={className}
      role="img"
      aria-label="Greenhouse hidroponik dengan rakit apung"
    >
      <defs>
        <linearGradient id="kl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3d2e" />
          <stop offset="100%" stopColor="#0f2920" />
        </linearGradient>
        <linearGradient id="kl-water" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#143528" />
          <stop offset="50%" stopColor="#1a3d2e" />
          <stop offset="100%" stopColor="#0f2920" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#kl-sky)" rx="32" />
      {/* Greenhouse frame */}
      <path
        d="M60 240 L60 120 Q240 40 420 120 L420 240 Z"
        fill="none"
        stroke="#d3fa53"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M90 240 L90 135 Q240 75 390 135 L390 240"
        fill="none"
        stroke="rgb(211 250 83 / 0.35)"
        strokeWidth="2"
      />
      {/* Ridge lines */}
      {[140, 180, 220].map((y) => (
        <line
          key={y}
          x1="90"
          y1={y}
          x2="390"
          y2={y}
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth="1"
        />
      ))}
      {/* Water / rakit apung */}
      <rect x="48" y="228" width="384" height="72" rx="20" fill="url(#kl-water)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${72 + i * 72}, 248)`}>
          <rect x="0" y="8" width="52" height="14" rx="7" fill="#d3fa53" opacity="0.9" />
          <circle cx="12" cy="4" r="5" fill="#7bc93a" />
          <circle cx="28" cy="2" r="6" fill="#9fd632" />
          <circle cx="42" cy="5" r="4" fill="#d3fa53" />
        </g>
      ))}
      {/* Floating tag */}
      <rect x="320" y="88" width="120" height="36" rx="18" fill="#d3fa53" />
      <text
        x="380"
        y="111"
        textAnchor="middle"
        fill="#0c0c0b"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        Rakit apung
      </text>
      <rect x="48" y="196" width="100" height="32" rx="16" fill="rgb(255 255 255 / 0.12)" />
      <text
        x="98"
        y="217"
        textAnchor="middle"
        fill="#f7f5ef"
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Greenhouse
      </text>
    </svg>
  );
}
