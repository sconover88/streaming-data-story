import React, { useEffect, useRef, useState } from 'react';
import { useMotion } from '../providers/MotionProvider';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // ms
  className?: string;
}

export function AnimatedCounter({ value, duration = 1200, className = '' }: AnimatedCounterProps) {
  const { reducedMotion } = useMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let start = 0;
    let startTime: number | null = null;
    function animateCounter(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplay(Math.round(progress * (value - start) + start));
      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    }
    requestAnimationFrame(animateCounter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, reducedMotion]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {display}
    </span>
  );
}
