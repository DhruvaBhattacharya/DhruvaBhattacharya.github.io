import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Sparkles } from 'lucide-react';

const phrases = [
  {
    role: "Java Developer",
    comment: "// Enterprise Concurrency, Spring Boot & Distributed Architecture",
    badge: "Core Backend"
  },
  {
    role: "Architecting High-Scale Distributed Systems",
    comment: "// Low-Latency Microservices, Redis Caching & 99.9% Uptime SLA",
    badge: "System Design"
  },
  {
    role: "Microservices & Gen AI",
    comment: "// Autonomous RAG Pipelines, Multi-Agent Handoffs & Copilot Studio",
    badge: "AI Engineering"
  }
];

export default function CodingTypewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const typingSpeedRef = useRef(60);

  const currentPhrase = phrases[phraseIdx];

  useEffect(() => {
    let timer;

    if (isPaused) return;

    const fullText = currentPhrase.role;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < fullText.length) {
        // Human-like slight variance in typing speed (45ms to 75ms)
        const randomDelay = Math.floor(Math.random() * 30) + 45;
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, randomDelay);
      } else {
        // Finished typing word, pause so recruiter can read
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting backward (clean & fast ~30ms)
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, 28);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, isPaused, phraseIdx, currentPhrase.role]);

  // Click to instantly jump to the next phrase
  const handleQuickCycle = () => {
    setIsDeleting(false);
    setDisplayedText('');
    setPhraseIdx((prev) => (prev + 1) % phrases.length);
  };

  return (
    <div
      onClick={handleQuickCycle}
      className="glass-card rounded-2xl p-4 sm:p-5 border border-black/[0.08] dark:border-white/[0.1] shadow-lg max-w-2xl mx-auto lg:mx-0 backdrop-blur-xl transition-all hover:border-[#0071e3]/40 dark:hover:border-cyan-400/40 cursor-pointer group select-none relative overflow-hidden"
      title="Click to cycle next specialization"
    >
      {/* Background subtle neon glow */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#0071e3]/10 dark:bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      {/* Code Editor Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-2xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-2xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-2xs" />
          <span className="ml-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            dhruva.architect.ts
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0071e3]/10 dark:bg-cyan-950/40 text-[#0071e3] dark:text-cyan-400 border border-[#0071e3]/20 dark:border-cyan-500/30 font-semibold">
            {currentPhrase.badge}
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
            UTF-8
          </span>
        </div>
      </div>

      {/* Interactive Code Editor Line with Fixed Height */}
      <div className="font-mono min-h-[64px] sm:min-h-[58px] flex flex-col justify-center space-y-1.5">
        
        {/* Line 01: The Executable Typewriter Statement */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm sm:text-base lg:text-lg font-bold leading-relaxed">
          <span className="text-slate-400 dark:text-slate-600 select-none text-xs w-4">01</span>
          <span className="text-purple-600 dark:text-purple-400 font-semibold select-none">const</span>
          <span className="text-blue-600 dark:text-cyan-400 font-semibold select-none">specialization</span>
          <span className="text-slate-400 dark:text-slate-500 font-semibold select-none">=</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold tracking-tight">
            &ldquo;{displayedText}&rdquo;<span className="text-slate-500 dark:text-slate-400 font-normal">;</span>
          </span>
          
          {/* Animated Blinking Block Caret */}
          <span className="inline-block w-2.5 h-5 sm:h-6 bg-[#0071e3] dark:bg-cyan-400 animate-pulse rounded-xs shadow-[0_0_8px_#38bdf8] align-middle" />
        </div>

        {/* Line 02: Dynamic Code Comment Annotation */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 pt-0.5">
          <span className="text-slate-400 dark:text-slate-600 select-none text-xs w-4">02</span>
          <span className="italic font-mono text-slate-500 dark:text-slate-400 line-clamp-1">
            {currentPhrase.comment}
          </span>
        </div>

      </div>

      {/* Interactive Hint */}
      <div className="pt-2 mt-2 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>TypeScript 5.4 Active</span>
        </span>
        <span className="group-hover:text-[#0071e3] dark:group-hover:text-cyan-400 transition-colors">
          Click box to cycle ↵
        </span>
      </div>
    </div>
  );
}
