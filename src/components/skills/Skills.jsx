import React from 'react';
import { Cpu, Server, Database, Cloud, Code2, Sparkles, CheckCircle } from 'lucide-react';
import skillsData from '../../data/skills.json';

const iconMap = {
  Code2: Code2,
  Server: Server,
  Database: Database,
  Cpu: Cpu,
  Cloud: Cloud
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <Cpu className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Architectural Proficiencies
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base">
            Core stack optimized for high-concurrency enterprise backends and generative AI agent pipelines.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, idx) => {
            const Icon = iconMap[category.icon] || Code2;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 sm:p-7 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
                      {category.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                          skill.highlight
                            ? 'bg-black/[0.03] border-black/[0.1] text-slate-900 dark:bg-white/[0.08] dark:border-white/[0.16] dark:text-white shadow-xs'
                            : 'bg-black/[0.01] dark:bg-white/[0.03] border-black/[0.04] dark:border-white/[0.06] text-slate-700 dark:text-[#a1a1a6]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] dark:bg-cyan-400"></span>
                          )}
                          <span className="text-xs font-medium">{skill.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                          skill.level === 'Advanced'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : skill.level === 'Proficient'
                            ? 'bg-[#0071e3]/10 text-[#0071e3] dark:text-cyan-400 border border-[#0071e3]/20'
                            : 'bg-black/[0.04] text-slate-600 dark:bg-white/[0.06] dark:text-[#86868b]'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
