import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Sparkles, Terminal, Code2, Cpu, CheckCircle2, MapPin } from 'lucide-react';
import KernelConsole from './KernelConsole';
import profileData from '../../data/profile.json';

const photos = [
  {
    id: 'prof2',
    label: 'Enterprise SDE',
    icon: '👔',
    tag: 'TCS Telecom Core & Microsoft ESS',
    src: './images/professional-2-portrait.webp',
    objectPosition: 'center 10%'
  },
  {
    id: 'coding',
    label: 'Systems & Backend',
    icon: '💻',
    tag: 'Distributed Systems & Microservices',
    src: './images/coding-dhruva.webp',
    objectPosition: 'center 18%'
  },
  {
    id: 'prof1',
    label: 'AI & Architecture',
    icon: '🎯',
    tag: 'Production RAG & GenAI Pipelines',
    src: './images/professional-1.webp',
    objectPosition: 'center 15%'
  },
  {
    id: 'casual',
    label: 'Problem Solving',
    icon: '🕶️',
    tag: '900+ DSA & Algorithmic Design',
    src: './images/casual-dhruva.webp',
    objectPosition: 'center 12%'
  }
];

export default function Hero() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [heroTab, setHeroTab] = useState('photo'); // Defaults to Visual Profile first
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || heroTab !== 'photo') return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3500); // Automatically rotates every 3.5s

    return () => clearInterval(timer);
  }, [isHovered, heroTab]);

  const activePhoto = photos[activePhotoIndex];

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bio & Headline (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                Targeting Product-Based SDE / Backend & AI Engineering Roles
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Hi, I'm <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-[#0071e3] dark:from-white dark:via-zinc-200 dark:to-cyan-400 bg-clip-text text-transparent">{profileData.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-[#86868b] tracking-tight">
                {profileData.title}
              </p>
            </div>

            {/* Professional Recruiter-Optimized Summary */}
            {heroTab === 'photo' && (
              <p className="text-slate-600 dark:text-[#a1a1a6] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in duration-300">
                <span className="font-semibold text-slate-900 dark:text-white">Backend Software Engineer</span> architecting high-scale <span className="text-slate-900 dark:text-slate-200 font-medium">Java/Spring Boot microservices</span> and enterprise <span className="text-slate-900 dark:text-slate-200 font-medium">Generative AI/RAG agent systems</span> for global platforms. Slashed API latency by <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">85%</span> and boosted throughput by <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">+40%</span> in telecom OSS/BSS, backed by <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">900+ LeetCode</span> problems and <span className="font-semibold text-amber-600 dark:text-amber-400">Rank 1 in Asia (Alibaba Cloud Low Code Development Contest 2022)</span>. <span className="font-semibold text-[#0071e3] dark:text-cyan-400">Targeting Product-Based SDE / Backend & AI Engineering Roles.</span>
              </p>
            )}

            {/* Professional High-Signal Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-mono">
              {profileData.highlights?.map((h) => (
                <span
                  key={h.id}
                  className="px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 border border-black/[0.06] dark:border-white/[0.08] flex items-center gap-1.5 font-medium shadow-xs hover:border-black/20 dark:hover:border-white/20 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400 shrink-0" />
                  <span>{h.label}</span>
                </span>
              ))}
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5 font-medium shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Open to {profileData.contact.preferredLocations.join(', ')}</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#experience"
                className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>View Work</span>
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
                onClick={() => setHeroTab(heroTab === 'console' ? 'photo' : 'console')}
                className={`px-4 py-2.5 rounded-full font-mono text-xs flex items-center gap-2 transition-all active:scale-[0.98] ${
                  heroTab === 'console'
                    ? 'bg-[#0071e3]/15 text-[#0071e3] dark:text-cyan-300 border border-[#0071e3]/40 font-semibold'
                    : 'bg-black/[0.05] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-300 border border-black/[0.08] dark:border-white/[0.1]'
                }`}
                title="Toggle macOS Terminal (whoami)"
              >
                <Terminal className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                <span>{heroTab === 'console' ? 'Show Photo Profile' : 'Terminal (whoami)'}</span>
              </button>

              <a
                href="#contact"
                className="px-4 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>

            {/* Profiles Ribbon: LeetCode, GFG, GitHub, LinkedIn */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-3">
              {profileData.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95"
                >
                  <span>{soc.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Switchable Linux Kernel Console & Multi-Photo Showcase (5 cols) */}
          <div 
            className="lg:col-span-5 flex flex-col items-center w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* View Mode Toggle: Visual Profile vs macOS Terminal */}
            <div className="apple-segmented-container mb-4">
              <button
                onClick={() => setHeroTab('photo')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  heroTab === 'photo'
                    ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>📸</span>
                <span>Visual Profile</span>
              </button>

              <button
                onClick={() => setHeroTab('console')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  heroTab === 'console'
                    ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>macOS Terminal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            </div>

            {heroTab === 'console' ? (
              <KernelConsole onClose={() => setHeroTab('photo')} />
            ) : (
              <div className="flex flex-col items-center animate-in fade-in duration-300">
                {/* Photo Card with Apple Continuous Squircle */}
                <div className="relative group w-[280px] xs:w-72 sm:w-80 h-[430px] xs:h-[460px] sm:h-[500px]">
                  {/* Subtle Apple Ambient Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-[#0071e3]/20 to-indigo-500/10 rounded-[28px] blur-xl opacity-60 group-hover:opacity-90 transition duration-500"></div>
                  
                  {/* Image Frame */}
                  <div className="relative w-full h-full rounded-3xl bg-black border border-black/[0.08] dark:border-white/[0.12] overflow-hidden shadow-2xl flex flex-col">
                    <img
                      key={activePhoto.id}
                      src={activePhoto.src}
                      alt={`Dhruva Bhattacharya - ${activePhoto.label}`}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      style={{ objectPosition: activePhoto.objectPosition || 'center 15%' }}
                      className="w-full h-full object-cover transition-all duration-500 animate-in fade-in"
                    />

                    {/* Micro tech badge overlay */}
                    <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2.5 rounded-2xl bg-white/85 dark:bg-black/75 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.12] flex items-center justify-between shadow-lg">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-medium">
                          <Cpu className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                          {activePhoto.tag}
                        </span>
                        <span className="block text-[10px] font-mono text-[#0071e3] dark:text-cyan-400 font-semibold">
                          Java • Spring Boot • RAG • Redis • Azure
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Photo Persona Switcher Controls */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-full p-1 bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl sm:rounded-full">
                  {photos.map((photo, idx) => {
                    const isSelected = activePhotoIndex === idx;
                    return (
                      <button
                        key={photo.id}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 ${
                          isSelected
                            ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm font-semibold'
                            : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span>{photo.icon}</span>
                        <span>{photo.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Subtle Progress Dots */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activePhotoIndex === idx
                          ? 'w-5 bg-[#0071e3] dark:bg-white'
                          : 'w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
          {profileData.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-5 text-center sm:text-left"
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
