import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useSubscriberData } from '../../hooks/useSubscriberData';
import { usePlatforms } from '../../hooks/usePlatforms';
import { ChartWrapper } from '../ui/ChartWrapper';

interface SubscriberLineChartProps {
  selectedPlatformIds: number[];
}

export function SubscriberLineChart({ selectedPlatformIds }: SubscriberLineChartProps) {
  const { subscriberData, loading, error } = useSubscriberData();
  const { platforms } = usePlatforms();

  if (loading) return <div className="text-gray-400">Loading chart…</div>;
  if (error) return <div className="text-red-400">Error loading data</div>;

  // Group data by month
  const months = Array.from(new Set(subscriberData.map(d => d.month))).sort();
  const data = months.map(month => {
    const row: any = { month };
    platforms.forEach(p => {
      const entry = subscriberData.find(d => d.month === month && d.platform_id === p.id);
      row[p.name] = entry ? entry.subscribers_millions : null;
    });
    return row;
  });

  return (
    <ChartWrapper title="Subscriber Growth by Platform" desc="Monthly subscribers (millions) for each platform.">
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" tick={{ fill: '#ccc', fontSize: 12 }} />
          <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#18181b', border: 'none', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#fff' }} />
          {platforms.filter(p => selectedPlatformIds.includes(p.id)).map(p => (
            <Line
              key={p.id}
              type="monotone"
              dataKey={p.name}
              stroke={p.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
