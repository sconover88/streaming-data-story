import React, { ReactNode } from 'react';

interface ChartWrapperProps {
  children: ReactNode;
  title: string;
  desc?: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * Accessible wrapper for all charts. Provides ARIA, alt text, and figure semantics.
 */
export function ChartWrapper({
  children,
  title,
  desc,
  ariaLabel,
  className = '',
}: ChartWrapperProps) {
  return (
    <figure
      role="img"
      aria-label={ariaLabel || title}
      className={className}
      tabIndex={0}
    >
      <figcaption className="text-gray-100 text-base mb-2">
        <strong>{title}</strong>
        {desc && <span> — {desc}</span>}
      </figcaption>
      {children}
    </figure>
  );
}
