import React from 'react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import projectsData from '../../data/projects.json';

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <FolderGit2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base">
            Architected for real-world impact, production resilience, and algorithmic efficiency.
          </p>
        </div>

        {/* 2 Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between group transition-all"
            >
              {/* Clean Image Container (No Superimposed Overlays) */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950 border-b border-black/[0.06] dark:border-white/[0.08]">
                <picture>
                  <source srcSet={project.image} type="image/webp" />
                  <img
                    src={project.imageFallback || project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </picture>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-xs font-mono font-medium text-[#0071e3] dark:text-cyan-400 px-3 py-1 rounded-full bg-[#0071e3]/10 dark:bg-cyan-950/40 border border-[#0071e3]/20 dark:border-cyan-500/30">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#0071e3] dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a1a1a6] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics Pills */}
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

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-black/[0.05] dark:border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-slate-800 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:text-slate-200 border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium font-mono flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium font-mono flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Platform</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
