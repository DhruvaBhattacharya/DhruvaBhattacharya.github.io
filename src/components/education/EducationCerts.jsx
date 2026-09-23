import React from 'react';
import { Award, GraduationCap, Trophy, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import certsData from '../../data/certifications.json';

export default function EducationCerts() {
  return (
    <section id="achievements" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Honors & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education, Certifications & Awards
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base">
            Verified academic milestones, global competition honors, and certified credentials.
          </p>
        </div>

        {/* Top Split: Education (Left) & Key Honors (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Education Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-7 border border-black/[0.06] dark:border-white/[0.08] h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">Formal Education</h3>
                    <span className="text-xs font-mono font-semibold text-[#0071e3] dark:text-cyan-400">Bachelor of Technology</span>
                  </div>
                </div>

                {certsData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-semibold text-[#0071e3] dark:text-cyan-400">
                      {edu.specialization}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-[#86868b]">
                      {edu.institution} • <span className="font-mono text-slate-500 dark:text-slate-400">{edu.period}</span>
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                      {edu.score}
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
            </div>
          </div>

          {/* Key Achievements Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2 tracking-tight">
              <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Key Competition Wins & Milestones</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {certsData.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.08] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        {ach.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{ach.year}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">{ach.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-[#a1a1a6] leading-relaxed">{ach.description}</p>
                    <p className="text-[11px] font-mono font-semibold text-[#0071e3] dark:text-cyan-400">{ach.organization}</p>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-black/[0.04] text-amber-600 border border-black/[0.06] dark:bg-white/[0.08] dark:text-amber-400 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications Ribbon */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0071e3] dark:text-cyan-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Professional Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certsData.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-semibold text-[#0071e3] dark:text-cyan-400 uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    {cert.name}
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verified Credential
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
