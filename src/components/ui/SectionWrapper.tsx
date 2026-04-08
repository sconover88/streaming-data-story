import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`} tabIndex={-1} aria-labelledby={`${id}-heading`}>
      {children}
    </section>
  );
}
