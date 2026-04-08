import React from 'react';

interface YearFilterProps {
  years: number[];
  selected: number;
  onChange: (year: number) => void;
}

export function YearFilter({ years, selected, onChange }: YearFilterProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Year filter">
      {years.map((year) => (
        <button
          key={year}
          type="button"
          className={`px-3 py-1 rounded font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${selected === year ? 'bg-white text-gray-900 border-white' : 'bg-gray-800 text-gray-200 border-gray-700'}`}
          aria-pressed={selected === year}
          onClick={() => onChange(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
