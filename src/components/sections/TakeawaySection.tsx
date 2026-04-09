import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { InsightCard } from '../ui/InsightCard';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { OriginalsDonutChart } from '../ui/OriginalsDonutChart';
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

  // Example: Originals data (replace with real data if available)
  const originalsData = [
    { name: 'VuePlus', originals: 68, licensed: 32, color: '#a259ec' },
    { name: 'StreamMax', originals: 40, licensed: 60, color: '#6366f1' },
  ];

  return (
    <section id="takeaway" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 id="takeaway-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Takeaway: <span className="text-blue-400 animate-pulse">Originals Win</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
          <span className="text-blue-300 font-semibold">Platforms with a higher share of originals see stronger growth and retention.</span> <br />
          The data shows that investing in original content isn’t just a differentiator—it’s a growth engine.
        </p>
      </ScrollReveal>
      <div className="flex flex-wrap gap-8 justify-center mb-12 items-center" aria-live="polite">
        {originalsData.map((d) => (
          <OriginalsDonutChart key={d.name} originals={d.originals} licensed={d.licensed} platformColor={d.color} platformName={d.name} />
        ))}
        <InsightCard
          title="VuePlus Growth (2022–2024)"
          value={<AnimatedCounter value={vuePlusGrowth} />}
          description="% increase in subscribers"
          icon={<span role="img" aria-label="Rocket">🚀</span>}
        />
        <InsightCard
          title="StreamMax Originals"
          value={<span className="text-blue-400 font-bold">40%</span>}
          description="of content is original"
          icon={<span role="img" aria-label="Film">🎬</span>}
        />
      </div>
      <ScrollReveal delay={0.3}>
        <div className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 rounded-lg p-8 text-xl text-center text-white font-semibold shadow-lg max-w-2xl mx-auto" aria-label="Key takeaway summary">
          <p>
            <span className="text-blue-400 animate-pulse">If you’re not investing in originals, you’re renting an audience.</span> <br />
            <span className="text-indigo-300">Originals drive loyalty, retention, and growth. The future belongs to platforms that create.</span>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
