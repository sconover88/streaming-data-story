import React from 'react';

interface InsightCardProps {
  title: string;
  value: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
}

export function InsightCard({ title, value, description, icon }: InsightCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center text-center min-w-[160px]" tabIndex={0} aria-label={title}>
      {icon && <div className="mb-2 text-3xl text-blue-500 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Insight icon">{icon}</div>}
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-base text-gray-100 font-medium mb-1">{title}</div>
      {description && <div className="text-sm text-gray-200">{description}</div>}
    </div>
  );
}
