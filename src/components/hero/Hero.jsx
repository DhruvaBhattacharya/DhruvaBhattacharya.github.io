import React, { useState } from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Terminal, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import KernelConsole from './KernelConsole';
import CodingTypewriter from './CodingTypewriter';
import profileData from '../../data/profile.json';

export default function Hero() {
  const [showConsole, setShowConsole] = useState(false);

  return (
    <section id="about" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-pattern transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bio & Clean Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                Backend Software Engineer • Distributed Systems & AI
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-[#0071e3] dark:from-white dark:via-zinc-200 dark:to-cyan-400 bg-clip-text text-transparent">
                  {profileData.name}
                </span>
              </h1>
              <div className="pt-1">
                <CodingTypewriter />
              </div>
            </div>

            {/* Minimalistic, High-Signal Summary */}
            <p className="text-slate-600 dark:text-[#a1a1a6] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I build backend architectures that are engineered to scale under mission-critical workloads. Specializing in <span className="font-semibold text-slate-900 dark:text-slate-100">Java/Spring Boot microservices</span>, distributed caching with <span className="font-semibold text-slate-900 dark:text-slate-100">Redis</span>, and autonomous <span className="font-semibold text-slate-900 dark:text-slate-100">Generative AI/RAG agents</span>. Recognized as <span className="font-semibold text-amber-600 dark:text-amber-400">Asia Rank #1 (Alibaba Cloud Contest 2022)</span> with <span className="font-semibold text-amber-600 dark:text-amber-400">900+ LeetCode DSA</span> problems mastered.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#experience"
                className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>View Journey</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="./resume.pdf"
                download="Dhruva_Bhattacharya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-black/[0.05] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-900 dark:text-slate-100 border border-black/[0.08] dark:border-white/[0.1] font-medium text-sm transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#0071e3] dark:text-cyan-400" />
                <span>Resume (PDF)</span>
              </a>

              <button
                onClick={() => setShowConsole(!showConsole)}
                className={`px-4 py-2.5 rounded-full font-mono text-xs flex items-center gap-2 transition-all active:scale-[0.98] ${
                  showConsole
                    ? 'bg-[#0071e3]/15 text-[#0071e3] dark:text-cyan-300 border border-[#0071e3]/40 font-semibold'
                    : 'bg-black/[0.05] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-300 border border-black/[0.08] dark:border-white/[0.1]'
                }`}
                title="Toggle macOS Terminal (whoami)"
              >
                <Terminal className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                <span>{showConsole ? 'Show Photo' : 'Terminal'}</span>
              </button>

              <a
                href="#contact"
                className="px-4 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>

            {/* Minimalist Profile Links */}
            <div className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-3">
              {profileData.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all inline-flex items-center gap-1.5 active:scale-95 shadow-xs"
                >
                  <span>{soc.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Single Professional Image (Coding Dhruva Only) */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            {showConsole ? (
              <KernelConsole onClose={() => setShowConsole(false)} />
            ) : (
              <div className="relative group w-[280px] xs:w-72 sm:w-80 h-[400px] xs:h-[440px] sm:h-[470px]">
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-1 bg-gradient-to-b from-[#0071e3]/20 to-cyan-500/10 rounded-[32px] blur-xl opacity-70 group-hover:opacity-95 transition duration-500"></div>
                
                {/* Card Container */}
                <div className="relative w-full h-full rounded-3xl bg-slate-900 border border-black/[0.08] dark:border-white/[0.14] overflow-hidden shadow-2xl flex flex-col">
                  <picture>
                    <source srcSet="./images/coding-dhruva.webp" type="image/webp" />
                    <img
                      src="./images/coding-dhruva.jpeg"
                      alt="Dhruva Bhattacharya - Coding"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      style={{ objectPosition: 'center 18%' }}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </picture>

                  {/* Clean Bottom Overlay Pill */}
                  <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] flex items-center justify-between shadow-lg">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-medium">
                        <Code2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                        Backend & Systems
                      </span>
                      <span className="block text-[10px] font-mono text-[#0071e3] dark:text-cyan-400 font-semibold">
                        Java • Spring Boot • Microservices • RAG
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase font-semibold">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
          {profileData.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 text-center sm:text-left border border-black/[0.06] dark:border-white/[0.08]"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0071e3] dark:text-cyan-400">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {metric.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-[#86868b] mt-0.5">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
