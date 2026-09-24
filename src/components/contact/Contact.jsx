import React, { useState, useRef } from 'react';
import { Mail, MapPin, Copy, Check, Send, ExternalLink, Award, Code2, Sparkles, Clock, CheckCircle2, Calendar, Video, Building, User, X } from 'lucide-react';
import profileData from '../../data/profile.json';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  // Form states for scheduling
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterPhone, setRecruiterPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Backend Software Engineer');
  const [preferredPlatform, setPreferredPlatform] = useState('Google Meet');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestConfirmed, setRequestConfirmed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const lastSubmitRef = useRef(0);

  // Security sanitization utility against XSS & CRLF injection
  const sanitizeStr = (str, maxLen = 100) => {
    return String(str || '')
      .replace(/<[^>]*>?/gm, '')
      .replace(/[<>"'`]/g, '')
      .trim()
      .slice(0, maxLen);
  };

  const sanitizeHeader = (str, maxLen = 80) => {
    return sanitizeStr(str, maxLen).replace(/[\r\n\t]/g, ' ');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getInterviewSubject = () => {
    const safeComp = sanitizeHeader(company, 60);
    const safeRole = sanitizeHeader(role, 60) || 'Backend Software Engineer';
    const compText = safeComp ? ` at ${safeComp}` : '';
    return `Interview Discussion: ${safeRole}${compText} - Dhruva Bhattacharya`;
  };

  const getInterviewBody = () => {
    const safeName = sanitizeHeader(recruiterName, 60) || 'Hiring Team';
    const safeEmail = sanitizeHeader(recruiterEmail, 80);
    const safePhone = sanitizeHeader(recruiterPhone, 40);
    const safeComp = sanitizeHeader(company, 60) || 'Our Organization';
    const safeRole = sanitizeHeader(role, 60) || 'Backend Software Engineer';
    const safePlatform = sanitizeHeader(preferredPlatform, 40) || 'Google Meet';
    const safeDate = sanitizeHeader(preferredDate, 50) || 'Flexible / Next Available Slot';
    const safeNotes = sanitizeStr(notes, 400);

    return `Hi Dhruva,

I would like to schedule an interview discussion with you regarding the ${safeRole} position${company ? ` at ${safeComp}` : ''}.

Details:
• Recruiter/Interviewer: ${safeName}
${safeEmail ? `• Work Email: ${safeEmail}\n` : ''}${safePhone ? `• Phone / WhatsApp (Optional): ${safePhone}\n` : ''}• Company: ${safeComp}
• Preferred Platform: ${safePlatform}
• Proposed Date/Window: ${safeDate}
• Candidate Focus: ${profileData.status.badge}
${safeNotes ? `• Additional Notes: ${safeNotes}\n` : ''}
Looking forward to speaking with you!`;
  };

  const handleAutoAcceptSubmit = async (e) => {
    if (e) e.preventDefault();
    if (honeypot) return; // Silent rejection of automated spam bots

    // Validate Mandatory Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!recruiterEmail || !emailRegex.test(recruiterEmail.trim())) {
      setEmailError('Please enter a valid work email address (mandatory for scheduling).');
      return;
    }
    setEmailError('');

    // Anti-spam cooldown (15 seconds)
    const now = Date.now();
    if (now - lastSubmitRef.current < 15000) {
      setRequestConfirmed(true);
      return;
    }
    lastSubmitRef.current = now;

    setIsSubmitting(true);

    const safeName = sanitizeHeader(recruiterName, 80) || 'Recruiter Guest';
    const safeEmail = sanitizeHeader(recruiterEmail, 80);
    const safePhone = sanitizeHeader(recruiterPhone, 40);
    const safeCompany = sanitizeHeader(company, 80) || 'Hiring Organization';
    const safeRole = sanitizeHeader(role, 80) || 'Backend Software Engineer';
    const safePlatform = sanitizeHeader(preferredPlatform, 50) || 'Google Meet';
    const safeDate = sanitizeHeader(preferredDate, 60) || 'Flexible / Next Available';
    const safeNotes = sanitizeStr(notes, 500) || 'None';

    const payload = {
      _subject: `🎯 Interview Request Auto-Accepted: ${safeName} (${safeCompany}) - ${safeRole}`,
      _template: 'table',
      _captcha: 'false',
      'Status': 'AUTO_ACCEPTED',
      'Recruiter Name': safeName,
      'Recruiter Email (Mandatory)': safeEmail,
      'Recruiter Phone (Optional)': safePhone || 'Not provided (Optional)',
      'Company / Organization': safeCompany,
      'Role / Position': safeRole,
      'Meeting Platform': safePlatform,
      'Preferred Date / Slot': safeDate,
      'Message / Topics': safeNotes,
      'Candidate Status': profileData.status.badge,
      'Timestamp': new Date().toLocaleString()
    };

    try {
      await fetch('https://formsubmit.co/ajax/dhruvabhattacharya130102@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Silent failover
    }

    // Mark as RECRUITER in visitor ledger
    try {
      const storedLogs = JSON.parse(localStorage.getItem('dhruva_visitor_ledger') || '[]');
      const newEntry = {
        id: 'req_' + Date.now(),
        timestamp: new Date().toISOString(),
        displayTime: new Date().toLocaleString(),
        name: safeName,
        email: safeEmail,
        phone: safePhone || null,
        company: safeCompany,
        role: safeRole,
        category: 'RECRUITER',
        status: 'AUTO_ACCEPTED',
        client: {
          browser: navigator.userAgent.split(' ')[0] || 'Browser',
          os: 'Client Platform'
        }
      };
      localStorage.setItem('dhruva_visitor_ledger', JSON.stringify([newEntry, ...storedLogs.slice(0, 49)]));
    } catch (err) {}

    setIsSubmitting(false);
    setRequestConfirmed(true);
  };

  const openGmailWeb = () => {
    const subject = encodeURIComponent(getInterviewSubject());
    const body = encodeURIComponent(getInterviewBody());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.contact.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const openMailto = () => {
    const subject = encodeURIComponent(getInterviewSubject());
    const body = encodeURIComponent(getInterviewBody());
    window.location.href = `mailto:${profileData.contact.email}?subject=${subject}&body=${body}`;
  };

  const copyInvitationTemplate = () => {
    const text = `To: ${profileData.contact.email}\nSubject: ${getInterviewSubject()}\n\n${getInterviewBody()}`;
    navigator.clipboard.writeText(text);
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Symmetrically Aligned & Indented */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          
          {/* Unified Profile & Status Chip */}
          <div className="inline-flex items-center gap-3.5 p-2 pr-5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md mb-5">
            <div className="relative shrink-0">
              <img
                src="./images/profile-headshot.webp"
                alt="Dhruva Bhattacharya"
                loading="lazy"
                decoding="async"
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500 dark:border-cyan-400/80 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
                <span>Dhruva Bhattacharya</span>
                <span className="text-slate-300 dark:text-slate-600 font-mono">•</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium font-mono uppercase">{profileData.status.badge}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Backend & Generative AI Engineer</p>
            </div>
          </div>
          
          {/* Section Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
            <span>Direct Inquiries</span>
          </div>

          {/* Heading & Subtitle */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Let's Connect & Build
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            I am currently <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{profileData.status.badge}</span> actively interviewing for Backend Software Engineer, Distributed Systems, and Generative AI Engineering roles at product-based organizations.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          
          {/* Email Card with 1-click Copy & Direct Interview Scheduling */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] text-center flex flex-col items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-cyan-400 mb-4">
              <Mail className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Direct Recruiter Outreach</h3>
              <p className="text-xs font-mono text-[#0071e3] dark:text-cyan-400 break-all select-all font-semibold">
                {profileData.contact.email}
              </p>
              <p className="text-xs text-slate-500 dark:text-[#86868b] pt-1">
                Direct inbox with prompt responses within 12–24 hours.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5 w-full justify-center">
              <button
                onClick={copyEmail}
                className="px-4 py-2 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-slate-800 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:text-slate-200 border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
              
              <button
                onClick={() => setScheduleModalOpen(true)}
                className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs font-mono flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Interview</span>
              </button>
            </div>
          </div>

          {/* Location & Availability Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] text-center flex flex-col items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Clock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Availability & Mobility</h3>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-mono font-semibold">
                {profileData.status.badge}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono pt-1">
                Open to {profileData.contact.preferredLocations.join(', ')}
              </p>
            </div>
            
            {/* Social Ribbon */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {profileData.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white text-xs font-mono border border-black/[0.06] dark:border-white/[0.08] transition-colors shadow-xs shrink-0 whitespace-nowrap active:scale-95"
                >
                  {soc.name}
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Apple-Style Schedule Interview Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl p-5 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    Schedule an Interview
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fast-track recruitment dialogue with Dhruva Bhattacharya
                  </p>
                </div>
              </div>
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conditional Render: Form vs Auto-Accepted Confirmation View */}
            {requestConfirmed ? (
              <div className="space-y-4 py-2 animate-in zoom-in-95 duration-200">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    🎉 Interview Request Confirmed & Auto-Accepted!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Thank you <span className="font-bold text-slate-900 dark:text-white">{recruiterName || 'Hiring Lead'}</span>. Your interview request for <span className="font-bold text-slate-900 dark:text-white">{role}</span> has been auto-accepted and placed into Dhruva's priority queue.
                  </p>
                </div>

                {/* Summary Table */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Company / Org:</span>
                    <span className="font-bold text-slate-900 dark:text-white text-right">{company || 'Hiring Organization'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Contact Email:</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-semibold text-right">{recruiterEmail}</span>
                  </div>
                  {recruiterPhone && (
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-500">Phone / WhatsApp:</span>
                      <span className="text-slate-800 dark:text-slate-200 text-right">{recruiterPhone}</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Platform:</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-semibold text-right">{preferredPlatform}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Proposed Slot:</span>
                    <span className="text-slate-800 dark:text-slate-200 text-right">{preferredDate || 'Flexible / Next Available Slot'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500">Target Roles:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-right">{profileData.status.badge}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={openGmailWeb}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-cyan-500/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Follow-Up via Gmail (Web)</span>
                  </button>

                  <button
                    onClick={() => {
                      setRequestConfirmed(false);
                      setScheduleModalOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-xs font-mono transition-colors"
                  >
                    Done / Close Window
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Form Fields */}
                <div className="space-y-3.5 text-xs font-mono">
                  {/* Anti-bot Honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                    style={{ display: 'none' }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        maxLength={80}
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Google, Microsoft, Stripe"
                        maxLength={80}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Recruiter Contact Credentials: Email (Mandatory) & Phone (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium flex items-center justify-between">
                        <span>Work Email <span className="text-rose-500 font-bold">*</span></span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">Mandatory</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="recruiter@company.com"
                        maxLength={100}
                        value={recruiterEmail}
                        onChange={(e) => {
                          setRecruiterEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-slate-200 focus:outline-none ${
                          emailError ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {emailError && (
                        <p className="text-[10px] text-rose-500 mt-1 font-medium">{emailError}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium flex items-center justify-between">
                        <span>Phone / WhatsApp</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Optional</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 / +91 (Optional)"
                        maxLength={25}
                        value={recruiterPhone}
                        onChange={(e) => setRecruiterPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium">Role / Position</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Backend Software Engineer">Backend Software Engineer</option>
                        <option value="Distributed Systems SDE II">Distributed Systems SDE II</option>
                        <option value="Generative AI & Agent Engineer">Generative AI & Agent Engineer</option>
                        <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                        <option value="Technical Interview Discussion">Technical Interview Discussion</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium">Preferred Meeting Platform</label>
                      <select
                        value={preferredPlatform}
                        onChange={(e) => setPreferredPlatform(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Google Meet">Google Meet</option>
                        <option value="Microsoft Teams">Microsoft Teams</option>
                        <option value="Zoom">Zoom</option>
                        <option value="Phone Call">Phone Call</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium">Preferred Date / Slot</label>
                    <input
                      type="text"
                      placeholder="e.g. Next Tuesday at 3:00 PM IST / Weekdays after 5 PM"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 mb-1 font-medium">Message / Key Topics (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Specific team details, salary range, or tech stack..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Launch Action Cluster (Auto-Accept + Instant Dispatch) */}
                <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={handleAutoAcceptSubmit}
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-emerald-500/25 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Auto-Accepting & Processing...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        <span>Confirm & Auto-Accept Interview Request</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={openGmailWeb}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Open in Gmail (Web)</span>
                    </button>

                    <button
                      onClick={copyInvitationTemplate}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {inviteCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{inviteCopied ? "Copied Details!" : "Copy Full Invite"}</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-500 text-center font-mono pt-1">
                    {profileData.status.badge} • Open to {profileData.contact.preferredLocations.join(', ')}
                  </p>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
