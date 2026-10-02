import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Trophy, 
  CheckCircle, 
  ShieldCheck, 
  ArrowDown, 
  Sparkles, 
  Eye, 
  RefreshCw 
} from 'lucide-react';
import certsData from '../../data/certifications.json';
import ParallaxCard from '../common/ParallaxCard';

/**
 * Horizontal Arrow with direct vector line drawing based on fractional scroll (0.0 to 1.0)
 * Points 'right' (→) or 'left' (←) with a centered number badge.
 */
function HorizontalArrow({ number, direction = 'right', fraction = 0, className = '' }) {
  const isRight = direction === 'right';
  const isStarted = fraction > 0;
  const isComplete = fraction >= 1;

  // ViewBox: 64 wide x 24 high, center Y = 12
  const startX = isRight ? 4 : 60;
  const endX = isRight ? 60 : 4;
  const currentX = startX + (endX - startX) * fraction;

  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      {/* Number Badge above arrow */}
      <div 
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-200 z-30 shadow-xs ${
          isComplete
            ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.6)] scale-105'
            : isStarted
            ? 'bg-[#0071e3] text-white shadow-[0_0_14px_rgba(0,113,227,0.7)] scale-110'
            : 'bg-black/10 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-black/10 dark:border-white/10'
        }`}
      >
        {number}
      </div>

      <svg className="w-full h-8 overflow-visible" viewBox="0 0 64 24">
        {/* Inactive Guide Track */}
        <line
          x1={startX}
          y1="12"
          x2={endX}
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="text-black/15 dark:text-white/15"
        />

        {/* Instantiating Drawing Line: draws from startX to currentX */}
        {isStarted && (
          <line
            x1={startX}
            y1="12"
            x2={currentX}
            y2="12"
            stroke={isComplete ? '#10b981' : '#0071e3'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Advancing Tip Particle */}
        {isStarted && !isComplete && (
          <g>
            <circle
              cx={currentX}
              cy="12"
              r="4.5"
              fill="#38bdf8"
              opacity="0.5"
              className="animate-ping"
            />
            <circle
              cx={currentX}
              cy="12"
              r="3"
              fill="#0071e3"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </g>
        )}

        {/* Crisp Completed Arrowhead */}
        {isComplete && (
          <path
            d={isRight ? 'M 52 7 L 60 12 L 52 17' : 'M 12 7 L 4 12 L 12 17'}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

/**
 * Vertical Arrow with direct vector line drawing based on fractional scroll (0.0 to 1.0)
 * Points 'down' (↓) with the number badge to its right.
 */
function VerticalArrow({ number, fraction = 0, className = '' }) {
  const isStarted = fraction > 0;
  const isComplete = fraction >= 1;
  const startY = 4;
  const endY = 40;
  const currentY = startY + (endY - startY) * fraction;

  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      {/* Number Badge to the right of the vertical arrow */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 left-[calc(50%+16px)] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-200 z-30 shadow-xs ${
          isComplete
            ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.6)] scale-105'
            : isStarted
            ? 'bg-[#0071e3] text-white shadow-[0_0_14px_rgba(0,113,227,0.7)] scale-110'
            : 'bg-black/10 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-black/10 dark:border-white/10'
        }`}
      >
        {number}
      </div>

      <svg className="w-8 h-full overflow-visible" viewBox="0 0 24 44">
        {/* Inactive Guide Track */}
        <line
          x1="12"
          y1={startY}
          x2="12"
          y2={endY}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="text-black/15 dark:text-white/15"
        />

        {/* Instantiating Drawing Line */}
        {isStarted && (
          <line
            x1="12"
            y1={startY}
            x2="12"
            y2={currentY}
            stroke={isComplete ? '#10b981' : '#0071e3'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Advancing Tip Particle */}
        {isStarted && !isComplete && (
          <g>
            <circle
              cx="12"
              cy={currentY}
              r="4.5"
              fill="#38bdf8"
              opacity="0.5"
              className="animate-ping"
            />
            <circle
              cx="12"
              cy={currentY}
              r="3"
              fill="#0071e3"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </g>
        )}

        {/* Crisp Completed Arrowhead pointing down */}
        {isComplete && (
          <path
            d="M 7 33 L 12 40 L 17 33"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

/**
 * Arrow 9: Curved line emerging from Box 9 (bottom-right), curving left towards center,
 * with label "9" above the horizontal segment, and pointing down to Contact Me.
 */
function ArrowNineCurve({ fraction = 0, onNavigateContact }) {
  const isStarted = fraction > 0;
  const isComplete = fraction >= 1;
  const strokeOffset = 100 * (1 - fraction);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-28 hidden lg:block overflow-visible mt-2 select-none">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 110" preserveAspectRatio="none">
        {/* Inactive Guide Track */}
        <path
          d="M 833 0 C 833 40, 833 50, 740 50 L 540 50 C 500 50, 500 65, 500 105"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-black/15 dark:text-white/15"
        />

        {/* Instantiating Drawing Path */}
        <path
          d="M 833 0 C 833 40, 833 50, 740 50 L 540 50 C 500 50, 500 65, 500 105"
          fill="none"
          stroke={isComplete ? '#10b981' : '#0071e3'}
          strokeWidth="3"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
        />

        {/* Crisp Completed Arrowhead pointing down */}
        {isComplete && (
          <path
            d="M 492 95 L 500 108 L 508 95"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Number Badge "9" above the horizontal curve */}
      <div
        className={`absolute top-[38px] left-[66%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-200 z-30 shadow-xs ${
          isComplete
            ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.6)] scale-105'
            : isStarted
            ? 'bg-[#0071e3] text-white shadow-[0_0_14px_rgba(0,113,227,0.7)] scale-110'
            : 'bg-black/10 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-black/10 dark:border-white/10'
        }`}
      >
        9
      </div>

      {/* Target Destination: Smooth-scroll bridge to Contact Me */}
      <div className="absolute top-[112px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
        <a
          href="#contact"
          onClick={onNavigateContact}
          className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-tight border transition-all duration-300 shadow-sm ${
            isComplete
              ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:scale-105'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border-black/10 dark:border-white/10 hover:border-[#0071e3]'
          }`}
        >
          <span>Contact Me</span>
          <ArrowDown className={`w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 ${
            isComplete ? 'text-white animate-bounce' : 'text-slate-400'
          }`} />
        </a>
      </div>
    </div>
  );
}

/**
 * Individual Certification Card
 */
function CertCard({ cert, stepNum, isActive }) {
  const activeGlows = {
    cyan: 'dark:border-cyan-500/50 dark:shadow-[0_0_24px_rgba(6,182,212,0.18)] border-cyan-500/40 shadow-md',
    amber: 'dark:border-amber-500/50 dark:shadow-[0_0_24px_rgba(245,158,11,0.18)] border-amber-500/40 shadow-md',
    indigo: 'dark:border-indigo-500/50 dark:shadow-[0_0_24px_rgba(99,102,241,0.18)] border-indigo-500/40 shadow-md',
    emerald: 'dark:border-emerald-500/50 dark:shadow-[0_0_24px_rgba(16,185,129,0.18)] border-emerald-500/40 shadow-md',
    blue: 'dark:border-blue-500/50 dark:shadow-[0_0_24px_rgba(59,130,246,0.18)] border-blue-500/40 shadow-md'
  };

  return (
    <ParallaxCard
      maxTilt={isActive ? 5 : 0}
      scale={isActive ? 1.015 : 1}
      glareColor="rgba(0, 113, 227, 0.15)"
      className={`glass-card rounded-2xl p-5 border transition-all duration-500 flex flex-col justify-between h-full relative group ${
        isActive
          ? `${activeGlows[cert.badgeColor] || 'border-cyan-500/40'} bg-white/85 dark:bg-black/50 backdrop-blur-xl opacity-100 scale-100`
          : 'border-dashed border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] opacity-35 grayscale'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
          isActive ? 'text-[#0071e3] dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'
        }`}>
          {cert.issuer}
        </span>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
          isActive
            ? 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-black/10 dark:border-white/10'
            : 'text-slate-400 dark:text-slate-600 border-black/5 dark:border-white/5'
        }`}>
          0{stepNum}
        </span>
      </div>

      {/* Credential Name & Category */}
      <div className="space-y-1.5 flex-grow">
        <h4 className={`text-sm sm:text-base font-bold tracking-tight leading-snug transition-colors ${
          isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
        }`}>
          {cert.name}
        </h4>
        <p className="text-[11px] font-mono text-slate-500 dark:text-[#86868b]">
          {cert.category}
        </p>
      </div>

      {/* Verified Credential Badge */}
      <div className="pt-3 mt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold ${
          isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'
        }`}>
          <CheckCircle className="w-3.5 h-3.5" />
          {cert.status}
        </span>
        <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
          isActive ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-400/40 dark:bg-slate-700'
        }`} />
      </div>
    </ParallaxCard>
  );
}

export default function EducationCerts() {
  const certs = certsData.certifications;
  const [scrollProgress, setScrollProgress] = useState(0); // 0.0 to 19.0
  const [isAllUnlocked, setIsAllUnlocked] = useState(false);
  const containerRef = useRef(null);

  // Scroll Progress Listener mapped across 19 stages without sticky traps
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Starts animating when container enters comfortable reading range (75% down viewport)
            // Reaches end when bottom approaches 25% of viewport
            const startTrigger = windowHeight * 0.75;
            const endTrigger = windowHeight * 0.25;
            const travelDistance = rect.height + (startTrigger - endTrigger);

            if (travelDistance > 0) {
              const scrolledDistance = startTrigger - rect.top;
              const ratio = Math.max(0, Math.min(1, scrolledDistance / travelDistance));
              setScrollProgress(ratio * 19);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const effectiveProgress = isAllUnlocked ? 19 : scrollProgress;

  // Fraction [0, 1] for Arrow k (k from 1 to 9)
  const getArrowFraction = (num) => {
    const start = 2 * num - 1;
    const end = 2 * num;
    if (effectiveProgress <= start) return 0;
    if (effectiveProgress >= end) return 1;
    return (effectiveProgress - start) / (end - start);
  };

  // Check if Box k is active (k from 1 to 9)
  const isBoxActive = (boxNum) => {
    const threshold = 2 * (boxNum - 1);
    return effectiveProgress >= threshold;
  };

  const handleSmoothScrollContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentStep = Math.min(19, Math.floor(effectiveProgress) + 1);

  return (
    <section id="achievements" className="py-24 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Honors & Academic Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education, Milestones & Certifications
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base">
            Academic foundation in computer science and verified international engineering milestones.
          </p>
        </div>

        {/* Top Split: Education (Left) & Key Honors (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Formal Education Card (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <ParallaxCard
              maxTilt={5}
              scale={1.01}
              glareColor="rgba(0, 113, 227, 0.12)"
              className="glass-card rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] h-full flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="w-11 h-11 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-cyan-400 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Formal Education</h3>
                    <span className="text-xs font-mono font-semibold text-[#0071e3] dark:text-cyan-400">Bachelor of Technology</span>
                  </div>
                </div>

                {certsData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-3 pt-1">
                    <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-semibold text-[#0071e3] dark:text-cyan-400">
                      {edu.specialization}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-[#86868b]">
                      {edu.institution} • <span className="font-mono text-slate-500 dark:text-slate-400">{edu.period}</span>
                    </p>
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Score: {edu.score}</span>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs font-mono uppercase text-slate-500 dark:text-[#86868b] mb-1.5 font-semibold">Core Coursework:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((course, cIdx) => (
                          <span key={cIdx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/[0.03] text-slate-700 border border-black/[0.05] dark:bg-white/[0.05] dark:text-slate-300 dark:border-white/[0.06]">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ParallaxCard>
          </div>

          {/* Key Achievements (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight pb-1">
              <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Key Competition Wins & Milestones</span>
            </h3>

            <div className="space-y-4">
              {certsData.achievements.map((ach, idx) => (
                <ParallaxCard
                  key={idx}
                  maxTilt={4}
                  scale={1.01}
                  glareColor="rgba(245, 158, 11, 0.12)"
                  className="glass-card rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        {ach.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{ach.year}</span>
                    </div>
                    
                    <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight leading-snug">
                      {ach.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a1a1a6] leading-relaxed">
                      {ach.description}
                    </p>
                    
                    <p className="text-xs font-mono font-semibold text-[#0071e3] dark:text-cyan-400 pt-1">
                      {ach.organization}
                    </p>
                  </div>
                </ParallaxCard>
              ))}
            </div>
          </div>

        </div>

        {/* 19-Stage Scroll-Driven Snake Flow Section */}
        <div 
          ref={containerRef} 
          className="pt-8 border-t border-black/[0.06] dark:border-white/[0.08]"
        >
          {/* Section Header & Sequence Tracker */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0071e3] dark:text-cyan-400" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Professional Certifications
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#86868b]">
                Scroll down to advance the chronological flow from Step 1 to Step 9, connecting directly into Contact Me.
              </p>
            </div>

            {/* Sequence Status & Quick Toggle */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0071e3] dark:bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  Stage {currentStep} of 19
                </span>
                <div className="w-20 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0071e3] to-emerald-400 transition-all duration-150"
                    style={{ width: `${(effectiveProgress / 19) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setIsAllUnlocked(prev => !prev)}
                className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Toggle instant view for all cards"
              >
                {isAllUnlocked ? (
                  <>
                    <RefreshCw className="w-3 h-3 text-[#0071e3]" />
                    <span>Sync Scroll</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3 text-emerald-500" />
                    <span>Reveal All</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop 3x3 Snake Grid Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-x-14 xl:gap-x-16 gap-y-10 relative max-w-6xl mx-auto">
            
            {/* Row 1: Box 1 (Azure AI) ──[1]──> Box 2 (AWS CCP) ──[2]──> Box 3 (AWS Cloud) */}
            <div className="relative z-10">
              <CertCard cert={certs[0]} stepNum={1} isActive={isBoxActive(1)} />
              <HorizontalArrow
                number={1}
                direction="right"
                fraction={getArrowFraction(1)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[1]} stepNum={2} isActive={isBoxActive(2)} />
              <HorizontalArrow
                number={2}
                direction="right"
                fraction={getArrowFraction(2)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[2]} stepNum={3} isActive={isBoxActive(3)} />
              <VerticalArrow
                number={3}
                fraction={getArrowFraction(3)}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-10 w-12"
              />
            </div>

            {/* Row 2: Box 6 (Airtribe) <──[5]── Box 5 (UpGrad) <──[4]── Box 4 (AWS NLP) */}
            <div className="relative z-10">
              <CertCard cert={certs[5]} stepNum={6} isActive={isBoxActive(6)} />
              <VerticalArrow
                number={6}
                fraction={getArrowFraction(6)}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-10 w-12"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[4]} stepNum={5} isActive={isBoxActive(5)} />
              <HorizontalArrow
                number={5}
                direction="left"
                fraction={getArrowFraction(5)}
                className="absolute -left-14 xl:-left-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[3]} stepNum={4} isActive={isBoxActive(4)} />
              <HorizontalArrow
                number={4}
                direction="left"
                fraction={getArrowFraction(4)}
                className="absolute -left-14 xl:-left-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            {/* Row 3: Box 7 (ISRO) ──[7]──> Box 8 (IBM Cloud) ──[8]──> Box 9 (CISCO C++) */}
            <div className="relative z-10">
              <CertCard cert={certs[6]} stepNum={7} isActive={isBoxActive(7)} />
              <HorizontalArrow
                number={7}
                direction="right"
                fraction={getArrowFraction(7)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[7]} stepNum={8} isActive={isBoxActive(8)} />
              <HorizontalArrow
                number={8}
                direction="right"
                fraction={getArrowFraction(8)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[8]} stepNum={9} isActive={isBoxActive(9)} />
            </div>

          </div>

          {/* Desktop Arrow 9: Curving down from Box 9 to Contact Me */}
          <ArrowNineCurve 
            fraction={getArrowFraction(9)} 
            onNavigateContact={handleSmoothScrollContact}
          />

          {/* Mobile / Tablet Sequential Flow (< 1024px) */}
          <div className="lg:hidden space-y-4 max-w-md mx-auto pt-6">
            {certs.map((cert, idx) => {
              const boxNum = idx + 1;
              const arrowNum = boxNum;
              const isBoxOn = isBoxActive(boxNum);
              const arrowFrac = getArrowFraction(arrowNum);

              return (
                <div key={cert.id || cert.name} className="flex flex-col items-center">
                  <div className="w-full">
                    <CertCard cert={cert} stepNum={boxNum} isActive={isBoxOn} />
                  </div>

                  {arrowNum <= 9 && (
                    <div className="py-2 w-full flex justify-center">
                      <VerticalArrow
                        number={arrowNum}
                        fraction={arrowFrac}
                        className="h-12 w-12"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Contact Target */}
            <div className="pt-4 pb-2 flex justify-center">
              <a
                href="#contact"
                onClick={handleSmoothScrollContact}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-tight border transition-all duration-300 shadow-md ${
                  effectiveProgress >= 18
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-white/80 dark:bg-black/60 text-slate-700 dark:text-slate-200 border-black/10 dark:border-white/10'
                }`}
              >
                <span>Contact Me</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
