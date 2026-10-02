import React from 'react';

/**
 * UmlArrow
 * High-tech NeetCode / UML architecture connector arrow.
 * Features:
 * - Animated SVG stroke with gradient illumination
 * - Traveling photon beam packet on active/completed states
 * - Interactive hover reactivity
 * - Dark & light mode aware
 */
export default function UmlArrow({
  isCompleted = false,
  isActive = false,
  label = '',
  className = ''
}) {
  const isLit = isCompleted || isActive;

  return (
    <div className={`relative flex flex-col items-center justify-center shrink-0 px-1 select-none ${className}`}>
      {label && (
        <span
          className={`text-[9px] font-mono tracking-wider uppercase mb-1 transition-colors duration-300 ${
            isLit ? 'text-[#0071e3] dark:text-cyan-400 font-semibold' : 'text-slate-400 dark:text-slate-600'
          }`}
        >
          {label}
        </span>
      )}

      <div className="relative flex items-center justify-center w-12 sm:w-16 lg:w-20 h-6">
        <svg
          className="w-full h-4 overflow-visible"
          viewBox="0 0 80 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Inactive Track */}
          <line
            x1="2"
            y1="8"
            x2="68"
            y2="8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="text-slate-300 dark:text-slate-700 transition-colors"
          />

          {/* Active Flow Line with animated dashoffset */}
          {isLit && (
            <line
              x1="2"
              y1="8"
              x2="68"
              y2="8"
              stroke="url(#uml-arrow-gradient)"
              strokeWidth="2.5"
              className={isActive ? 'animate-uml-dash' : ''}
              strokeDasharray={isActive ? '6 4' : 'none'}
            />
          )}

          {/* Arrowhead */}
          <path
            d="M66 4L76 8L66 12V4Z"
            fill="currentColor"
            className={`transition-colors duration-500 ${
              isLit
                ? 'text-[#0071e3] dark:text-cyan-400'
                : 'text-slate-300 dark:text-slate-700'
            }`}
          />

          <defs>
            <linearGradient id="uml-arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0071e3" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Traveling light photon when active or completed */}
        {isLit && (
          <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none pr-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_8px_#38bdf8] animate-uml-beam" />
          </div>
        )}
      </div>
    </div>
  );
}
