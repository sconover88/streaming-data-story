import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-950 to-gray-900 py-24">
      <ScrollReveal>
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Streaming Isn’t Growing Anymore — It’s Reshuffling
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
          Explore how content strategy is driving the new winners and losers in streaming. Scroll to begin the story.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.4}>
        <div className="animate-bounce mt-8" aria-hidden="true">
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32" aria-label="Scroll down arrow" role="img">
            <title>Scroll down</title>
            <desc>Animated arrow indicating to scroll down</desc>
            <path d="M16 6v20m0 0l-6-6m6 6l6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </ScrollReveal>
    </section>
  );
}
