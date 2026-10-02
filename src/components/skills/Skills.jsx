import React from 'react';
import { Cpu, Server, Database, Cloud, Code2, Sparkles, Layers } from 'lucide-react';
import skillsData from '../../data/skills.json';
import ParallaxCard from '../common/ParallaxCard';
import HandwrittenSectionNote from '../common/HandwrittenSectionNote';

const iconMap = {
  Code2: Code2,
  Server: Server,
  Database: Database,
  Cpu: Cpu,
  Cloud: Cloud
};

export default function Skills() {
  // Logical Architecture Flow Order: Languages -> Backend -> Databases -> AI -> Cloud
  const orderedCategories = [
    skillsData.find(c => c.category.includes('Languages')) || skillsData[3],
    skillsData.find(c => c.category.includes('Backend')) || skillsData[1],
    skillsData.find(c => c.category.includes('Databases')) || skillsData[2],
    skillsData.find(c => c.category.includes('AI')) || skillsData[0],
    skillsData.find(c => c.category.includes('Cloud')) || skillsData[4]
  ].filter(Boolean);

  return (
    <section id="skills" className="py-24 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 relative">
          <HandwrittenSectionNote
            text="My Skills :)"
            className="-top-11 sm:-top-14 left-2 sm:-left-12 md:-left-20 lg:-left-24"
          />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0071e3]/10 dark:bg-cyan-950/40 border border-[#0071e3]/20 dark:border-cyan-500/30 text-[#0071e3] dark:text-cyan-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Architectural Proficiencies
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base max-w-2xl mx-auto">
            From low-level systems programming to distributed microservices and production GenAI pipelines.
          </p>
        </div>

        {/* 3D Parallax Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {orderedCategories.map((category, idx) => {
            const Icon = iconMap[category.icon] || Code2;

            return (
              <ParallaxCard
                key={idx}
                maxTilt={6}
                scale={1.015}
                glareColor="rgba(0, 113, 227, 0.14)"
                className="glass-card rounded-3xl p-6 sm:p-7 border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between group cursor-default shadow-xs hover:shadow-lg"
              >
                <div>
                  {/* Category Title & Icon */}
                  <div className="flex items-center gap-3.5 pb-4 mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 dark:bg-cyan-950/40 border border-[#0071e3]/20 dark:border-cyan-500/30 flex items-center justify-center text-[#0071e3] dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight leading-snug">
                        {category.category}
                      </h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
                          skill.highlight
                            ? 'bg-black/[0.025] dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.12] text-slate-900 dark:text-white shadow-2xs font-medium'
                            : 'bg-transparent border-transparent text-slate-600 dark:text-[#a1a1a6] hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {skill.highlight ? (
                            <span className="w-2 h-2 rounded-full bg-[#0071e3] dark:bg-cyan-400 shrink-0 shadow-[0_0_6px_#38bdf8]"></span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0"></span>
                          )}
                          <span className="text-xs sm:text-[13px] truncate">{skill.name}</span>
                        </div>

                        {skill.highlight && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold bg-[#0071e3]/10 text-[#0071e3] dark:text-cyan-300 border border-[#0071e3]/20 shrink-0 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                            Core
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ParallaxCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
