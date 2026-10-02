import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Server, Database, Cloud, Code2, Sparkles, Layers } from 'lucide-react';
import skillsData from '../../data/skills.json';
import ParallaxCard from '../common/ParallaxCard';
import UmlArrow from '../common/UmlArrow';

const iconMap = {
  Code2: Code2,
  Server: Server,
  Database: Database,
  Cpu: Cpu,
  Cloud: Cloud
};

const pipelineNodes = [
  {
    id: 'Languages & Core Systems',
    label: 'Languages & Core Systems',
    shortLabel: 'Languages & Core',
    connectorLabel: 'Compiled / OOP',
    icon: Code2
  },
  {
    id: 'Backend Engineering & Microservices',
    label: 'Backend Engineering & Microservices',
    shortLabel: 'Backend & Services',
    connectorLabel: 'REST / RPC',
    icon: Server
  },
  {
    id: 'Databases & High-Throughput Storage',
    label: 'Databases & High-Throughput Storage',
    shortLabel: 'Databases & Cache',
    connectorLabel: 'ACID / Memory',
    icon: Database
  },
  {
    id: 'AI, Generative AI & Agentic Systems',
    label: 'AI, Generative AI & Agentic Systems',
    shortLabel: 'GenAI & Agents',
    connectorLabel: 'RAG / LLM',
    icon: Cpu
  },
  {
    id: 'Cloud, DevOps & Observability',
    label: 'Cloud, DevOps & Observability',
    shortLabel: 'Cloud & DevOps',
    connectorLabel: 'K8s / CI-CD',
    icon: Cloud
  }
];

export default function Skills() {
  const [activeNode, setActiveNode] = useState(null);
  const [completedStep, setCompletedStep] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const flowContainerRef = useRef(null);

  // Logical Architecture Flow Order: Languages -> Backend -> Databases -> AI -> Cloud
  const orderedCategories = [
    skillsData.find(c => c.category.includes('Languages')) || skillsData[3],
    skillsData.find(c => c.category.includes('Backend')) || skillsData[1],
    skillsData.find(c => c.category.includes('Databases')) || skillsData[2],
    skillsData.find(c => c.category.includes('AI')) || skillsData[0],
    skillsData.find(c => c.category.includes('Cloud')) || skillsData[4]
  ].filter(Boolean);

  // Scroll-triggered automatic sequential arrow completion
  useEffect(() => {
    const handleScrollOrIntersect = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When section is in view
      if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.2) {
        if (!hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const interval = setInterval(() => {
            current += 1;
            setCompletedStep(current);
            if (current >= pipelineNodes.length) {
              clearInterval(interval);
            }
          }, 350);
        }
      }
    };

    window.addEventListener('scroll', handleScrollOrIntersect, { passive: true });
    handleScrollOrIntersect();

    return () => window.removeEventListener('scroll', handleScrollOrIntersect);
  }, [hasAnimated]);

  const handleNodeClick = (nodeId) => {
    setActiveNode(prev => (prev === nodeId ? null : nodeId));
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0071e3]/10 dark:bg-cyan-950/40 border border-[#0071e3]/20 dark:border-cyan-500/30 text-[#0071e3] dark:text-cyan-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>Architectural Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Architectural Proficiencies
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base max-w-2xl mx-auto">
            From low-level systems programming to distributed microservices and production GenAI pipelines.
          </p>
        </div>

        {/* Sequential Architecture Pipeline Bar */}
        <div className="mb-14">
          <div className="flex items-center justify-between pb-3 px-1">
            <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0071e3] dark:bg-cyan-400 animate-pulse"></span>
              SYSTEM ARCHITECTURE ROADMAP
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              {completedStep >= pipelineNodes.length ? 'PIPELINE CONNECTED: 100%' : `LINKING STAGES: ${completedStep}/${pipelineNodes.length}`}
            </span>
          </div>

          <div
            ref={flowContainerRef}
            className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          >
            <div className="flex items-center justify-between min-w-[920px] p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
              {pipelineNodes.map((node, i) => {
                const isCurrentActive = activeNode === node.id;
                const isStepCompleted = completedStep > i;

                return (
                  <React.Fragment key={node.id}>
                    {/* Architectural Node */}
                    <button
                      type="button"
                      onClick={() => handleNodeClick(node.id)}
                      className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-left text-xs font-medium transition-all duration-300 relative ${
                        isCurrentActive
                          ? 'bg-[#0071e3] text-white border-[#0071e3] shadow-md shadow-[#0071e3]/25 scale-105 z-10'
                          : isStepCompleted
                          ? 'bg-white dark:bg-slate-900 border-[#0071e3]/40 dark:border-cyan-500/40 text-slate-900 dark:text-white shadow-2xs hover:border-[#0071e3]'
                          : 'bg-white/60 dark:bg-slate-900/60 border-black/[0.08] dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:border-black/20'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                          isCurrentActive
                            ? 'bg-white shadow-[0_0_8px_#ffffff]'
                            : isStepCompleted
                            ? 'bg-[#0071e3] dark:bg-cyan-400 shadow-[0_0_6px_#38bdf8]'
                            : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                      
                      <span className="font-semibold truncate max-w-[200px]">
                        {node.label}
                      </span>
                    </button>

                    {/* Animated Arrow Connector */}
                    {i < pipelineNodes.length - 1 && (
                      <UmlArrow
                        isCompleted={completedStep > i}
                        isActive={completedStep === i + 1}
                        label={node.connectorLabel}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D Parallax Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {orderedCategories.map((category, idx) => {
            const Icon = iconMap[category.icon] || Code2;
            const isHighlightedNode = activeNode === category.category;

            return (
              <ParallaxCard
                key={idx}
                maxTilt={6}
                scale={1.015}
                glareColor="rgba(0, 113, 227, 0.14)"
                className={`glass-card rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between group cursor-default ${
                  isHighlightedNode
                    ? 'border-[#0071e3] dark:border-cyan-400 shadow-xl ring-2 ring-[#0071e3]/30 dark:ring-cyan-400/30'
                    : 'border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <div>
                  {/* Category Title & Icon */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="w-11 h-11 rounded-2xl bg-[#0071e3]/10 dark:bg-cyan-950/40 border border-[#0071e3]/20 dark:border-cyan-500/30 flex items-center justify-center text-[#0071e3] dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
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
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
                          skill.highlight
                            ? 'bg-black/[0.025] dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.12] text-slate-900 dark:text-white shadow-2xs font-medium'
                            : 'bg-transparent border-transparent text-slate-600 dark:text-[#a1a1a6] hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
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
