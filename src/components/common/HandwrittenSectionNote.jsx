import React, { useState, useEffect, useRef } from 'react';

/**
 * HandwrittenSectionNote
 * Reusable handwritten annotation for portfolio sections (Work Experience, Featured Projects, Skills, Education).
 * Features:
 * - Straight (fixed horizontal) orientation with Caveat handwriting font
 * - Pure white text (#ffffff) and pure white hand-drawn doodle arrow (#ffffff)
 * - Text emoji :) (clean text, no anime/cartoon graphic)
 * - IntersectionObserver triggered: writes out character-by-character when scrolled into view
 * - Animated SVG curved arrow pointing down-right toward the section header
 */
export default function HandwrittenSectionNote({
  text = "My work :)",
  className = ""
}) {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            // Short delay so the user witnesses the live handwriting
            setTimeout(() => {
              setIsWriting(true);
            }, 300);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isWriting) return;

    if (displayText.length < text.length) {
      const nextChar = text[displayText.length];
      let delay = Math.floor(Math.random() * 25) + 55; // 55ms - 80ms
      if (nextChar === ' ') delay += 40;
      if (nextChar === ':' || nextChar === ')') delay += 60;

      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [displayText, isWriting, text]);

  return (
    <div
      ref={containerRef}
      className={`absolute z-20 pointer-events-none select-none flex flex-col items-start ${className}`}
      aria-hidden="true"
    >
      {/* Straight Handwritten Text */}
      <div className="flex items-center text-xl sm:text-2xl md:text-3xl font-handwriting font-bold tracking-wide text-slate-900 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] whitespace-nowrap transition-colors">
        <span>{displayText}</span>
        {isWriting && !isComplete && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white ml-1 animate-ping align-middle" />
        )}
      </div>

      {/* Hand-Drawn Doodle Arrow Curving Down-Right Toward Section Title */}
      <div className="w-16 h-10 sm:w-20 sm:h-12 overflow-visible -mt-1 ml-6 sm:ml-10 text-slate-900 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-colors">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 80 48"
          fill="none"
        >
          {/* Curved Arrow Body */}
          <path
            d="M 8 6 C 22 8, 46 14, 60 28 C 64 32, 68 36, 72 38"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 90,
              strokeDashoffset: isComplete ? 0 : 90,
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
          {/* Arrowhead */}
          <path
            d="M 60 38 L 73 38 L 70 27"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isComplete ? 1 : 0,
              transform: isComplete ? 'scale(1)' : 'scale(0.3)',
              transformOrigin: '73px 38px',
              transition: 'opacity 0.2s ease-out 0.35s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s'
            }}
          />
        </svg>
      </div>
    </div>
  );
}
