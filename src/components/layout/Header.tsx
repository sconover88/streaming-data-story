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
                className="text-gray-100 hover:text-white focus:text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Jump to ${section.label} section`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
