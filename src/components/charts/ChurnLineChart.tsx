import React from 'react';
import { LineChartBase } from './LineChartBase';
import { useChurnData } from '../../hooks/useChurnData';
import { usePlatforms } from '../../hooks/usePlatforms';

interface ChurnLineChartProps {
  selectedPlatformIds: number[];
  selectedReason: string | null;
}

export function ChurnLineChart({ selectedPlatformIds, selectedReason }: ChurnLineChartProps) {
  const { churnData, loading, error } = useChurnData();
  const { platforms } = usePlatforms();

  if (loading) return <div className="text-gray-400">Loading chart…</div>;
  if (error) return <div className="text-red-400">Error loading data</div>;

  // Group data by month, format as 'Month, Year' to match the rest of the app
  function formatMonthYear(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  const months = Array.from(new Set(churnData.map(d => d.month))).sort();
  const data = months.map(month => {
    const row: any = { month: formatMonthYear(month) };
    platforms.forEach(p => {
      if (selectedPlatformIds.includes(p.id)) {
        // Always set a value for each platform/month, even if no entry exists for the selected reason
        const entry = churnData.find(d => d.month === month && d.platform_id === p.id && (!selectedReason || d.primary_reason === selectedReason));
        row[p.name] = entry ? entry.churn_rate_percent : null;
      }
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
      title="Churn Rate by Platform"
      desc="Quarterly churn rates per platform (filtered by reason if selected)"
      data={data}
      legendItems={legendItems}
      yAxisLabel="Churn Rate (%)"
      lines={lines}
      height={320}
    />
  );
}
