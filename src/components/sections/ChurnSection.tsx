import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { usePlatforms } from '../../hooks/usePlatforms';
import { PlatformToggle } from '../ui/PlatformToggle';
import { ChurnLineChart } from '../charts/ChurnLineChart';
import { ChurnReasonBarChart } from '../charts/ChurnReasonBarChart';
import { CHURN_REASONS } from '../../lib/constants';

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
        <div className="flex gap-2" role="radiogroup" aria-label="Churn reason filter">
          <button
            type="button"
            className={`min-w-[44px] min-h-[44px] px-3 py-2 rounded font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${reason === null ? 'bg-white text-gray-900 border-white' : 'bg-gray-900 text-gray-100 border-gray-700'}`}
            aria-pressed={reason === null}
            aria-label="Show all churn reasons"
            onClick={() => setReason(null)}
          >
            All Reasons
          </button>
          {CHURN_REASONS.map(r => (
            <button
              key={r}
              type="button"
              className={`min-w-[44px] min-h-[44px] px-3 py-2 rounded font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${reason === r ? 'bg-white text-gray-900 border-white' : 'bg-gray-900 text-gray-100 border-gray-700'}`}
              aria-pressed={reason === r}
              aria-label={`Show churn reason ${r}`}
              onClick={() => setReason(r)}
            >
              {r}
            </button>
          ))}
        </div>
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
