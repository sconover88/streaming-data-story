import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useContentLibrary } from '../../hooks/useContentLibrary';
import { usePlatforms } from '../../hooks/usePlatforms';
import { ChartWrapper } from '../ui/ChartWrapper';
import { CONTENT_TYPES, YEARS } from '../../lib/constants';

interface ContentStackedBarChartProps {
  selectedYear: number;
  selectedPlatformIds: number[];
}

export function ContentStackedBarChart({ selectedYear, selectedPlatformIds }: ContentStackedBarChartProps) {
  const { contentLibrary, loading, error } = useContentLibrary();
  const { platforms } = usePlatforms();

  if (loading) return <div className="text-gray-400">Loading chart…</div>;
  if (error) return <div className="text-red-400">Error loading data</div>;

  // Filter and group data
  const data = platforms
    .filter(p => selectedPlatformIds.includes(p.id))
    .map(platform => {
      const row: any = { platform: platform.name };
      CONTENT_TYPES.forEach(type => {
        const entry = contentLibrary.find(
          d => d.platform_id === platform.id && d.year === selectedYear && d.content_type === type
        );
        row[type] = entry ? entry.title_count : 0;
      });
      row.color = platform.color;
      return row;
    });

  return (
    <ChartWrapper title="Content Library Mix" desc={`Content mix by type for each platform in ${selectedYear}`}>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="platform" tick={{ fill: '#ccc', fontSize: 12 }} />
          <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#18181b', border: 'none', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#fff' }} />
          {CONTENT_TYPES.map(type => (
            <Bar
              key={type}
              dataKey={type}
              stackId="a"
              fill="#8884d8"
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
