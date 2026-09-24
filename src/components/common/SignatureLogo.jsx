import React from 'react';

export default function SignatureLogo({ className = "" }) {
  return (
    <div className={`flex items-center select-none group cursor-pointer ${className}`}>
      <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform">
        &lt;
      </span>
      <span className="font-signature text-lg xs:text-xl sm:text-2xl px-1 sm:px-1.5 text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors tracking-wide whitespace-nowrap shrink-0">
        Dhruva Bhattacharya
      </span>
      <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base sm:text-lg group-hover:translate-x-0.5 transition-transform">
        /&gt;
      </span>
    </div>
  );
}
