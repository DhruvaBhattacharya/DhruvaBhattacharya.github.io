import React, { useState, useEffect } from 'react';

/**
 * HandwrittenNote
 * Organic handwritten annotation appearing above the hero photo (Design 2).
 * Writes out:
 * "This is
 *  me :)"
 * with a pure white downward-pointing hand-drawn arrow directly indicating the photo.
 * Fixed straight orientation (no diagonal rotation), pure white color, text emoji :).
 */
export default function HandwrittenNote({ isLoaded = true }) {
  const [displayText1, setDisplayText1] = useState('');
  const [displayText2, setDisplayText2] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const LINE1 = "This is";
  const LINE2 = "me :)";

  useEffect(() => {
    if (!isLoaded) return;

    // Start after full page is loaded and splash screen dismisses
    const startTimeout = setTimeout(() => {
      setIsWriting(true);
    }, 400);

    return () => clearTimeout(startTimeout);
  }, [isLoaded]);

  useEffect(() => {
    if (!isWriting) return;

    // First write Line 1: "This is"
    if (displayText1.length < LINE1.length) {
      let delay = Math.floor(Math.random() * 25) + 60;
      const timer = setTimeout(() => {
        setDisplayText1(LINE1.slice(0, displayText1.length + 1));
      }, delay);
      return () => clearTimeout(timer);
    } 
    // Then write Line 2: "me :)"
    else if (displayText2.length < LINE2.length) {
      const nextChar = LINE2[displayText2.length];
      let delay = Math.floor(Math.random() * 25) + 60;
      if (nextChar === ' ') delay += 40;
      if (nextChar === ':' || nextChar === ')') delay += 60;

      const timer = setTimeout(() => {
        setDisplayText2(LINE2.slice(0, displayText2.length + 1));
      }, delay);
      return () => clearTimeout(timer);
    } 
    // Both lines complete: trigger white arrow reveal
    else {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
      }, 100);
      return () => clearTimeout(completeTimer);
    }
  }, [displayText1, displayText2, isWriting]);

  return (
    <div
      className="absolute -top-24 sm:-top-28 lg:-top-28 left-3 sm:left-6 z-30 pointer-events-none select-none flex flex-col items-start"
      aria-hidden="true"
    >
      {/* Two-Line Straight Handwritten Text */}
      <div className="flex flex-col items-start font-handwriting font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-tight whitespace-nowrap transition-colors">
        <span>{displayText1}</span>
        <span>{displayText2}</span>
      </div>

      {/* Hand-Drawn Curly Doodle Arrow Pointing Down Toward Photo (Does NOT Overlap Photo) */}
      <div className="w-12 h-10 overflow-visible mt-1 ml-6 text-slate-900 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-colors">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 50 42"
          fill="none"
        >
          {/* Curly Loop Arrow Body */}
          <path
            d="M 22 2 C 34 2, 42 10, 36 18 C 30 26, 16 18, 20 10 C 22 6, 30 14, 28 34"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 95,
              strokeDashoffset: isComplete ? 0 : 95,
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
          {/* Arrowhead Pointing Down */}
          <path
            d="M 21 27 L 28 35 L 35 27"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isComplete ? 1 : 0,
              transform: isComplete ? 'scale(1)' : 'scale(0.3)',
              transformOrigin: '28px 35px',
              transition: 'opacity 0.2s ease-out 0.35s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s'
            }}
          />
        </svg>
      </div>
    </div>
  );
}
