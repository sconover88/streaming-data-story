import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { usePlatforms } from '../../hooks/usePlatforms';
import { PlatformToggle } from '../ui/PlatformToggle';
import { ChurnLineChart } from '../charts/ChurnLineChart';
import { ChurnReasonBarChart } from '../charts/ChurnReasonBarChart';
import { CHURN_REASONS } from '../../lib/constants';

export function ChurnSection() {
  const { platforms } = usePlatforms();
  const [selected, setSelected] = useState<number[]>(platforms.map(p => p.id));
  const [reason, setReason] = useState<string | null>(null);

  return (
    <section id="churn" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Churn Problem
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          Churn rates are closely tied to content investment. The #1 reason people leave is content — not price. Let’s dig into the churn data.
        </p>
      </ScrollReveal>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <PlatformToggle platforms={platforms} selected={selected} onChange={setSelected} />
        <div className="flex gap-2" role="radiogroup" aria-label="Churn reason filter">
          <button
            type="button"
            className={`px-3 py-1 rounded font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${reason === null ? 'bg-white text-gray-900 border-white' : 'bg-gray-800 text-gray-200 border-gray-700'}`}
            aria-pressed={reason === null}
            onClick={() => setReason(null)}
          >
            All Reasons
          </button>
          {CHURN_REASONS.map(r => (
            <button
              key={r}
              type="button"
              className={`px-3 py-1 rounded font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${reason === r ? 'bg-white text-gray-900 border-white' : 'bg-gray-800 text-gray-200 border-gray-700'}`}
              aria-pressed={reason === r}
              onClick={() => setReason(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <ChurnLineChart selectedPlatformIds={selected} selectedReason={reason} />
      <div className="mt-12">
        <ChurnReasonBarChart selectedPlatformIds={selected} selectedQuarter={null} />
      </div>
    </section>
  );
}
