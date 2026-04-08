import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { usePlatforms } from '../../hooks/usePlatforms';
import { PlatformToggle } from '../ui/PlatformToggle';
import { YearFilter } from '../ui/YearFilter';
import { ContentStackedBarChart } from '../charts/ContentStackedBarChart';
import { YEARS } from '../../lib/constants';

export function ContentSection() {
  const { platforms, loading } = usePlatforms();
  const [selected, setSelected] = useState<number[]>([]);
  const [year, setYear] = useState<number>(YEARS[YEARS.length - 1]);

  React.useEffect(() => {
    if (!loading && platforms.length > 0 && selected.length === 0) {
      setSelected(platforms.map(p => p.id));
    }
  }, [loading, platforms]);

  return (
    <section id="content" className="py-24 max-w-5xl mx-auto px-4">
      <ScrollReveal>
        <h2 id="content-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          Content is King: Strategy Matters
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
          Platforms that invested in original content are retaining subscribers. Those that relied on licensed content are losing ground. Lets break down the content mix.
        </p>
      </ScrollReveal>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <PlatformToggle platforms={platforms} selected={selected} onChange={setSelected} />
        <YearFilter years={YEARS as unknown as number[]} selected={year} onChange={setYear} />
      </div>
      <div aria-live="polite">
        <ContentStackedBarChart selectedYear={year} selectedPlatformIds={selected} />
      </div>
    </section>
  );
}
