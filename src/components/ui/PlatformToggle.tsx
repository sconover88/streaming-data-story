import React from 'react';

interface PlatformToggleProps {
  platforms: { id: number; name: string; color: string }[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

export function PlatformToggle({ platforms, selected, onChange }: PlatformToggleProps) {
  function handleToggle(id: number) {
    if (selected.includes(id)) {
      onChange(selected.filter((pid) => pid !== id));
    } else {
      onChange([...selected, id]);
    }
  }
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Platform toggle">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          type="button"
          className={`min-w-[44px] min-h-[44px] px-3 py-2 rounded font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${selected.includes(platform.id) ? 'bg-white text-gray-900 border-white' : 'bg-gray-900 text-gray-100 border-gray-700'}`}
          style={{ borderColor: platform.color, color: selected.includes(platform.id) ? '#111' : platform.color }}
          aria-pressed={selected.includes(platform.id)}
          aria-label={`Toggle ${platform.name}`}
          onClick={() => handleToggle(platform.id)}
        >
          {platform.name}
        </button>
      ))}
    </div>
  );
}
