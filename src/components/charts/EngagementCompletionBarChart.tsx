import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// Custom legend to match bar order
function CustomLegend({ platforms }: { platforms: { name: string; color: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-4 mb-2">
      {platforms.map(p => (
        <li key={p.name} className="flex items-center gap-2">
          <span style={{ background: p.color, width: 16, height: 16, display: 'inline-block', borderRadius: 2 }} />
          <span className="text-white text-sm">{p.name}</span>
        </li>
      ))}
    </ul>
  );
}
import { useEngagementMetrics } from '../../hooks/useEngagementMetrics';
import { usePlatforms } from '../../hooks/usePlatforms';
import { ChartWrapper } from '../ui/ChartWrapper';
import { CONTENT_TYPES } from '../../lib/constants';

interface EngagementCompletionBarChartProps {
  selectedYear: number;
  selectedPlatformIds: number[];
}

export function EngagementCompletionBarChart({ selectedYear, selectedPlatformIds }: EngagementCompletionBarChartProps) {
  const { engagementMetrics, loading, error } = useEngagementMetrics();
  const { platforms } = usePlatforms();

  if (loading) return <div className="text-gray-400">Loading chart…</div>;
  if (error) return <div className="text-red-400">Error loading data</div>;

  // Group by content type, show avg_completion_rate for each platform
  const data = CONTENT_TYPES.map(type => {
    const row: any = { content_type: type };
    platforms.forEach(platform => {
      if (selectedPlatformIds.includes(platform.id)) {
        const entry = engagementMetrics.find(
          d => d.platform_id === platform.id && d.year === selectedYear && d.content_type === type
        );
        row[platform.name] = entry ? entry.avg_completion_rate : 0;
      }
    });
    return row;
  });

  // Desired legend/platform order
  const PLATFORM_ORDER = ['streammax', 'vueplus', 'cinewave', 'flickhub', 'primeview'];
  // Case-insensitive match, then append any selected platforms not in the order array
  const orderedPlatforms = [
    ...PLATFORM_ORDER
      .map(orderName => platforms.find(p => p.name.trim().toLowerCase() === orderName && selectedPlatformIds.includes(p.id)))
      .filter((p): p is typeof platforms[number] => !!p),
    ...platforms.filter(
      p => selectedPlatformIds.includes(p.id) && !PLATFORM_ORDER.includes(p.name.trim().toLowerCase())
    )
  ];

  return (
    <ChartWrapper title="Completion Rate by Content Type" desc={`Average completion rate (%) by content type in ${selectedYear}`}>
      <div className="mb-4 text-left">
        <CustomLegend platforms={orderedPlatforms} />
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 8 }} barCategoryGap={24} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="content_type" tick={{ fill: '#ccc', fontSize: 12 }} />
          <YAxis tick={{ fill: '#ccc', fontSize: 12 }} label={{ value: 'Completion %', angle: -90, position: 'insideLeft', fill: '#ccc' }} />
          <Tooltip 
            contentStyle={{ background: '#18181b', border: 'none', color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(162,89,236,0.08)' }}
          />
          {orderedPlatforms.map(platform => (
            <Bar
              key={platform.name}
              dataKey={platform.name}
              name={platform.name}
              fill={platform.color}
              isAnimationActive={false}
              style={{ pointerEvents: 'none' }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
