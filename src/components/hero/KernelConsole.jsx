import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CornerDownLeft } from 'lucide-react';
import profileData from '../../data/profile.json';
import experienceData from '../../data/experience.json';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';

// Dynamically generate command responses from data files for GitHub Action automation sync
const getDynamicResponse = (cmdRaw) => {
  const cleanCmd = cmdRaw.trim();
  const lower = cleanCmd.toLowerCase();

  if (lower === 'whoami') {
    return {
      commandLabel: 'whoami',
      title: `${profileData.name} — ${profileData.title}`,
      lines: [
        `"${profileData.tagline}"`,
        `• Role: ${profileData.title}`,
        `• Status: ${profileData.status.badge} (${profileData.status.lookingFor})`,
        `• Summary: ${profileData.summary}`,
        `• Relocation: Open to ${profileData.contact.preferredLocations.join(', ')}.`
      ]
    };
  }

  if (lower === 'metrics' || lower === 'stats' || lower === 'latency' || lower === 'benchmarks') {
    return {
      commandLabel: 'metrics',
      title: 'Production Benchmarks & Verified Engineering Impact',
      lines: profileData.metrics.map(
        (m) => `• ${m.label}: ${m.value} (${m.description})`
      )
    };
  }

  if (lower === 'achievements' || lower === 'awards' || lower === 'alibaba' || lower === 'rank') {
    return {
      commandLabel: 'achievements',
      title: 'Honors, Competitions & Global Rankings',
      lines: [
        '• Rank 1 (Asia) – Alibaba Cloud Low Code Development Contest 2022',
        '• Smart India Hackathon (SIH) Finalist (2022)',
        '• 900+ LeetCode DSA Problems Mastered'
      ]
    };
  }

  if (lower === 'locations' || lower === 'location' || lower === 'indore') {
    return {
      commandLabel: 'locations',
      title: 'Relocation & Open Engineering Hubs',
      lines: profileData.contact.preferredLocations.map((loc) => `• ${loc}`)
    };
  }

  if (lower === 'skills' || lower === 'stack') {
    return {
      commandLabel: 'skills',
      title: 'Technical Stack & System Competencies',
      lines: skillsData.map((cat) => {
        const topSkills = cat.skills.map((s) => s.name).join(', ');
        return `• ${cat.category}: ${topSkills}`;
      })
    };
  }

  if (lower === 'experience' || lower === 'work' || lower === 'tcs' || lower === 'techxr') {
    return {
      commandLabel: 'experience',
      title: 'Career Summary & Enterprise Impact',
      lines: experienceData.flatMap((exp, idx) => [
        `${idx + 1}. ${exp.company} — ${exp.role} (${exp.period}) [${exp.location}]`,
        ...exp.subProjects.map((sub) => `   - ${sub.title}: ${sub.summary}`)
      ])
    };
  }

  if (lower === 'projects') {
    return {
      commandLabel: 'projects',
      title: 'Engineered Systems & Case Studies',
      lines: projectsData.map(
        (p) => `• ${p.title} [${p.category}]: ${p.description}`
      )
    };
  }

  if (lower.startsWith('systemctl') || lower === 'status') {
    return {
      commandLabel: 'status',
      title: 'System Daemon Status',
      lines: [
        `● dhruva-engine.service — active (running)`,
        `● Candidate: ${profileData.name} <${profileData.contact.email}>`,
        `● Status: ${profileData.status.badge}`,
        `● Seeking: ${profileData.status.lookingFor}`,
        `● Preferred Hubs: ${profileData.contact.preferredLocations.join(', ')}`,
        `● Last Synced: ${new Date(profileData.lastSyncedAt).toLocaleString()}`
      ]
    };
  }

  if (lower === 'contact' || lower === 'email') {
    return {
      commandLabel: 'contact',
      title: 'Direct Reachout & Handles',
      lines: [
        `• Email: ${profileData.contact.email}`,
        `• Location: ${profileData.contact.location}`,
        ...profileData.socials.map((soc) => `• ${soc.name}: ${soc.url}`),
        `• Direct scheduling: Use the "Schedule an Interview" feature in Contact section below.`
      ]
    };
  }

  if (lower === 'summary' || lower === 'bio') {
    return {
      commandLabel: 'summary',
      title: 'Executive Summary',
      lines: [profileData.summary]
    };
  }

  if (lower === 'ls') {
    return {
      commandLabel: 'ls',
      title: 'Directory Listing',
      lines: ['bio.txt  metrics.json  skills.yaml  experience.md  locations.conf  projects.json']
    };
  }

  if (lower.startsWith('cat')) {
    const target = lower.replace('cat', '').trim();
    if (target.includes('bio') || target.includes('summary')) {
      return {
        commandLabel: cleanCmd,
        title: 'Executive Summary',
        lines: [profileData.summary]
      };
    }
    if (target.includes('metric') || target.includes('benchmark')) {
      return getDynamicResponse('metrics');
    }
    if (target.includes('location')) {
      return getDynamicResponse('locations');
    }
    if (target.includes('skill')) {
      return getDynamicResponse('skills');
    }
    if (target.includes('experience') || target.includes('work')) {
      return getDynamicResponse('experience');
    }
    if (target.includes('project')) {
      return getDynamicResponse('projects');
    }
    return {
      commandLabel: cleanCmd,
      title: 'Executive Summary',
      lines: [profileData.summary]
    };
  }

  if (lower === 'help' || lower === '?') {
    return {
      commandLabel: 'help',
      title: 'Available Commands',
      lines: [
        'whoami, metrics, skills, experience, projects, locations, status, contact, summary, ls, clear, exit'
      ]
    };
  }

  return {
    commandLabel: cleanCmd,
    title: `command not recognized: ${cleanCmd}`,
    lines: ['Type "whoami", "metrics", "skills", "experience", "projects", or "help".']
  };
};

const QUICK_COMMANDS = ['whoami', 'metrics', 'skills', 'experience', 'projects', 'locations', 'contact'];

export default function KernelConsole({ onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Linux 6.8.0 x86_64 — type "whoami", "metrics" or click any shortcut.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const hasUserInteractedRef = useRef(false);

  // Strictly scroll the terminal body container internally, NEVER the window or page
  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = useCallback((cmdRaw) => {
    if (!cmdRaw) return;
    const cleanCmd = cmdRaw.trim();
    if (!cleanCmd) return;

    hasUserInteractedRef.current = true;
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    const lower = cleanCmd.toLowerCase();

    setCommandHistory(prev => [cleanCmd, ...prev.filter(c => c !== cleanCmd)].slice(0, 30));
    setHistoryIndex(-1);

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    // Direct close / exit commands switch to Visual Profile
    if (lower === 'exit' || lower === 'quit' || lower === 'close') {
      if (onClose) onClose();
      return;
    }

    const responseObj = getDynamicResponse(cleanCmd);
    const commandLabel = responseObj.commandLabel || cleanCmd;

    setHistory(prev => [
      ...prev,
      { type: 'command', text: commandLabel },
      {
        type: 'output',
        title: responseObj.title,
        lines: responseObj.lines
      }
    ]);

    setInputVal('');
  }, []);

  useEffect(() => {
    inactivityTimerRef.current = setTimeout(() => {
      if (!hasUserInteractedRef.current && !document.hidden) {
        executeCommand('whoami');
      }
    }, 4000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [executeCommand]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const handleTerminalClick = (e) => {
    if (e && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-white/[0.12] bg-[#161618]/95 shadow-2xl backdrop-blur-2xl text-xs font-mono transition-all cursor-text select-text"
    >
      {/* Authentic macOS Window Header with Traffic Lights & Window Title */}
      <div className="px-4 py-3 bg-[#1e1e20]/90 border-b border-white/[0.08] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {/* Close button with interactive hover symbol */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-90 transition-all flex items-center justify-center group cursor-pointer"
            title="Close Terminal (Switch to Visual Profile)"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#4a0002] font-black leading-none">✕</span>
          </button>
          
          {/* Minimize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-90 transition-all flex items-center justify-center group cursor-pointer"
            title="Minimize"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[9px] text-[#5c3c00] font-black leading-none">−</span>
          </button>
          
          {/* Zoom/Expand button */}
          <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block"></span>
        </div>

        {/* Centered macOS Window Title */}
        <div className="text-[11px] font-medium text-slate-300 tracking-tight flex items-center gap-1.5 opacity-90">
          <span>dhruva — zsh — 80×24</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
            }}
            className="text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-white/10"
            title="Clear terminal buffer"
          >
            clear
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer px-1.5 py-0.5 rounded hover:bg-white/10"
            title="Close Terminal (Switch to Visual Profile)"
          >
            <span>close</span>
            <span className="text-xs leading-none">✕</span>
          </button>
        </div>
      </div>

      {/* macOS Toolbar Quick Commands Ribbon */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="px-4 py-2 bg-black/40 border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]"
      >
        <span className="text-[10px] text-slate-400 select-none mr-1 font-sans">Quick run:</span>
        {QUICK_COMMANDS.map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2.5 py-0.5 rounded-full text-[10px] text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Screen Body with Clean San Francisco Mono Line Stream */}
      <div 
        ref={terminalBodyRef}
        className="p-4 h-72 sm:h-80 overflow-y-auto space-y-2 bg-[#0c0c0e] text-[#f5f5f7] leading-relaxed font-mono"
      >
        {history.map((item, idx) => {
          if (item.type === 'system') {
            return (
              <div key={idx} className="text-[#86868b] text-[11px] pb-1">
                {item.text}
              </div>
            );
          }

          if (item.type === 'command') {
            return (
              <div key={idx} className="flex items-center gap-2 text-cyan-300 pt-1 font-medium">
                <span className="text-[#27c93f] select-none font-semibold">dhruva@macbook ~ %</span>
                <span>{item.text}</span>
              </div>
            );
          }

          if (item.type === 'output') {
            return (
              <div key={idx} className="pl-3 border-l-2 border-white/20 space-y-1 my-1.5 text-[11px]">
                {item.title && (
                  <p className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                    {item.title}
                  </p>
                )}
                <div className="space-y-0.5 text-[#f5f5f7]">
                  {item.lines.map((line, lIdx) => (
                    <p key={lIdx} className="leading-snug break-words">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Terminal Interactive Input Prompt */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="px-4 py-3 bg-[#0c0c0e] border-t border-white/[0.08] flex items-center gap-2"
      >
        <span className="text-[#27c93f] select-none text-[11px] font-semibold shrink-0">
          dhruva@macbook ~ %
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type whoami, metrics, skills..."
          className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder-slate-500 min-w-0"
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="text-slate-400 hover:text-white text-xs transition-colors disabled:opacity-0 cursor-pointer shrink-0"
          title="Execute command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
