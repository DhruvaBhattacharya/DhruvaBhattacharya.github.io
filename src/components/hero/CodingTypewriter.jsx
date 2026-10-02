import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const phrases = [
  "Java Backend Developer",
  "Architecting High-Scale Distributed Systems",
  "Engineering Scalable Backend Systems"
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

  // Helper to render typed text without ever stranding the cursor on an empty line
  const renderTypedContent = () => {
    const cursor = (
      <span
        aria-hidden="true"
        className="inline-block w-1.5 xs:w-2 sm:w-2.5 h-3.5 xs:h-4 sm:h-5 bg-emerald-600 dark:bg-emerald-300 animate-pulse rounded-xs shadow-[0_0_6px_rgba(5,150,105,0.4)] dark:shadow-[0_0_8px_#34d399] ml-0.5 align-middle shrink-0 select-none"
      />
    );

    if (!displayedText) {
      return cursor;
    }

    const lastSpaceIdx = displayedText.lastIndexOf(' ');

    // If only one word or no spaces yet, keep the whole word and cursor together
    if (lastSpaceIdx === -1) {
      return (
        <span className="whitespace-nowrap inline-flex items-center">
          <span>{displayedText}</span>
          {cursor}
        </span>
      );
    }

    const prefix = displayedText.slice(0, lastSpaceIdx + 1);
    const lastWord = displayedText.slice(lastSpaceIdx + 1);

    // If ending with a space (typing paused or between words), attach non-breaking space + cursor to previous word
    if (!lastWord) {
      const prevText = displayedText.slice(0, lastSpaceIdx);
      const prevSpaceIdx = prevText.lastIndexOf(' ');
      const mainPrefix = prevSpaceIdx === -1 ? '' : prevText.slice(0, prevSpaceIdx + 1);
      const trailingWord = prevSpaceIdx === -1 ? prevText : prevText.slice(prevSpaceIdx + 1);

      return (
        <>
          <span>{mainPrefix}</span>
          <span className="whitespace-nowrap inline-flex items-center">
            <span>{trailingWord}&nbsp;</span>
            {cursor}
          </span>
        </>
      );
    }

    // Normal active typing: prefix wraps naturally, current word being typed + cursor stays together
    return (
      <>
        <span>{prefix}</span>
        <span className="whitespace-nowrap inline-flex items-center">
          <span>{lastWord}</span>
          {cursor}
        </span>
      </>
    );
  };

  return (
    <div
      onClick={handleQuickCycle}
      className="w-full max-w-xl lg:max-w-2xl mx-auto lg:mx-0 px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl bg-slate-50/90 dark:bg-black/95 border border-emerald-600/25 dark:border-emerald-500/40 shadow-sm dark:shadow-[0_0_20px_rgba(16,185,129,0.12)] font-mono cursor-pointer select-none transition-all hover:border-emerald-600/50 dark:hover:border-emerald-400/60 hover:shadow-md dark:hover:shadow-[0_0_28px_rgba(16,185,129,0.22)] backdrop-blur-md min-h-[52px] sm:min-h-[56px] flex items-center group"
      title="Click to cycle next role"
    >
      <div className="w-full flex items-start sm:items-center gap-2 sm:gap-2.5">
        {/* PowerShell Hacker Prompt */}
        <div className="flex items-center gap-1.5 select-none shrink-0 text-emerald-700 dark:text-emerald-400 font-bold font-mono text-xs xs:text-sm sm:text-base pt-0.5 sm:pt-0">
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 animate-pulse shrink-0" />
          <span className="tracking-tight">PS &gt;</span>
        </div>

        {/* Live Typed Text with Blinking Terminal Block Cursor */}
        <div className="flex-1 min-w-0 font-mono text-[11px] min-[360px]:text-xs min-[420px]:text-sm sm:text-base leading-relaxed sm:leading-normal">
          <span className="text-emerald-800 dark:text-emerald-300 font-semibold tracking-normal sm:tracking-wide dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
            {renderTypedContent()}
          </span>
        </div>

        {/* Subtle Hint on Desktop */}
        <div className="shrink-0 pl-2 hidden md:flex items-center gap-1.5 text-[10px] font-mono text-emerald-700/60 dark:text-emerald-500/50 select-none group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors self-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-pulse" />
          <span>ENTER ↵</span>
        </div>
      </div>
    </div>
  );
}
