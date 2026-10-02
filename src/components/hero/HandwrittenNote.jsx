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
      className="absolute -top-24 sm:-top-28 left-2 sm:left-4 z-30 pointer-events-none select-none flex flex-col items-start"
      aria-hidden="true"
    >
      {/* Two-Line Straight Handwritten Text */}
      <div className="flex flex-col items-start font-handwriting font-bold text-2xl sm:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-tight whitespace-nowrap">
        <span>{displayText1}</span>
        <div className="flex items-center">
          <span>{displayText2}</span>
          {isWriting && !isComplete && displayText1.length >= LINE1.length && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white ml-1 animate-ping align-middle" />
          )}
        </div>
      </div>

      {/* Hand-Drawn White Downward Arrow Pointing to Photo */}
      <div className="w-8 h-10 overflow-visible mt-1 ml-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 32 40"
          fill="none"
        >
          {/* Vertical Arrow Shaft */}
          <path
            d="M 16 2 L 16 30"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 35,
              strokeDashoffset: isComplete ? 0 : 35,
              transition: 'stroke-dashoffset 0.4s ease-out'
            }}
          />
          {/* Arrowhead Pointing Down */}
          <path
            d="M 9 22 L 16 31 L 23 22"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isComplete ? 1 : 0,
              transform: isComplete ? 'scale(1)' : 'scale(0.3)',
              transformOrigin: '16px 31px',
              transition: 'opacity 0.2s ease-out 0.28s, transform 0.2s ease-out 0.28s'
            }}
          />
        </svg>
      </div>
    </div>
  );
}
