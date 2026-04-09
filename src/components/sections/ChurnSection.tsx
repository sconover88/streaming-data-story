import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { usePlatforms } from '../../hooks/usePlatforms';
import { PlatformToggle } from '../ui/PlatformToggle';
import { ChurnLineChart } from '../charts/ChurnLineChart';
import { ChurnReasonBarChart } from '../charts/ChurnReasonBarChart';
import { CHURN_REASONS } from '../../lib/constants';
import { ReasonDropdown } from '../ui/ReasonDropdown';

export function ChurnSection() {
  const { platforms, loading } = usePlatforms();
  const [selected, setSelected] = useState<number[]>([]);
  const [reason, setReason] = useState<string | null>(null);

  React.useEffect(() => {
    if (!loading && platforms.length > 0 && selected.length === 0) {
      setSelected(platforms.map(p => p.id));
    }
  }, [loading, platforms]);

  return (
    <section id="churn" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 id="churn-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Churn Problem
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
          Churn rates are closely tied to content investment. The #1 reason people leave is content — not price. Let’s dig into the churn data.
        </p>
      </ScrollReveal>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <PlatformToggle platforms={platforms} selected={selected} onChange={setSelected} />
        <ReasonDropdown value={reason} onChange={setReason} />
      </div>
      <div aria-live="polite">
        <ChurnLineChart selectedPlatformIds={selected} selectedReason={reason} />
      </div>
      <div className="mt-12" aria-live="polite">
        <ChurnReasonBarChart selectedPlatformIds={selected} selectedQuarter={null} />
      </div>
    </section>
  );
}
