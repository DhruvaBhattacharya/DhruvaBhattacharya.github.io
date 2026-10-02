import React, { useState } from 'react';
import { Cpu, Server, Database, Cloud, Code2, ArrowRight } from 'lucide-react';
import skillsData from '../../data/skills.json';

const iconMap = {
  Code2: Code2,
  Server: Server,
  Database: Database,
  Cpu: Cpu,
  Cloud: Cloud
};

const nodeFlow = [
  { id: 'Languages & Core Systems', label: '01. Core Systems', next: 'Backend' },
  { id: 'Backend Engineering & Microservices', label: '02. Microservices', next: 'Storage' },
  { id: 'Databases & High-Throughput Storage', label: '03. Storage Layer', next: 'GenAI' },
  { id: 'AI, Generative AI & Agentic Systems', label: '04. GenAI & Agents', next: 'DevOps' },
  { id: 'Cloud, DevOps & Observability', label: '05. Cloud & Ops', next: 'Production' }
];

export default function Skills() {
  const [activeNode, setActiveNode] = useState(null);

  // Order categories logically: Core -> Backend -> Database -> AI -> Cloud
  const orderedCategories = [
    skillsData.find(c => c.category.includes('Languages')) || skillsData[3],
    skillsData.find(c => c.category.includes('Backend')) || skillsData[1],
    skillsData.find(c => c.category.includes('Databases')) || skillsData[2],
    skillsData.find(c => c.category.includes('AI')) || skillsData[0],
    skillsData.find(c => c.category.includes('Cloud')) || skillsData[4]
  ].filter(Boolean);

  return (
    <section id="skills" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <Cpu className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Architectural Proficiencies
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base">
            Structured architectural roadmap — from low-level systems programming to distributed microservices and production GenAI pipelines.
          </p>
        </div>

        {/* System Architecture Flow Bar */}
        <div className="hidden lg:flex items-center justify-between max-w-5xl mx-auto mb-12 p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] font-mono text-xs shadow-xs">
          {nodeFlow.map((node, i) => (
            <React.Fragment key={node.label}>
              <div
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                  activeNode === node.id
                    ? 'bg-[#0071e3]/10 border-[#0071e3] text-[#0071e3] dark:text-cyan-300 font-bold'
                    : 'bg-white dark:bg-slate-900 border-black/[0.08] dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-black/30 dark:hover:border-white/30'
                }`}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              >
                <span className="w-2 h-2 rounded-full bg-[#0071e3] dark:bg-cyan-400"></span>
                <span>{node.label}</span>
              </div>
              {i < nodeFlow.length - 1 && (
                <div className="flex items-center text-slate-400 dark:text-slate-600">
                  <span className="w-6 h-0.5 bg-slate-300 dark:bg-slate-700"></span>
                  <ArrowRight className="w-3.5 h-3.5 -ml-1 text-slate-400 dark:text-slate-500" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {orderedCategories.map((category, idx) => {
            const Icon = iconMap[category.icon] || Code2;
            const isHighlightedNode = activeNode === category.category;

            return (
              <div
                key={idx}
                className={`glass-card rounded-3xl p-6 border transition-all flex flex-col justify-between relative group ${
                  isHighlightedNode
                    ? 'border-[#0071e3] dark:border-cyan-400 shadow-lg ring-1 ring-[#0071e3]/30'
                    : 'border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <div>
                  {/* Category Title */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-cyan-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight leading-snug">
                      {category.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-all ${
                          skill.highlight
                            ? 'bg-black/[0.025] dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.12] text-slate-900 dark:text-white shadow-2xs font-medium'
                            : 'bg-transparent border-transparent text-slate-600 dark:text-[#a1a1a6]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {skill.highlight ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] dark:bg-cyan-400 shrink-0 shadow-xs"></span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0"></span>
                          )}
                          <span className="text-xs truncate">{skill.name}</span>
                        </div>

                        {skill.highlight && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold bg-[#0071e3]/10 text-[#0071e3] dark:text-cyan-300 border border-[#0071e3]/20 shrink-0">
                            Core
                          </span>
                        )}
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
