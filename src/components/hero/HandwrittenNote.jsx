import React, { useState, useEffect } from 'react';

/**
 * HandwrittenNote
 * Organic handwritten annotation appearing on the left side of the hero photo.
 * When the page renders, it naturally writes out "this is me :)" in realistic cursive handwriting,
 * accompanied by a cute hand-drawn arrow curving towards the photo.
 */
export default function HandwrittenNote() {
  const TARGET_TEXT = "this is me :)";
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    // Brief initial delay so the visitor observes the handwriting instantiate in real-time
    const startTimeout = setTimeout(() => {
      setIsWriting(true);
    }, 450);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!isWriting) return;

    if (displayText.length < TARGET_TEXT.length) {
      const nextChar = TARGET_TEXT[displayText.length];
      // Natural handwriting speed variation (65ms - 95ms)
      let delay = Math.floor(Math.random() * 30) + 65;
      if (nextChar === ' ') delay += 45;
      if (nextChar === ':' || nextChar === ')') delay += 70;

      const timer = setTimeout(() => {
        setDisplayText(TARGET_TEXT.slice(0, displayText.length + 1));
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Completed writing: trigger hand-drawn arrow reveal
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
      }, 120);
      return () => clearTimeout(completeTimer);
    }
  }, [displayText, isWriting]);

  return (
    <div
      className="absolute left-0 -top-12 sm:left-auto sm:-left-32 md:-left-36 sm:top-10 md:top-12 z-30 pointer-events-none select-none -rotate-6 sm:-rotate-12 transition-transform duration-500 hover:scale-105"
      aria-hidden="true"
    >
      <div className="flex flex-col items-start sm:items-end">
        {/* Handwritten text */}
        <div className="flex items-center text-2xl sm:text-3xl md:text-[32px] font-handwriting font-bold tracking-wide text-[#0071e3] dark:text-cyan-300 drop-shadow-[0_2px_10px_rgba(0,113,227,0.25)] dark:drop-shadow-[0_0_12px_rgba(6,182,212,0.45)] whitespace-nowrap">
          <span>{displayText}</span>
          
          {/* Subtle pen tip glow while writing */}
          {isWriting && !isComplete && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0071e3] dark:bg-cyan-300 ml-1 animate-ping align-middle" />
          )}
        </div>

        {/* Hand-drawn doodle arrow curving towards the photo */}
        <div className="w-16 h-10 sm:w-20 sm:h-12 overflow-visible -mt-1 sm:-mt-1 text-[#0071e3] dark:text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,113,227,0.2)] dark:drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] ml-12 sm:ml-auto">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 80 48"
            fill="none"
          >
            {/* Curved arrow arc */}
            <path
              d="M 10 8 C 24 10, 48 16, 62 30 C 66 34, 69 38, 72 40"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 90,
                strokeDashoffset: isComplete ? 0 : 90,
                transition: 'stroke-dashoffset 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            {/* Arrowhead */}
            <path
              d="M 61 40 L 73 40 L 71 29"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: isComplete ? 1 : 0,
                transform: isComplete ? 'scale(1)' : 'scale(0.3)',
                transformOrigin: '73px 40px',
                transition: 'opacity 0.25s ease-out 0.4s, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
