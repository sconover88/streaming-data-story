import React from 'react';
import { LineChartBase } from './LineChartBase';
import { useSubscriberData } from '../../hooks/useSubscriberData';
import { usePlatforms } from '../../hooks/usePlatforms';

interface SubscriberLineChartProps {
  selectedPlatformIds: number[];
}

export function SubscriberLineChart({ selectedPlatformIds }: SubscriberLineChartProps) {
  const { subscriberData, loading, error } = useSubscriberData();
  const { platforms } = usePlatforms();

  if (loading) return <div className="text-gray-400">Loading chart…</div>;
  if (error) return <div className="text-red-400">Error loading data</div>;


  // Group data by month, format as 'Month, Year'
  function formatMonthYear(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  const months = Array.from(new Set(subscriberData.map(d => d.month))).sort();
  const data = months.map(month => {
    const row: any = { month: formatMonthYear(month) };
    platforms.forEach(p => {
      const entry = subscriberData.find(d => d.month === month && d.platform_id === p.id);
      row[p.name] = entry ? entry.subscribers_millions : null;
    });
    return row;
  });

  const legendItems = platforms
    .filter(p => selectedPlatformIds.includes(p.id))
    .map(p => ({ label: p.name, color: p.color }));

  const lines = platforms
    .filter(p => selectedPlatformIds.includes(p.id))
    .map(p => ({ key: p.name, color: p.color }));

  return (
    <LineChartBase
      title="Subscriber Growth by Platform"
      desc="Monthly subscribers (millions) for each platform."
      data={data}
      legendItems={legendItems}
      yAxisLabel="Subscribers (millions)"
      lines={lines}
      height={360}
    />
  );
}
