import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Layers, Sparkles, Building2, Target, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import experienceData from '../../data/experience.json';

export default function Experience() {
  const [activeTab, setActiveTab] = useState(experienceData[0]?.id || 'tcs-backend');

  return (
    <section id="experience" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <Briefcase className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
            <span>Career & Engineering Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900 tracking-tight">
            Work Experience
          </h2>
          <p className="dark:text-[#86868b] text-slate-600 text-sm sm:text-base">
            Detailed breakdown of production engineering achievements, enterprise architectures, and quantified results.
          </p>
        </div>

        {/* Experience Content Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Company / Role Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {experienceData.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    isActive
                      ? 'bg-white dark:bg-[#1c1c1e] border-black/[0.1] dark:border-white/[0.16] shadow-lg text-slate-900 dark:text-white'
                      : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0071e3] dark:text-cyan-400 font-semibold">
                      {item.type}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-[#86868b] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mt-1 text-slate-900 dark:text-slate-100">
                    {item.company}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#86868b] mt-0.5">
                    {item.role}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: STAR Breakdown (8 cols) */}
          <div className="lg:col-span-8">
            {experienceData
              .filter((item) => item.id === activeTab)
              .map((item) => (
                <div key={item.id} className="space-y-6">
                  
                  {/* Company & Role Header Card */}
                  <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          {item.company}
                        </h3>
                        <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm mt-0.5">
                          {item.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Sub-projects list with clean pattern */}
                    <div className="mt-6 space-y-10">
                      {item.subProjects.map((sub, idx) => (
                        <div key={idx} className="space-y-4 pt-2 border-t first:border-t-0 border-slate-200 dark:border-slate-800/60">
                          
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
                              {sub.title}
                            </h4>
                            {sub.client && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-300 font-medium">
                                {sub.client}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                            {sub.summary}
                          </p>

                          {/* Tech stack badges */}
                          <div className="flex flex-wrap gap-1.5">
                            {sub.techStack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-50 text-cyan-800 border border-cyan-200 dark:bg-cyan-950/60 dark:border-cyan-500/30 dark:text-cyan-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Engineering Implementation & Impact */}
                          <div className="grid grid-cols-1 gap-3 pt-3">
                            
                            {/* Context & Technical Scope */}
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
                              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                {sub.starDetails.situation}
                              </p>
                              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium pt-2 border-t border-slate-200 dark:border-slate-800/60">
                                {sub.starDetails.task}
                              </p>
                            </div>

                            {/* Core Actions & Deliverables */}
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
                              <span className="text-[11px] font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400 tracking-wider flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5" />
                                Key Engineering Deliverables:
                              </span>
                              <ul className="space-y-2 mt-1">
                                {sub.starDetails.action.map((act, aIdx) => (
                                  <li key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 mt-0.5 shrink-0" />
                                    <span>{act}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Quantified Impact */}
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1">
                              <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5" />
                                Quantified Production Impact:
                              </span>
                              <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                                {sub.starDetails.result}
                              </p>
                            </div>

                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
          </div>

        </div>

      </div>
    </section>
  );
}
