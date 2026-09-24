import React from 'react';
import { ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import projectsData from '../../data/projects.json';

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Projects Grid: 3 Verified Production Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-3xl p-5 sm:p-7 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08] relative group transition-all"
            >
              <div className="space-y-4">
                {/* Category & Production Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08]">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full font-medium">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#0071e3] dark:group-hover:text-cyan-400 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a1a1a6] leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Highlight Pills */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.metrics.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-slate-600 dark:text-[#86868b] border border-black/[0.05] dark:border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-5 mt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[130px] py-2 px-3.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-slate-800 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:text-slate-200 border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium font-mono flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                ) : (
                  <div />
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium font-mono flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 shrink-0"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
