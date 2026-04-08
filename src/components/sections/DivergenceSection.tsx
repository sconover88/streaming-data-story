import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { usePlatforms } from '../../hooks/usePlatforms';
import { PlatformToggle } from '../ui/PlatformToggle';
import { SubscriberLineChart } from '../charts/SubscriberLineChart';

export function DivergenceSection() {
  const { platforms, loading } = usePlatforms();
  const [selected, setSelected] = useState<number[]>([]);

  React.useEffect(() => {
    if (!loading && platforms.length > 0 && selected.length === 0) {
      setSelected(platforms.map(p => p.id));
    }
  }, [loading, platforms]);

  return (
    <section id="divergence" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 id="divergence-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Divergence: Platform Comparison
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
          Not all platforms are following the same path. Some are surging, some are collapsing, and some are holding steady. Lets compare their journeys.
        </p>
      </ScrollReveal>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <PlatformToggle platforms={platforms} selected={selected} onChange={setSelected} />
      </div>
      <div aria-live="polite">
        <SubscriberLineChart selectedPlatformIds={selected} />
      </div>
    </section>
  );
}
