import React from 'react';

const SECTION_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'big-picture', label: 'Big Picture' },
  { id: 'divergence', label: 'Divergence' },
  { id: 'content', label: 'Content' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'churn', label: 'Churn' },
  { id: 'takeaway', label: 'Takeaway' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gray-950/80 backdrop-blur border-b border-gray-800" aria-label="Site header">
      <nav className="flex items-center justify-between max-w-5xl mx-auto px-4 py-3" aria-label="Main navigation">
        <span className="font-bold text-lg text-white tracking-tight">Streaming Data Story</span>
        <ul className="flex gap-4">
          {SECTION_LINKS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-gray-100 hover:text-white focus:text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition relative overflow-hidden"
                aria-label={`Jump to ${section.label} section`}
              >
                <span className="relative z-10">{section.label}</span>
                <span
                  className="absolute inset-0 z-0 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 rounded"
                  style={{
                    background: '#a259ec',
                  }}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
