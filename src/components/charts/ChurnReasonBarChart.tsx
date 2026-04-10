import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CustomLegend } from '../ui/CustomLegend';
import { useChurnData } from '../../hooks/useChurnData';
import { usePlatforms } from '../../hooks/usePlatforms';
import { ChartWrapper } from '../ui/ChartWrapper';
import { CHURN_REASONS } from '../../lib/constants';

interface ChurnReasonBarChartProps {
  selectedPlatformIds: number[];
  selectedQuarter: string | null;
}

export function ChurnReasonBarChart({ selectedPlatformIds, selectedQuarter }: ChurnReasonBarChartProps) {
  const { churnData, loading, error } = useChurnData();
  const { platforms } = usePlatforms();

  if (loading) return <div className="text-gray-400">Loading chart…</div>;
  if (error) return <div className="text-red-400">Error loading data</div>;

  // Group by reason for the selected quarter
  const data = CHURN_REASONS.map(reason => {
    const row: any = { reason };
    platforms.forEach(platform => {
      if (selectedPlatformIds.includes(platform.id)) {
        const entry = churnData.find(
          d => d.platform_id === platform.id && d.primary_reason === reason && (!selectedQuarter || d.month === selectedQuarter)
        );
        row[platform.name] = entry ? entry.churn_rate_percent : 0;
      }
    });
    return row;
  });

  return (
    <ChartWrapper title="Churn Reasons by Platform" desc="Churn rate by reason and platform (for selected quarter if set)">
      {/* Legend removed as per user request */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="reason" tick={{ fill: '#ccc', fontSize: 12 }} />
          <YAxis 
            tick={{ fill: '#ccc', fontSize: 12 }}
            label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', fill: '#ccc', fontSize: 13, dy: 0, textAnchor: 'middle' }}
          />
          <Tooltip 
            contentStyle={{ background: '#18181b', border: 'none', color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(162,89,236,0.08)' }}
          />
          {platforms.filter(p => selectedPlatformIds.includes(p.id)).map(platform => (
            <Bar
              key={platform.id}
              dataKey={platform.name}
              fill={platform.color}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
