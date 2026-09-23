import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Moon, Sun, Bug, ShieldCheck } from 'lucide-react';
import SignatureLogo from './SignatureLogo';
import profileData from '../../data/profile.json';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveringTheme, setHoveringTheme] = useState(false);
  const [themeToast, setThemeToast] = useState({ show: false, message: '', type: 'bug' });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleToggleTheme = () => {
    if (darkMode) {
      // Switching to Light Mode
      setDarkMode(false);
      setThemeToast({
        show: true,
        type: 'bug',
        title: '⚠️ Bug Alert Triggered!',
        message: 'Programmers Like Dark Mode, Light Attracts Bugs! 🪲 (Switching to Light Mode...)'
      });
    } else {
      // Switching back to Dark Mode
      setDarkMode(true);
      setThemeToast({
        show: true,
        type: 'safe',
        title: '🕶️ Darkness Restored',
        message: 'Bugs repelled. Retinas saved. Dark mode back in action!'
      });
    }

    setTimeout(() => {
      setThemeToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <>
      {/* Floating Gen Z Theme Toast / Pop-up */}
      {themeToast.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-lg w-11/12 animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto">
          <div className={`p-4 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-start gap-3.5 ${
            themeToast.type === 'bug'
              ? 'bg-white/95 dark:bg-slate-900/95 border-amber-300 dark:border-amber-500/60 shadow-amber-500/10'
              : 'bg-white/95 dark:bg-slate-900/95 border-cyan-300 dark:border-cyan-500/60 shadow-cyan-500/10'
          }`}>
            <span className="text-2xl shrink-0 mt-0.5">
              {themeToast.type === 'bug' ? '🪲' : '🕶️'}
            </span>
            <div className="flex-1 space-y-1">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                {themeToast.title}
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-snug font-medium">
                {themeToast.message}
              </p>
            </div>
            <button
              onClick={() => setThemeToast({ ...themeToast, show: false })}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? darkMode
            ? 'bg-black/75 apple-glass-nav border-b border-white/[0.08] shadow-lg shadow-black/40 py-3'
            : 'bg-[#fbfbfd]/80 apple-glass-nav border-b border-black/[0.06] shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo / Brand Signature */}
            <a href="#" className="flex items-center">
              <SignatureLogo />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-medium tracking-tight transition-colors py-1 ${
                    darkMode
                      ? 'text-[#86868b] hover:text-[#f5f5f7]'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Status indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                <span>{profileData.status.badge}</span>
              </div>

              {/* Apple System Blue Resume Button */}
              <a
                href={profileData.contact.resumeUrl || "./resume.pdf"}
                download="Dhruva_Bhattacharya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white active:scale-95 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              {/* Theme Toggle with Gen Z Hover Tooltip */}
              <div className="relative">
                <button
                  onClick={handleToggleTheme}
                  onMouseEnter={() => setHoveringTheme(true)}
                  onMouseLeave={() => setHoveringTheme(false)}
                  className={`p-2 rounded-full transition-all relative ${
                    darkMode
                      ? 'bg-white/[0.08] text-amber-300 hover:text-amber-200 border border-white/10'
                      : 'bg-black/[0.05] text-indigo-600 hover:text-indigo-800 border border-black/5'
                  }`}
                  aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  title="Toggle Light/Dark Theme"
                >
                  {darkMode ? <Sun className="w-4 h-4 transition-transform hover:rotate-45" /> : <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />}
                </button>

                {/* Gen Z Witty Hover Tooltip when trying to turn on Light Mode */}
                {hoveringTheme && (
                  <div className="absolute top-full right-0 mt-3 w-72 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-amber-500/50 shadow-2xl shadow-slate-900/10 dark:shadow-amber-500/15 z-50 animate-in fade-in zoom-in-95 duration-200 pointer-events-none text-left">
                    {darkMode ? (
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0 animate-bounce">🪲</span>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-amber-600 dark:text-amber-300 leading-tight">
                            Programmers Like Dark Mode Light Attracts Bugs
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                            Real devs don't burn their retinas 🕶️ Click if you dare face the bugs!
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🕶️</span>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-indigo-700 dark:text-cyan-300 leading-tight">
                            Ready to return to the Dark Side?
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                            Zero bugs. Maximum focus. Click to restore peace.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu & Theme toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleToggleTheme}
                className={`p-2 rounded-full border transition-colors ${
                  darkMode
                    ? 'bg-white/[0.08] text-amber-300 border-white/10'
                    : 'bg-black/[0.05] text-indigo-600 border-black/5'
                }`}
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-full border transition-colors ${
                  darkMode ? 'bg-white/[0.08] text-[#f5f5f7] border-white/10' : 'bg-black/[0.05] text-[#1d1d1f] border-black/5'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-3 pb-6 mt-3 space-y-3 border-b backdrop-blur-2xl ${
            darkMode ? 'bg-black/90 border-white/[0.08]' : 'bg-[#fbfbfd]/90 border-black/[0.06] shadow-xl'
          }`}>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <span>{profileData.status.badge}</span>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                    darkMode
                      ? 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.06]'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a
              href="./resume.pdf"
              download="Dhruva_Bhattacharya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm shadow-sm transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
