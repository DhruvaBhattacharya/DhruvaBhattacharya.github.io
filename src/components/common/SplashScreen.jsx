import React, { useEffect, useState } from 'react';
import SignatureLogo from './SignatureLogo';

export default function SplashScreen({ onFinish }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Show splash for 2.2s then fade smoothly
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        onFinish();
      }, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setFading(true);
    setTimeout(onFinish, 200);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-600 cursor-pointer ${
        fading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>

      <div className="flex flex-col items-center space-y-6 relative z-10 p-6 text-center max-w-md">
        
        {/* Animated SVG Logo */}
        <div className="w-56 sm:w-64 aspect-[440/305] relative filter drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
          <img
            src="./images/animated_logo.svg"
            alt="Dhruva Bhattacharya Animated Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Signature Branding */}
        <div className="space-y-2 pt-2">
          <SignatureLogo className="scale-110 sm:scale-125 justify-center" />
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase pt-1">
            Backend & Generative AI Engineer
          </p>
        </div>

        <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
      </div>

      <span className="absolute bottom-8 text-[11px] font-mono text-slate-500 hover:text-slate-400">
        Click anywhere to skip
      </span>
    </div>
  );
}
