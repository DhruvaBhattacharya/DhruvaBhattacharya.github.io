import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const phrases = [
  "Java Backend Developer",
  "Architecting High-Scale Distributed Systems",
  "Microservices & Enterprise GenAI Pipelines",
  "Low-Latency Architectures (Redis & Spring Boot)"
];

/**
 * CodingTypewriter
 * Hacker Green PowerShell-themed live terminal typing animation.
 * Features:
 * - Natural human-like keystroke cadence (variable delay + spacebar micro-pauses)
 * - Authentic PowerShell prompt (PS >) in hacker green
 * - Monospace phosphor green glowing text and blinking block cursor
 * - Clean terminal bar without IDE window tabs or code syntax wrappers
 * - Click-to-cycle to immediately advance to the next specialization
 */
export default function CodingTypewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[phraseIdx];

  useEffect(() => {
    let timer;
    const fullText = currentPhrase;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < fullText.length) {
        const nextChar = fullText[displayedText.length];
        // Human typing variation: 45ms to 75ms base, slight pause on spaces and capitals
        let delay = Math.floor(Math.random() * 30) + 45;
        if (nextChar === ' ') delay += 40;
        if (nextChar && nextChar === nextChar.toUpperCase() && nextChar !== ' ') delay += 25;

        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, delay);
      } else {
        // Full phrase typed: pause so visitor can read comfortably
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting backward (fast smooth backspace ~22ms)
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, 22);
      } else {
        // Finished deleting, brief pause then move to next phrase
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
        }, 320);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIdx, currentPhrase]);

  // Click to instantly jump to the next phrase
  const handleQuickCycle = () => {
    setIsDeleting(false);
    setDisplayedText('');
    setPhraseIdx((prev) => (prev + 1) % phrases.length);
  };

  return (
    <div
      onClick={handleQuickCycle}
      className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-slate-950/95 dark:bg-black/95 border border-emerald-500/30 dark:border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] font-mono cursor-pointer select-none transition-all hover:border-emerald-400/60 hover:shadow-[0_0_28px_rgba(16,185,129,0.25)] max-w-2xl mx-auto lg:mx-0 min-h-[46px] sm:min-h-[50px] group"
      title="Click to cycle next role"
    >
      {/* PowerShell Hacker Prompt */}
      <div className="flex items-center gap-1.5 select-none shrink-0 text-emerald-500 dark:text-emerald-400 font-bold text-sm sm:text-base lg:text-lg">
        <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse hidden sm:inline" />
        <span className="tracking-tight">PS &gt;</span>
      </div>

      {/* Live Typed Text with Blinking Terminal Block Cursor */}
      <div className="flex items-center flex-wrap">
        <span className="text-emerald-400 dark:text-emerald-300 font-semibold text-sm sm:text-base lg:text-lg tracking-wide drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
          {displayedText}
        </span>
        <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-emerald-400 dark:bg-emerald-300 animate-pulse rounded-xs shadow-[0_0_8px_#34d399] ml-1.5 align-middle shrink-0" />
      </div>

      {/* Subtle Hint on Desktop */}
      <div className="ml-auto pl-2 hidden md:flex items-center gap-1 text-[10px] font-mono text-emerald-600/60 dark:text-emerald-500/50 select-none group-hover:text-emerald-400 transition-colors">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>ENTER ↵</span>
      </div>
    </div>
  );
}
