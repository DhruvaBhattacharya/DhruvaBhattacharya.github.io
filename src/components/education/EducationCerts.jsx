import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Trophy, 
  CheckCircle, 
  ShieldCheck
} from 'lucide-react';
import certsData from '../../data/certifications.json';
import ParallaxCard from '../common/ParallaxCard';

/**
 * Horizontal Arrow with direct vector line drawing & advancing arrowhead
 * Points 'right' (→) or 'left' (←) with luminous poppy white laser styling
 */
function HorizontalArrow({ direction = 'right', fraction = 0, className = '' }) {
  const isRight = direction === 'right';
  const isStarted = fraction > 0;
  const isComplete = fraction >= 1;

  // ViewBox: 64 wide x 24 high, center Y = 12
  const startX = isRight ? 4 : 60;
  const endX = isRight ? 60 : 4;
  const currentX = startX + (endX - startX) * fraction;

  return (
    <div className={`pointer-events-none select-none overflow-visible z-20 flex items-center justify-center ${className}`}>
      <svg className="w-full h-8 overflow-visible" viewBox="0 0 64 24">
        {/* Subtle background guide dash */}
        <line
          x1={startX}
          y1="12"
          x2={endX}
          y2="12"
          className="poppy-arrow-track"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Instantiating Drawing Path: draws from startX to currentX */}
        {isStarted && (
          <>
            {/* Luminous Glow Aura */}
            <line
              x1={startX}
              y1="12"
              x2={currentX}
              y2="12"
              className="poppy-arrow-glow"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Core Poppy White Laser Line */}
            <line
              x1={startX}
              y1="12"
              x2={currentX}
              y2="12"
              className="poppy-arrow-core"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Advancing Tip Arrowhead & Poppy Glow Particle */}
        {isStarted && (
          <g>
            {/* Arrowhead Glow Aura */}
            <path
              d={
                isRight
                  ? `M ${currentX - 8} 7 L ${currentX} 12 L ${currentX - 8} 17`
                  : `M ${currentX + 8} 7 L ${currentX} 12 L ${currentX + 8} 17`
              }
              fill="none"
              className="poppy-arrow-glow"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Core Poppy White Arrowhead */}
            <path
              d={
                isRight
                  ? `M ${currentX - 8} 7 L ${currentX} 12 L ${currentX - 8} 17`
                  : `M ${currentX + 8} 7 L ${currentX} 12 L ${currentX + 8} 17`
              }
              fill="none"
              className="poppy-arrow-head"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * Vertical Arrow with direct vector line drawing & advancing arrowhead
 * Points 'down' (↓) with luminous poppy white laser styling
 */
function VerticalArrow({ fraction = 0, className = '' }) {
  const isStarted = fraction > 0;
  const isComplete = fraction >= 1;
  const startY = 4;
  const endY = 42;
  const currentY = startY + (endY - startY) * fraction;

  return (
    <div className={`pointer-events-none select-none overflow-visible z-20 flex items-center justify-center ${className}`}>
      <svg className="w-8 h-full overflow-visible" viewBox="0 0 24 46">
        {/* Subtle background guide dash */}
        <line
          x1="12"
          y1={startY}
          x2="12"
          y2={endY}
          className="poppy-arrow-track"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Instantiating Drawing Path: from startY to currentY */}
        {isStarted && (
          <>
            {/* Luminous Glow Aura */}
            <line
              x1="12"
              y1={startY}
              x2="12"
              y2={currentY}
              className="poppy-arrow-glow"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Core Poppy White Laser Line */}
            <line
              x1="12"
              y1={startY}
              x2="12"
              y2={currentY}
              className="poppy-arrow-core"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Advancing Tip Arrowhead & Poppy Glow Particle */}
        {isStarted && (
          <g>
            {/* Arrowhead Glow Aura */}
            <path
              d={`M 7 ${currentY - 8} L 12 ${currentY} L 17 ${currentY - 8}`}
              fill="none"
              className="poppy-arrow-glow"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Core Poppy White Arrowhead */}
            <path
              d={`M 7 ${currentY - 8} L 12 ${currentY} L 17 ${currentY - 8}`}
              fill="none"
              className="poppy-arrow-head"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * Arrow 9: Curved line emerging from Tile 9 (CPA C++), curving left across center,
 * and pointing straight down directly at [ Direct Outreach ] / Contact Me with luminous poppy white glow
 */
function ArrowNineCurve({ fraction = 0 }) {
  const isStarted = fraction > 0;
  const isComplete = fraction >= 1;
  const strokeOffset = 100 * (1 - fraction);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-36 hidden lg:block overflow-visible mt-2 -mb-16 select-none pointer-events-none z-30">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 144" preserveAspectRatio="none">
        {/* Inactive Guide Track */}
        <path
          d="M 852 0 C 852 45, 852 55, 740 55 L 540 55 C 500 55, 500 75, 500 135"
          fill="none"
          className="poppy-arrow-track"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Instantiating Drawing Path: emerges from Tile 9 and ends directly at Contact Me */}
        {isStarted && (
          <>
            {/* Luminous Glow Aura */}
            <path
              d="M 852 0 C 852 45, 852 55, 740 55 L 540 55 C 500 55, 500 75, 500 135"
              fill="none"
              className="poppy-arrow-glow transition-[stroke-dashoffset] duration-75"
              strokeWidth="7"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
            {/* Core Poppy White Laser Path */}
            <path
              d="M 852 0 C 852 45, 852 55, 740 55 L 540 55 C 500 55, 500 75, 500 135"
              fill="none"
              className="poppy-arrow-core transition-[stroke-dashoffset] duration-75"
              strokeWidth="3.2"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
          </>
        )}

        {/* Crisp Completed Arrowhead pointing straight down into [ Direct Outreach ] */}
        {isComplete && (
          <g>
            <path
              d="M 491 122 L 500 138 L 509 122"
              fill="none"
              className="poppy-arrow-glow"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 491 122 L 500 138 L 509 122"
              fill="none"
              className="poppy-arrow-head"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}


/**
 * Individual Certification Tile — rendered fully in one go with 3D Parallax & live flow illumination
 */
function CertCard({ cert, isLit }) {
  const activeGlows = {
    cyan: 'border-cyan-500/40 dark:border-cyan-500/50 shadow-[0_4px_24px_rgba(6,182,212,0.18)]',
    amber: 'border-amber-500/40 dark:border-amber-500/50 shadow-[0_4px_24px_rgba(245,158,11,0.18)]',
    indigo: 'border-indigo-500/40 dark:border-indigo-500/50 shadow-[0_4px_24px_rgba(99,102,241,0.18)]',
    emerald: 'border-emerald-500/40 dark:border-emerald-500/50 shadow-[0_4px_24px_rgba(16,185,129,0.18)]',
    blue: 'border-blue-500/40 dark:border-blue-500/50 shadow-[0_4px_24px_rgba(59,130,246,0.18)]'
  };

  return (
    <ParallaxCard
      maxTilt={6}
      scale={1.02}
      glareColor="rgba(0, 113, 227, 0.15)"
      className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between h-full relative group ${
        isLit
          ? `${activeGlows[cert.badgeColor] || 'border-[#0071e3]/40'} bg-white/95 dark:bg-black/60`
          : 'border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20'
      }`}
    >
      {/* Top Issuer */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#0071e3] dark:text-cyan-400">
          {cert.issuer}
        </span>
        <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          isLit ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-300 dark:bg-slate-700'
        }`} />
      </div>

      {/* Credential Name & Category */}
      <div className="space-y-1.5 flex-grow">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0071e3] dark:group-hover:text-cyan-400 transition-colors">
          {cert.name}
        </h4>
        <p className="text-[11px] font-mono text-slate-500 dark:text-[#86868b]">
          {cert.category}
        </p>
      </div>

      {/* Verified Credential Badge */}
      <div className="pt-3 mt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-3.5 h-3.5" />
          {cert.status}
        </span>
      </div>
    </ParallaxCard>
  );
}

export default function EducationCerts() {
  const certs = certsData.certifications;
  const [scrollProgress, setScrollProgress] = useState(0); // 0.0 to 9.0
  const containerRef = useRef(null);

  // Scroll Progress Listener mapped across the 9 sequential arrows
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Starts when certifications heading enters comfortable view (70% down viewport)
            // Finishes when bottom of Row 3 reaches 30% viewport (transitioning directly into Contact)
            const startTrigger = windowHeight * 0.70;
            const endTrigger = windowHeight * 0.30;
            const travelDistance = rect.height + (startTrigger - endTrigger);

            if (travelDistance > 0) {
              const scrolledDistance = startTrigger - rect.top;
              const ratio = Math.max(0, Math.min(1, scrolledDistance / travelDistance));
              setScrollProgress(ratio * 9);
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

  // Compute fraction [0, 1] for Arrow k (k from 1 to 9)
  const getArrowFraction = (arrowIndex) => {
    const start = arrowIndex - 1;
    const end = arrowIndex;
    if (scrollProgress <= start) return 0;
    if (scrollProgress >= end) return 1;
    return scrollProgress - start;
  };

  // Check if tile is lit (Tile 1 lit at start, Tile k lit when Arrow k-1 reaches it)
  const isTileLit = (tileIndex) => {
    return scrollProgress >= (tileIndex - 1);
  };

  return (
    <section id="achievements" className="pt-24 pb-0 relative transition-colors duration-300">
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

        {/* Professional Certifications Section with Sequential Flow */}
        <div 
          ref={containerRef} 
          className="pt-8 border-t border-black/[0.06] dark:border-white/[0.08]"
        >
          {/* Section Header */}
          <div className="mb-12 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0071e3] dark:text-cyan-400" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Professional Certifications
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#86868b]">
              Verified credentials across Cloud Platforms, GenAI Engineering, and Core Systems.
            </p>
          </div>

          {/* Desktop 3x3 Snake Grid Layout (All 9 tiles rendered in one go, interconnected by scroll-driven arrows) */}
          <div className="hidden lg:grid grid-cols-3 gap-x-14 xl:gap-x-16 gap-y-12 relative max-w-6xl mx-auto">
            
            {/* Row 1: Tile 1 (Azure AI) ──> Tile 2 (AWS CCP) ──> Tile 3 (AWS Cloud) */}
            <div className="relative z-10">
              <CertCard cert={certs[0]} isLit={isTileLit(1)} />
              <HorizontalArrow
                direction="right"
                fraction={getArrowFraction(1)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[1]} isLit={isTileLit(2)} />
              <HorizontalArrow
                direction="right"
                fraction={getArrowFraction(2)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[2]} isLit={isTileLit(3)} />
              <VerticalArrow
                fraction={getArrowFraction(3)}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 h-12 w-10"
              />
            </div>

            {/* Row 2: Tile 6 (Airtribe) <── Tile 5 (UpGrad) <── Tile 4 (AWS NLP) */}
            <div className="relative z-10">
              <CertCard cert={certs[5]} isLit={isTileLit(6)} />
              <VerticalArrow
                fraction={getArrowFraction(6)}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 h-12 w-10"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[4]} isLit={isTileLit(5)} />
              <HorizontalArrow
                direction="left"
                fraction={getArrowFraction(5)}
                className="absolute -left-14 xl:-left-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[3]} isLit={isTileLit(4)} />
              <HorizontalArrow
                direction="left"
                fraction={getArrowFraction(4)}
                className="absolute -left-14 xl:-left-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            {/* Row 3: Tile 7 (ISRO) ──> Tile 8 (IBM Cloud) ──> Tile 9 (CISCO C++) */}
            <div className="relative z-10">
              <CertCard cert={certs[6]} isLit={isTileLit(7)} />
              <HorizontalArrow
                direction="right"
                fraction={getArrowFraction(7)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[7]} isLit={isTileLit(8)} />
              <HorizontalArrow
                direction="right"
                fraction={getArrowFraction(8)}
                className="absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 w-14 xl:w-16"
              />
            </div>

            <div className="relative z-10">
              <CertCard cert={certs[8]} isLit={isTileLit(9)} />
            </div>

          </div>

          {/* Desktop Arrow 9: Curving down from Tile 9, extending directly into [ Direct Outreach ] / Contact Me */}
          <ArrowNineCurve fraction={getArrowFraction(9)} />

          {/* Mobile / Tablet Sequential Flow (< 1024px) */}
          <div className="lg:hidden space-y-4 max-w-md mx-auto pt-6">
            {certs.map((cert, idx) => {
              const tileNum = idx + 1;
              const arrowNum = tileNum;
              const isLit = isTileLit(tileNum);
              const arrowFrac = getArrowFraction(arrowNum);

              return (
                <div key={cert.id || cert.name} className="flex flex-col items-center">
                  <div className="w-full">
                    <CertCard cert={cert} isLit={isLit} />
                  </div>

                  {arrowNum <= 9 && (
                    <div className="py-2 w-full flex justify-center">
                      <VerticalArrow
                        fraction={arrowFrac}
                        className="relative h-12 w-10"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
