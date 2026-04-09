import React from 'react';

interface CustomLegendProps {
  items: { label: string; color: string }[];
}

export function CustomLegend({ items }: CustomLegendProps) {
  // Generate a unique class for each legend item
  const legendStyles = items.map((item, idx) => {
    const className = `legend-label-color-${idx}`;
    return `.${className} { color: ${item.color} !important; font-size: 0.875rem !important; }`;
  }).join('\n');

  return (
    <>
      <style>{legendStyles}</style>
      <ul className="flex flex-wrap gap-4 mb-2">
        {items.map((item, idx) => {
          const className = `legend-label-color-${idx}`;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <span style={{ background: item.color, width: 16, height: 16, display: 'inline-block', borderRadius: 2 }} />
              <span className={className}>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
