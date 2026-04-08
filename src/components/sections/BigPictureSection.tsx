import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { usePlatforms } from '../../hooks/usePlatforms';
import { PlatformToggle } from '../ui/PlatformToggle';
import { SubscriberLineChart } from '../charts/SubscriberLineChart';

export function BigPictureSection() {
  const { platforms } = usePlatforms();
  const [selected, setSelected] = useState<number[]>(platforms.map(p => p.id));

  return (
    <section id="big-picture" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 id="big-picture-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Big Picture: Industry Overview
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
          Total streaming subscribers are still growing, but the story is more complex. Some platforms are surging, others are treading water, and some are in freefall. Lets see how the landscape is shifting.
        </p>
      </ScrollReveal>
      <div className="mb-6">
        <PlatformToggle platforms={platforms} selected={selected} onChange={setSelected} />
      </div>
      <div aria-live="polite">
        <SubscriberLineChart selectedPlatformIds={selected} />
      </div>
    </section>
  );
}
