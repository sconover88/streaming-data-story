import React from 'react';

interface CustomLegendProps {
  items: { label: string; color: string }[];
}

export function CustomLegend({ items }: CustomLegendProps) {
  return (
    <ul className="flex flex-wrap gap-4 mb-2">
      {items.map(item => (
        <li key={item.label} className="flex items-center gap-2">
          <span style={{ background: item.color, width: 16, height: 16, display: 'inline-block', borderRadius: 2 }} />
          <span className="text-white text-sm">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
