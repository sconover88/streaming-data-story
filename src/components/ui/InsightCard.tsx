import React from 'react';

interface InsightCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export function InsightCard({ title, value, description, icon }: InsightCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center text-center min-w-[160px]" tabIndex={0} aria-label={title}>
      {icon && <div className="mb-2 text-3xl text-blue-400">{icon}</div>}
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-base text-gray-300 font-medium mb-1">{title}</div>
      {description && <div className="text-sm text-gray-400">{description}</div>}
    </div>
  );
}
