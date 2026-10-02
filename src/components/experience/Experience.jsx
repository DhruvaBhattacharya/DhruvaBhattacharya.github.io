import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, Zap, TrendingUp, Sparkles } from 'lucide-react';
import experienceData from '../../data/experience.json';
import ParallaxCard from '../common/ParallaxCard';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0071e3]/10 dark:bg-cyan-950/40 border border-[#0071e3]/20 dark:border-cyan-500/30 text-[#0071e3] dark:text-cyan-400 text-xs font-mono font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Journey & Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900 tracking-tight">
            Work Experience
          </h2>
          <p className="dark:text-[#86868b] text-slate-600 text-sm sm:text-base">
            Chronological engineering timeline showcasing production systems, enterprise architectures, and quantified results.
          </p>
        </div>

        {/* Continuous Journey Timeline with Mathematical Center-Line Alignment */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 sm:ml-8 md:ml-12 space-y-16">
          
          {experienceData.map((item, idx) => (
            <div key={item.id} className="relative group pl-6 sm:pl-10">
              
              {/* Animated Timeline Node Marker (100% centered on line via left-0 -translate-x-1/2) */}
              <div className="absolute left-0 -translate-x-1/2 top-2 z-10 flex items-center justify-center">
                {idx === 0 ? (
                  // Active Beacon for Current Role (TCS)
                  <div className="relative flex items-center justify-center w-7 h-7">
                    <span className="absolute w-full h-full rounded-full bg-[#0071e3]/40 dark:bg-cyan-400/40 animate-ping opacity-75" />
                    <span className="absolute w-5 h-5 rounded-full bg-[#0071e3]/20 dark:bg-cyan-400/20 animate-pulse" />
                    <span className="relative w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-[#0071e3] dark:border-cyan-400 flex items-center justify-center shadow-[0_0_12px_#0071e3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] dark:bg-cyan-400" />
                    </span>
                  </div>
                ) : (
                  // Animated Interactive Node for Prior Roles
                  <div className="relative flex items-center justify-center w-7 h-7 group-hover:scale-125 transition-transform duration-300">
                    <span className="absolute w-full h-full rounded-full bg-[#0071e3]/0 group-hover:bg-[#0071e3]/30 dark:group-hover:bg-cyan-400/30 group-hover:animate-ping transition-all opacity-75" />
                    <span className="relative w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 group-hover:border-[#0071e3] dark:group-hover:border-cyan-400 flex items-center justify-center shadow-xs transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-[#0071e3] dark:group-hover:bg-cyan-400 transition-colors duration-300" />
                    </span>
                  </div>
                )}
              </div>

              {/* Experience Card with 3D Parallax Tilt */}
              <ParallaxCard
                maxTilt={4}
                scale={1.01}
                glareColor="rgba(0, 113, 227, 0.12)"
                className="glass-card rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:border-black/20 dark:hover:border-white/20 transition-all"
              >
                {/* Header Meta */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#0071e3]/10 text-[#0071e3] dark:text-cyan-400 dark:bg-cyan-950/40 border border-[#0071e3]/20 dark:border-cyan-500/30 font-semibold">
                        {item.type}
                      </span>
                      {idx === 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          Current Role
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pt-1">
                      <Building2 className="w-5 h-5 text-[#0071e3] dark:text-cyan-400 shrink-0" />
                      <span>{item.company}</span>
                    </h3>
                    <p className="text-[#0071e3] dark:text-cyan-400 font-semibold text-base">
                      {item.role}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-slate-500 dark:text-[#86868b]">
                    <span className="px-3 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Role Focus & Architectural Overview */}
                {item.id === 'tcs-backend' && (
                  <div className="mt-5 p-4 rounded-2xl bg-[#0071e3]/[0.03] dark:bg-cyan-950/20 border border-[#0071e3]/10 dark:border-cyan-500/20">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0071e3] dark:text-cyan-400 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Architectural Specialization & Engineering Scope</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Engineering high-concurrency <span className="font-semibold text-slate-900 dark:text-white">Distributed Systems & Microservices</span>, query topology optimization, Redis caching layers, and production <span className="font-semibold text-slate-900 dark:text-white">Generative AI Multi-Agent Architectures</span> for tier-1 telecom and enterprise clients.
                    </p>
                  </div>
                )}

                {/* Sub-Projects & Deliverables */}
                <div className="mt-8 space-y-10">
                  {item.subProjects.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-4 pt-6 first:pt-0 border-t first:border-t-0 border-black/[0.06] dark:border-white/[0.08]">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                          <span className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] dark:bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0071e3] dark:bg-cyan-400 shadow-[0_0_6px_#38bdf8]"></span>
                          </span>
                          <span>{sub.title}</span>
                        </h4>
                        {sub.client && (
                          <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-300 font-medium">
                            {sub.client}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a1a1a6] leading-relaxed">
                        {sub.summary}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {sub.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-black/[0.03] dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-black/[0.05] dark:border-white/[0.06]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Engineering Implementation & Impact */}
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        
                        {/* Situation & Task */}
                        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] space-y-2">
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            <strong className="text-slate-900 dark:text-white">Technical Challenge:</strong> {sub.starDetails.situation}
                          </p>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                            <strong className="text-slate-900 dark:text-white">Architecture Goal:</strong> {sub.starDetails.task}
                          </p>
                        </div>

                        {/* Core Deliverables */}
                        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] space-y-2">
                          <span className="text-[11px] font-mono uppercase font-bold text-[#0071e3] dark:text-cyan-400 tracking-wider flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            Key Engineering Actions:
                          </span>
                          <ul className="space-y-2 mt-1">
                            {sub.starDetails.action.map((act, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400 mt-0.5 shrink-0" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Quantified Impact */}
                        <div className="p-4 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 space-y-1">
                          <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            Quantified Production Impact:
                          </span>
                          <p className="text-xs text-emerald-900 dark:text-emerald-300 font-medium leading-relaxed">
                            {sub.starDetails.result}
                          </p>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>

              </ParallaxCard>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
