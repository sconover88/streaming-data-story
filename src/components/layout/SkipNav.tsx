import React from 'react';

export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-blue-900 text-white px-4 py-2 rounded shadow-lg transition border-2 border-white"
      tabIndex={0}
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
