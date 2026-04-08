import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function DivergenceSection() {
  return (
    <section id="divergence" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Divergence: Platform Comparison
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          Not all platforms are following the same path. Some are surging, some are collapsing, and some are holding steady. Let’s compare their journeys.
        </p>
      </ScrollReveal>
      {/* Chart and toggles will be added here */}
    </section>
  );
}
