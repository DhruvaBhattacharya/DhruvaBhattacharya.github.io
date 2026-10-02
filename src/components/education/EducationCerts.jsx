import React, { useState, useEffect, useRef } from 'react';
import { Award, GraduationCap, Trophy, CheckCircle, ShieldCheck, Cpu, Cloud, Terminal } from 'lucide-react';
import certsData from '../../data/certifications.json';
import ParallaxCard from '../common/ParallaxCard';
import UmlArrow from '../common/UmlArrow';

const certTracks = [
  {
    id: 'Cloud & Distributed Systems',
    label: 'Cloud & Distributed Systems',
    connectorLabel: 'Infra / IAM',
    icon: Cloud,
    count: 3
  },
  {
    id: 'GenAI & Agentic Systems',
    label: 'GenAI & Agentic Systems',
    connectorLabel: 'LLMs / RAG',
    icon: Cpu,
    count: 4
  },
  {
    id: 'Core Systems & Research',
    label: 'Core Systems & Research',
    connectorLabel: 'DSA / Modeling',
    icon: Terminal,
    count: 2
  }
];

export default function EducationCerts() {
  const [activeTrack, setActiveTrack] = useState('ALL');
  const [completedCertStep, setCompletedCertStep] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const certSectionRef = useRef(null);

  // Scroll-triggered automatic arrow completion for Certifications
  useEffect(() => {
    const handleScrollOrIntersect = () => {
      if (!certSectionRef.current) return;
      const rect = certSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) {
        if (!hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const interval = setInterval(() => {
            current += 1;
            setCompletedCertStep(current);
            if (current >= certTracks.length) {
              clearInterval(interval);
            }
          }, 360);
        }
      }
    };

    window.addEventListener('scroll', handleScrollOrIntersect, { passive: true });
    handleScrollOrIntersect();

    return () => window.removeEventListener('scroll', handleScrollOrIntersect);
  }, [hasAnimated]);

  const filteredCerts = activeTrack === 'ALL'
    ? certsData.certifications
    : certsData.certifications.filter(c => c.category === activeTrack);

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

        {/* Professional Certifications */}
        <div ref={certSectionRef} className="space-y-8 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
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

            {/* Quick Filter: All vs Tracks */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTrack('ALL')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTrack === 'ALL'
                    ? 'bg-[#0071e3] text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All (9)
              </button>
              {certTracks.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrack(track.id)}
                  className={`px-3 py-1 rounded-lg transition-all hidden md:inline-block ${
                    activeTrack === track.id
                      ? 'bg-[#0071e3] text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {track.label.split(' ')[0]} ({track.count})
                </button>
              ))}
            </div>
          </div>

          {/* Sequential Pipeline Flow Bar for Certifications */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center justify-between min-w-[760px] p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
              {certTracks.map((track, i) => {
                const isSelected = activeTrack === track.id;
                const isCompleted = completedCertStep > i;

                return (
                  <React.Fragment key={track.id}>
                    <button
                      type="button"
                      onClick={() => setActiveTrack(prev => (prev === track.id ? 'ALL' : track.id))}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-left text-xs font-medium transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#0071e3] text-white border-[#0071e3] shadow-md shadow-[#0071e3]/20 scale-105 z-10'
                          : isCompleted
                          ? 'bg-white dark:bg-slate-900 border-[#0071e3]/30 dark:border-cyan-500/30 text-slate-900 dark:text-white shadow-2xs hover:border-[#0071e3]'
                          : 'bg-white/60 dark:bg-slate-900/60 border-black/[0.08] dark:border-white/[0.08] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-white'
                            : isCompleted
                            ? 'bg-[#0071e3] dark:bg-cyan-400 shadow-[0_0_6px_#38bdf8]'
                            : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                      <span className="font-semibold truncate">
                        {track.label}
                      </span>
                    </button>

                    {i < certTracks.length - 1 && (
                      <UmlArrow
                        isCompleted={completedCertStep > i}
                        isActive={completedCertStep === i + 1}
                        label={track.connectorLabel}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* 9 Professional Certifications Grid with 3D Parallax */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCerts.map((cert) => (
              <ParallaxCard
                key={cert.id || cert.name}
                maxTilt={6}
                scale={1.015}
                glareColor="rgba(0, 113, 227, 0.16)"
                className="glass-card rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#0071e3] dark:text-cyan-400 uppercase tracking-wider block">
                    {cert.issuer}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight group-hover:text-[#0071e3] dark:group-hover:text-cyan-400 transition-colors">
                    {cert.name}
                  </h4>
                </div>

                {/* Verified Credential Badge */}
                <div className="pt-4 mt-5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Credential
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_6px_#10b981]" />
                </div>
              </ParallaxCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
