import React from 'react';

interface YearDropdownProps {
  years: number[];
  selected: number;
  onChange: (year: number) => void;
}

export function YearDropdown({ years, selected, onChange }: YearDropdownProps) {
  return (
    <select
      className="min-w-[100px] px-4 py-2 rounded border-2 bg-gray-900 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-center"
      value={selected}
      onChange={e => onChange(Number(e.target.value))}
      aria-label="Year filter"
    >
      {years.map(year => (
        <option key={year} value={year} className="text-center">{year}</option>
      ))}
    </select>
  );
}
