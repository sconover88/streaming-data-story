import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { InsightCard } from '../ui/InsightCard';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { usePlatforms } from '../../hooks/usePlatforms';
import { useSubscriberData } from '../../hooks/useSubscriberData';

export function TakeawaySection() {
  const { platforms } = usePlatforms();
  const { subscriberData } = useSubscriberData();

  // Example: Calculate VuePlus growth (platform id 2)
  const vuePlus = platforms.find(p => p.name === 'VuePlus');
  let vuePlusGrowth = 0;
  if (vuePlus) {
    const start = subscriberData.find(d => d.platform_id === vuePlus.id && d.month.startsWith('2022-01'));
    const end = subscriberData.findLast(d => d.platform_id === vuePlus.id);
    if (start && end) {
      vuePlusGrowth = Math.round(((end.subscribers_millions - start.subscribers_millions) / start.subscribers_millions) * 100);
    }
  }

  return (
    <section id="takeaway" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Takeaway: Invest in Originals
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          If you’re not investing in originals, you’re renting an audience. The data is clear: content strategy is the key to retention and growth.
        </p>
      </ScrollReveal>
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        <InsightCard
          title="VuePlus Growth (2022–2024)"
          value={<AnimatedCounter value={vuePlusGrowth} />}
          description="% increase in subscribers"
          icon={<span role="img" aria-label="Rocket">🚀</span>}
        />
        {/* Add more InsightCards for other key stats as desired */}
      </div>
      <ScrollReveal delay={0.3}>
        <div className="bg-gray-900 rounded-lg p-8 text-xl text-center text-white font-semibold shadow-lg max-w-2xl mx-auto">
          <p>
            <span className="text-blue-400">If you’re not investing in originals, you’re renting an audience.</span> <br />
            The data is clear: content strategy is the key to retention and growth.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
