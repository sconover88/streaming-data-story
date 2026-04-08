import React from 'react';

interface PlatformToggleProps {
  platforms: { id: number; name: string; color: string }[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

export function PlatformToggle({ platforms, selected, onChange }: PlatformToggleProps) {
  // Utility to determine best text color (black or white) for contrast
  function getContrastYIQ(hexcolor: string) {
    let hex = hexcolor.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    const r = parseInt(hex.substr(0,2),16);
    const g = parseInt(hex.substr(2,2),16);
    const b = parseInt(hex.substr(4,2),16);
    const yiq = (r*299 + g*587 + b*114) / 1000;
    return yiq >= 128 ? '#111' : '#fff';
  }

  function handleToggle(id: number) {
    if (selected.includes(id)) {
      onChange(selected.filter((pid) => pid !== id));
    } else {
      onChange([...selected, id]);
    }
  }
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Platform toggle">
      {platforms.map((platform) => {
        const isActive = selected.includes(platform.id);
        const textColor = isActive ? getContrastYIQ(platform.color) : platform.color;
        return (
          <button
            key={platform.id}
            type="button"
            className={`min-w-[44px] min-h-[44px] px-3 py-2 rounded font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${isActive ? '' : 'bg-gray-900 text-gray-100 border-gray-700'} hover:opacity-90`}
            style={{
              borderColor: platform.color,
              background: isActive ? platform.color : undefined,
              color: isActive ? getContrastYIQ(platform.color) : platform.color,
            }}
            aria-pressed={isActive}
            aria-label={`Toggle ${platform.name}`}
            onClick={() => handleToggle(platform.id)}
          >
            {platform.name}
          </button>
        );
      })}
    </div>
  );
}
