import React, { useState, useEffect } from 'react';
import { Eye, UserCheck, Shield, Laptop, Monitor, Smartphone, Sparkles, Check, X, Database, Download } from 'lucide-react';

export default function VisitorTracker() {
  const [visitorData, setVisitorData] = useState(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Recruiter / Hiring Manager');
  const [showPrompt, setShowPrompt] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [allLogs, setAllLogs] = useState([]);
  const [hasPassed10Seconds, setHasPassed10Seconds] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem('dhruva_visitor_prompt_dismissed') === 'true';
  });

  // Detect browser, OS, screen resolution, aspect ratio
  const detectClientInfo = () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown Browser';
    let os = 'Unknown OS';

    // Browser Detection
    if (ua.includes('Firefox/')) {
      browser = `Firefox ${ua.split('Firefox/')[1]?.split(' ')[0] || ''}`;
    } else if (ua.includes('Edg/')) {
      browser = `Edge ${ua.split('Edg/')[1]?.split(' ')[0] || ''}`;
    } else if (ua.includes('Chrome/')) {
      browser = `Chrome ${ua.split('Chrome/')[1]?.split(' ')[0] || ''}`;
    } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
      browser = `Safari ${ua.split('Version/')[1]?.split(' ')[0] || ''}`;
    } else if (ua.includes('OPR/') || ua.includes('Opera/')) {
      browser = 'Opera';
    }

    // OS Detection
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Linux')) os = 'Linux';

    // Screen Dimensions & Aspect Ratio Calculation
    const width = window.screen.width;
    const height = window.screen.height;
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const rGcd = gcd(width, height);
    const aspectW = Math.round(width / rGcd);
    const aspectH = Math.round(height / rGcd);
    const aspectRatio = `${aspectW}:${aspectH}`;

    // Device Type
    let deviceType = 'Desktop';
    if (/Mobi|Android/i.test(ua)) deviceType = 'Mobile';
    if (/iPad|Tablet/i.test(ua)) deviceType = 'Tablet';

    return {
      browser: browser.trim(),
      os,
      deviceType,
      screenResolution: `${width}x${height}`,
      aspectRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      language: navigator.language || 'en',
      platform: navigator.platform || 'unknown',
      referrer: document.referrer || 'Direct Visit'
    };
  };

  // Sends visitor intelligence directly to Dhruva via mail (FormSubmit AJAX relay)
  const sendVisitorEmail = async (record, isCheckIn = false) => {
    try {
      const emailEndpoint = import.meta.env.VITE_VISITOR_EMAIL_ENDPOINT || 'https://formsubmit.co/ajax/dhruvabhattacharya130102@gmail.com';
      
      const clean = (val, max = 80) => String(val || '').replace(/<[^>]*>?/gm, '').replace(/[<>"'`\r\n\t]/g, ' ').trim().slice(0, max);

      const safeName = clean(record.name, 60) || 'Anonymous Visitor';
      const safeCompany = clean(record.company, 60) || 'Not Specified';
      const safeRole = clean(record.role, 60) || (isCheckIn ? 'Recruiter / Hiring Manager' : 'General Visitor');

      const payload = {
        _subject: isCheckIn
          ? `🎯 Recruiter Check-In: ${safeName} (${safeCompany}) visited Portfolio 2.0`
          : `👀 New Visitor Alert: ${clean(record.client?.browser, 40) || 'Browser'} on ${clean(record.client?.os, 30) || 'OS'} (${clean(record.client?.deviceType, 20) || 'Device'})`,
        _template: 'table',
        _captcha: 'false',
        'Visitor Name': safeName,
        'Company / Org': safeCompany,
        'Role / Intent': safeRole,
        'Browser & Version': clean(record.client?.browser, 50) || 'Unknown',
        'Operating System': clean(record.client?.os, 30) || 'Unknown',
        'Device Type': clean(record.client?.deviceType, 20) || 'Desktop',
        'Screen Resolution': clean(record.client?.screenResolution, 30) || 'Unknown',
        'Screen Aspect Ratio': clean(record.client?.aspectRatio, 20) || 'Unknown',
        'Timezone': clean(record.client?.timezone, 40) || 'Unknown',
        'Visit Count': Number(record.visitCount) || 1,
        'Timestamp': clean(record.displayTime, 40) || new Date().toLocaleString(),
        'Referrer': clean(record.client?.referrer, 100) || 'Direct Visit'
      };

      await fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // Silent failover ensures visitor browsing experience is never interrupted
    }
  };

  // Remote telemetry dispatcher: sends visitor record to Dhruva via webhook if configured
  const dispatchVisitorTelemetry = (record) => {
    const webhookUrl = import.meta.env.VITE_VISITOR_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
      const payload = {
        type: 'portfolio_visitor_checkin',
        visitorName: record.name,
        company: record.company,
        role: record.role,
        browser: record.client?.browser,
        os: record.client?.os,
        deviceType: record.client?.deviceType,
        screenResolution: record.client?.screenResolution,
        aspectRatio: record.client?.aspectRatio,
        timezone: record.client?.timezone,
        referrer: record.client?.referrer,
        timestamp: record.timestamp,
        visitCount: record.visitCount
      };

      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(webhookUrl, blob);
      } else {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors'
        }).catch(() => {});
      }
    } catch (e) {
      // Silent failover ensures zero UI impact
    }
  };

  useEffect(() => {
    const client = detectClientInfo();
    const storedProfile = localStorage.getItem('dhruva_portfolio_visitor');
    const existingLogs = JSON.parse(localStorage.getItem('dhruva_visitor_ledger') || '[]');

    const visitCount = parseInt(localStorage.getItem('dhruva_visit_count') || '0', 10) + 1;
    localStorage.setItem('dhruva_visit_count', visitCount.toString());

    const isLinkedInReferrer = (client.referrer || '').toLowerCase().includes('linkedin');
    const isRecruiterIntent = Boolean(storedProfile || isLinkedInReferrer);

    const sessionRecord = {
      id: 'vis_' + Date.now(),
      timestamp: new Date().toISOString(),
      displayTime: new Date().toLocaleString(),
      client,
      visitCount,
      name: storedProfile ? JSON.parse(storedProfile).name : 'Anonymous Visitor',
      company: storedProfile ? JSON.parse(storedProfile).company : '',
      role: storedProfile ? JSON.parse(storedProfile).role : (isLinkedInReferrer ? 'LinkedIn Recruiter' : 'General Visitor'),
      category: isRecruiterIntent ? 'RECRUITER' : 'GENERAL',
      status: 'AUTO_ACCEPTED'
    };

    setVisitorData(sessionRecord);
    setAllLogs(existingLogs);

    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setName(parsed.name || '');
      setCompany(parsed.company || '');
      setRole(parsed.role || '');
      setCheckedIn(true);
    }

    // 10-second requirement timer: only after 10s can prompt be shown
    const timer10s = setTimeout(() => {
      setHasPassed10Seconds(true);
    }, 10000);

    // Send background visit email after 15 seconds of stay (indicates genuine human visitor)
    const emailTimer = setTimeout(() => {
      const alreadySent = sessionStorage.getItem('dhruva_visit_email_dispatched');
      if (!alreadySent) {
        sendVisitorEmail(sessionRecord, false);
        sessionStorage.setItem('dhruva_visit_email_dispatched', 'true');
      }
    }, 15000);

    // Scroll depth requirement listener: triggers when user reaches bottom of portfolio
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      // Triggers when user scrolls within 650px of the bottom (Contact / Footer section)
      if (scrollY + windowHeight >= docHeight - 650) {
        setIsNearBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Expose ledger helper & consolidated summary in browser console
    window.getPortfolioVisitors = () => {
      const logs = JSON.parse(localStorage.getItem('dhruva_visitor_ledger') || '[]');
      console.table(logs);
      return logs;
    };

    window.getPortfolioVisitorsSummary = () => {
      const logs = JSON.parse(localStorage.getItem('dhruva_visitor_ledger') || '[]');
      const total = logs.length;
      const recruiters = logs.filter(l => l.category === 'RECRUITER' || l.company);
      const casual = logs.filter(l => l.category !== 'RECRUITER' && !l.company);
      const companies = [...new Set(recruiters.map(r => r.company).filter(Boolean))];
      
      console.log('%c🎯 Dhruva Portfolio Visitor Intelligence Summary', 'color: #06b6d4; font-size: 14px; font-weight: bold;');
      console.log(`Total Tracked Visits: ${total}`);
      console.log(`Recruiters & Hiring Leads: ${recruiters.length} (${total ? Math.round((recruiters.length / total) * 100) : 0}%)`);
      console.log(`General / Casual Visitors: ${casual.length} (${total ? Math.round((casual.length / total) * 100) : 0}%)`);
      console.log(`Top Organizations:`, companies);
      console.log(`All Requests Status: AUTO-ACCEPTED (100%)`);
      console.table(logs);
      return { total, recruiters: recruiters.length, casual: casual.length, companies, logs };
    };

    // Keyboard shortcut (Ctrl + Shift + V) to open analytics ledger
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        setShowLedger(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer10s);
      clearTimeout(emailTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Show prompt ONLY when BOTH conditions are met:
  // 1) 10+ seconds have passed
  // 2) User has scrolled to the bottom of the portfolio
  useEffect(() => {
    if (hasPassed10Seconds && isNearBottom && !checkedIn && !dismissed) {
      setShowPrompt(true);
    }
  }, [hasPassed10Seconds, isNearBottom, checkedIn, dismissed]);

  const handleCheckIn = (e) => {
    if (e) e.preventDefault();
    const visitorName = name.replace(/[<>]/g, '').trim().slice(0, 80) || 'Recruiter Guest';
    const visitorCompany = company.replace(/[<>]/g, '').trim().slice(0, 80) || 'Hiring Organization';

    const profile = { name: visitorName, company: visitorCompany, role };
    localStorage.setItem('dhruva_portfolio_visitor', JSON.stringify(profile));

    const updatedRecord = {
      ...visitorData,
      name: visitorName,
      company: visitorCompany,
      role,
      category: 'RECRUITER',
      status: 'AUTO_ACCEPTED'
    };

    const currentLogs = JSON.parse(localStorage.getItem('dhruva_visitor_ledger') || '[]');
    const newLogs = [updatedRecord, ...currentLogs.slice(0, 49)];
    localStorage.setItem('dhruva_visitor_ledger', JSON.stringify(newLogs));

    // Send direct email notification to Dhruva
    sendVisitorEmail(updatedRecord, true);

    // Send notification to remote webhook if configured
    dispatchVisitorTelemetry(updatedRecord);

    setVisitorData(updatedRecord);
    setAllLogs(newLogs);
    setCheckedIn(true);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    sessionStorage.setItem('dhruva_visitor_prompt_dismissed', 'true');
    // Log as anonymous visitor
    if (!checkedIn && visitorData) {
      const currentLogs = JSON.parse(localStorage.getItem('dhruva_visitor_ledger') || '[]');
      const newLogs = [visitorData, ...currentLogs.slice(0, 49)];
      localStorage.setItem('dhruva_visitor_ledger', JSON.stringify(newLogs));
      setAllLogs(newLogs);
    }
  };

  const exportLogsAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dhruva_portfolio_visitors_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      {/* Floating Visitor Status & Quick Check-in Pill (Bottom Left) */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
        <button
          onClick={() => (checkedIn ? setShowLedger(true) : setShowPrompt(true))}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-lg hover:shadow-xl backdrop-blur-md text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group"
          title="Click to view visitor intelligence & check-in (Ctrl+Shift+V)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
          {checkedIn ? (
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Hi, {name}</span>
              {company && <span className="text-slate-500">({company})</span>}
            </span>
          ) : (
            <span className="font-medium">👋 Visiting? Check in</span>
          )}
          <span className="text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400">
            • {visitorData?.client?.browser?.split(' ')[0] || 'Browser'}
          </span>
        </button>
      </div>

      {/* Recruiter / Guestbook Check-In Modal Prompt */}
      {showPrompt && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 sm:p-6 pb-6 sm:pb-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1c1c1e] border border-black/[0.08] dark:border-white/[0.12] shadow-2xl p-6 sm:p-8 space-y-5 sm:space-y-6 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            <button
              onClick={handleDismiss}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <div className="flex items-center gap-3 sm:gap-3.5 pr-8">
              <div className="p-3 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] dark:text-cyan-400 shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                  Welcome to Dhruva's Portfolio
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-[#86868b] mt-0.5">
                  Reviewing candidate profile? Say hello!
                </p>
              </div>
            </div>

            {/* Auto-Accept Guarantee Banner */}
            <div className="px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-[13px] text-emerald-800 dark:text-emerald-300 font-mono flex items-start gap-2.5 sm:gap-3 leading-relaxed">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Auto-Accept Guarantee: All check-ins and meeting requests are instantly confirmed & priority acknowledged.</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a1a1a6] leading-relaxed">
              If you're visiting from a recruitment team or engineering org, leave your name so Dhruva knows who reviewed his work:
            </p>

            <form onSubmit={handleCheckIn} className="space-y-4 text-xs sm:text-sm font-mono">
              <div>
                <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-slate-900 dark:text-slate-100 focus:border-[#0071e3] dark:focus:border-cyan-400 focus:bg-white dark:focus:bg-black/50 focus:outline-none placeholder-slate-400 transition-colors"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1.5">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Google, Microsoft, Tech Startup"
                  maxLength={80}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-slate-900 dark:text-slate-100 focus:border-[#0071e3] dark:focus:border-cyan-400 focus:bg-white dark:focus:bg-black/50 focus:outline-none placeholder-slate-400 transition-colors"
                />
              </div>

              <div className="px-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] text-[11px] sm:text-xs text-slate-500 dark:text-[#86868b] flex items-center justify-between">
                <span>Detected: {visitorData?.client?.browser} on {visitorData?.client?.os}</span>
                <span className="text-[#0071e3] dark:text-cyan-400 font-semibold">{visitorData?.client?.screenResolution} ({visitorData?.client?.aspectRatio})</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Auto-Accept & Check In</span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-5 py-3 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-slate-700 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:text-slate-300 text-xs sm:text-sm font-medium transition-all active:scale-95 text-center"
                >
                  Browse Anonymously
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visitor Intelligence Ledger Modal (Accessible via Ctrl+Shift+V or clicking pill) */}
      {showLedger && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 flex flex-col space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Visitor Intelligence Ledger</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                    Consolidated telemetry across N visitors (Recruiter vs Casual classification)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportLogsAsJson}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Export Visitor Logs"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setShowLedger(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Consolidated Visitors Intelligence Strip */}
            <div className="px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Consolidated Telemetry: </span>
                  <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{allLogs.filter(l => l.category === 'RECRUITER' || l.company).length} Recruiters</span>
                  <span className="text-slate-400"> • </span>
                  <span className="text-slate-700 dark:text-slate-300">{allLogs.filter(l => l.category !== 'RECRUITER' && !l.company).length} Casual Visitors</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">
                <Check className="w-3 h-3" />
                <span>Auto-Accept All: Active</span>
              </div>
            </div>

            {/* Current Session Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Browser</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">{visitorData?.client?.browser}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Platform / OS</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{visitorData?.client?.os}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Screen Ratio</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">{visitorData?.client?.aspectRatio}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Total Visits</span>
                <span className="text-indigo-700 dark:text-indigo-400 font-bold">#{visitorData?.visitCount}</span>
              </div>
            </div>

            {/* Ledger List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 text-xs font-mono">
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider pb-1">
                Recent Visitor History ({allLogs.length} logged sessions):
              </p>
              {allLogs.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No previous visitor sessions recorded yet.</p>
              ) : (
                allLogs.map((log, idx) => (
                  <div key={log.id || idx} className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{log.name || 'Anonymous Guest'}</span>
                        {log.category === 'RECRUITER' ? (
                          <span className="px-2 py-0.5 rounded text-[9px] bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold uppercase">
                            Recruiter
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                            Casual
                          </span>
                        )}
                        {log.company && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 font-semibold">
                            {log.company}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {log.client?.browser} • {log.client?.os} • {log.client?.screenResolution} ({log.client?.aspectRatio})
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] text-slate-500 whitespace-nowrap block">
                        {log.displayTime || log.timestamp?.split('T')[0]}
                      </span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                        <Check className="w-2.5 h-2.5" /> Auto-Accepted
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Press Ctrl+Shift+V anytime to toggle this ledger</span>
              <span>Dev Console: window.getPortfolioVisitorsSummary()</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
