import React from 'react';

// Modern SVG background with streaming/industry motifs
export function HeroIndustryBackground() {
  return (
    <svg
      className="absolute left-0 top-0 w-screen h-screen z-0 pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Abstract streaming waves */}
      <defs>
        <linearGradient id="wave1" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(10)">
          <stop stopColor="#a259ec" stopOpacity="0.18" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="wave2" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(-10)">
          <stop stopColor="#6366f1" stopOpacity="0.14" />
          <stop offset="1" stopColor="#a259ec" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <path d="M0 700 Q 360 600 720 700 T 1440 700 V 900 H 0 Z" fill="url(#wave1)" />
      <path d="M0 800 Q 480 650 960 800 T 1440 800 V 900 H 0 Z" fill="url(#wave2)" />
      {/* Play button motif */}
      <circle cx="1200" cy="180" r="64" fill="#fff" fillOpacity="0.04" />
      <polygon points="1220,180 1185,160 1185,200" fill="#a259ec" fillOpacity="0.10" />
      {/* Signal bars motif */}
      <rect x="100" y="120" width="8" height="40" rx="4" fill="#6366f1" fillOpacity="0.10" />
      <rect x="115" y="100" width="8" height="60" rx="4" fill="#a259ec" fillOpacity="0.12" />
      <rect x="130" y="80" width="8" height="80" rx="4" fill="#6366f1" fillOpacity="0.14" />
      {/* Film strip motif */}
      <rect x="600" y="60" width="180" height="24" rx="8" fill="#fff" fillOpacity="0.04" />
      <rect x="610" y="68" width="20" height="8" rx="2" fill="#a259ec" fillOpacity="0.18" />
      <rect x="640" y="68" width="20" height="8" rx="2" fill="#6366f1" fillOpacity="0.18" />
      <rect x="670" y="68" width="20" height="8" rx="2" fill="#a259ec" fillOpacity="0.18" />
      <rect x="700" y="68" width="20" height="8" rx="2" fill="#6366f1" fillOpacity="0.18" />
    </svg>
  );
}
