import React from 'react';
import { ArrowUp } from 'lucide-react';
import SignatureLogo from './SignatureLogo';
import profileData from '../../data/profile.json';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] py-12 text-slate-600 dark:text-[#86868b] text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          
          {/* Left Column: Brand Signature */}
          <div className="flex items-center justify-center md:justify-start">
            <SignatureLogo />
          </div>

          {/* Center Column: Socials Ribbon */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            {profileData.socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] transition-all shrink-0 whitespace-nowrap active:scale-95"
                title={soc.name}
              >
                {soc.name}
              </a>
            ))}
          </div>

          {/* Right Column: Scroll to Top */}
          <div className="flex items-center justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
              title="Back to Top"
            >
              <span className="text-[11px] font-mono font-medium">Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* User requested exact footer text */}
        <div className="text-center mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] text-slate-500 dark:text-[#86868b] text-xs font-mono">
          Made with ❤️ by Dhruva Bhattacharya
        </div>
      </div>
    </footer>
  );
}
