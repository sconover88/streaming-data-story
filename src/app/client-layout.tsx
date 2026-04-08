"use client";
import React from "react";
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SkipNav } from '../components/layout/SkipNav';
import { MotionProvider } from '../components/providers/MotionProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SkipNav />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
      <Footer />
    </MotionProvider>
  );
}