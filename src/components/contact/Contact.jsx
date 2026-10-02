import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, Sparkles, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import profileData from '../../data/profile.json';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot spam

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      setFormState('error');
      return;
    }

    setFormState('submitting');
    setErrorMessage('');

    const payload = {
      _subject: `🚀 Portfolio Message from ${formData.name.trim()}${formData.subject ? ` - ${formData.subject.trim()}` : ''}`,
      _template: 'table',
      _captcha: 'false',
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'General Inquiry / Opportunity',
      message: formData.message.trim(),
      timestamp: new Date().toLocaleString()
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/dhruvabhattacharya130102@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState('error');
        setErrorMessage('Could not deliver message via FormSubmit. Please email me directly.');
      }
    } catch (err) {
      setFormState('error');
      setErrorMessage('Network error while sending message. Please reach out directly at dhruvabhattacharya130102@gmail.com.');
    }
  };

  return (
    <section id="contact" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <MessageSquare className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
            <span>Direct Outreach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Me
          </h2>
          <p className="text-slate-600 dark:text-[#86868b] text-sm sm:text-base">
            Have a project, full-time engineering opportunity, or architectural problem to solve? Drop me a message.
          </p>
        </div>

        {/* Contact Grid: Direct Info (Left) & FormSubmit Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct Info & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Let's Build Something High-Scale
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a1a1a6] mt-2 leading-relaxed">
                  I read every incoming message and typically respond within 12–24 hours. Feel free to reach out for backend engineering, system architecture, or project discussions.
                </p>
              </div>

              {/* Email Address & Quick Copy */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                  Primary Email
                </span>
                <p className="text-xs sm:text-sm font-mono font-semibold text-[#0071e3] dark:text-cyan-400 break-all select-all">
                  {profileData.contact.email}
                </p>
                <div className="pt-1 flex gap-2">
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-slate-200 border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono font-medium flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    className="px-3 py-1.5 rounded-full bg-[#0071e3]/10 hover:bg-[#0071e3]/20 text-[#0071e3] dark:text-cyan-400 border border-[#0071e3]/20 text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open Mail Client</span>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                  Location
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0071e3] dark:text-cyan-400 shrink-0" />
                  <span>{profileData.contact.location}</span>
                </p>
              </div>

              {/* Social Profiles */}
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                  Professional Profiles
                </span>
                <div className="flex flex-wrap gap-2">
                  {profileData.socials.map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-mono border border-black/[0.06] dark:border-white/[0.08] transition-colors shadow-2xs"
                    >
                      {soc.name}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: FormSubmit Connected Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
              
              <div className="pb-4 mb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#86868b] mt-1 font-mono">
                  Delivered directly to dhruvabhattacharya130102@gmail.com
                </p>
              </div>

              {formState === 'success' ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out. Your message has been routed to <span className="font-semibold font-mono text-[#0071e3] dark:text-cyan-400">dhruvabhattacharya130102@gmail.com</span>. I will review it and follow up with you shortly.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-2 px-5 py-2 rounded-full bg-[#0071e3] text-white text-xs font-mono font-medium hover:bg-[#0077ed] transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.1] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-[#0071e3] dark:focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.1] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-[#0071e3] dark:focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Subject / Opportunity
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. SDE Opportunity / Backend Systems Discussion"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.1] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-[#0071e3] dark:focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share details about the role, technical scope, or any questions..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.1] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-[#0071e3] dark:focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Error Notification if any */}
                  {formState === 'error' && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage || 'Failed to submit. Please email directly.'}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-3 px-6 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
                  >
                    {formState === 'submitting' ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message via FormSubmit</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
