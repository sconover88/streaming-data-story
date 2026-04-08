import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useEngagementMetrics } from '../../hooks/useEngagementMetrics';
import { usePlatforms } from '../../hooks/usePlatforms';
import { ChartWrapper } from '../ui/ChartWrapper';
import { CONTENT_TYPES, YEARS } from '../../lib/constants';

interface EngagementBarChartProps {
  selectedYear: number;
  selectedPlatformIds: number[];
}

export function EngagementBarChart({ selectedYear, selectedPlatformIds }: EngagementBarChartProps) {
  const { engagementMetrics, loading, error } = useEngagementMetrics();
  const { platforms } = usePlatforms();

  if (loading) return <div className="text-gray-400">Loading chart…</div>;
  if (error) return <div className="text-red-400">Error loading data</div>;

  // Group by content type, show avg_completion_rate and avg_hours_per_viewer for each platform
  const data = CONTENT_TYPES.map(type => {
    const row: any = { content_type: type };
    platforms.forEach(platform => {
      if (selectedPlatformIds.includes(platform.id)) {
        const entry = engagementMetrics.find(
          d => d.platform_id === platform.id && d.year === selectedYear && d.content_type === type
        );
        row[platform.name + '_completion'] = entry ? entry.avg_completion_rate : 0;
        row[platform.name + '_hours'] = entry ? entry.avg_hours_per_viewer : 0;
      }
    });
    return row;
  });

  return (
    <ChartWrapper title="Engagement by Content Type" desc={`Completion rate and hours per viewer by content type in ${selectedYear}`}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="content_type" tick={{ fill: '#ccc', fontSize: 12 }} />
          <YAxis yAxisId="left" orientation="left" tick={{ fill: '#ccc', fontSize: 12 }} label={{ value: 'Completion %', angle: -90, position: 'insideLeft', fill: '#ccc' }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#ccc', fontSize: 12 }} label={{ value: 'Hours', angle: 90, position: 'insideRight', fill: '#ccc' }} />
          <Tooltip contentStyle={{ background: '#18181b', border: 'none', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#fff' }} />
          {platforms.filter(p => selectedPlatformIds.includes(p.id)).map(platform => [
            <Bar
              key={platform.name + '_completion'}
              yAxisId="left"
              dataKey={platform.name + '_completion'}
              name={platform.name + ' Completion %'}
              fill={platform.color}
              opacity={0.7}
              isAnimationActive={false}
            />,
            <Bar
              key={platform.name + '_hours'}
              yAxisId="right"
              dataKey={platform.name + '_hours'}
              name={platform.name + ' Hours'}
              fill={platform.color}
              opacity={1}
              isAnimationActive={false}
              barSize={8}
            />
          ])}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
