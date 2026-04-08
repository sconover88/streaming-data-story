import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 text-center text-sm text-gray-200 bg-gray-950 border-t border-gray-800 mt-16" aria-label="Site footer">
      <p>
        Data and story are fictional. Created for educational/demo purposes. &copy; {new Date().getFullYear()} Streaming Data Story.
      </p>
    </footer>
  );
}
