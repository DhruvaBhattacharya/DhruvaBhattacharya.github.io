import React from 'react';
import { Award, Code2, ExternalLink, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import profileData from '../../data/profile.json';

export default function Contributions() {
  const leetcodeMetric = profileData.metrics?.find(m => m.label.toLowerCase().includes('leetcode'))?.value || '900+';
  return (
    <section id="achievements" className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Problem Solving & Algorithms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900 tracking-tight">
            Competitive Programming & Problem Solving
          </h2>
          <p className="dark:text-[#86868b] text-slate-600 text-sm sm:text-base">
            Continuous algorithmic mastery across dynamic programming, graph theory, tree traversals, and optimal time-space complexity.
          </p>
        </div>

        {/* LeetCode & GFG Milestone Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-semibold">
                  Verified Problem Solver
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-[#86868b]">900+ Problems Mastered</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 tracking-tight leading-tight">
                Data Structures & Algorithmic Problem Solving
              </h3>

              <p className="text-sm dark:text-[#a1a1a6] text-slate-600 leading-relaxed">
                Extensive track record solving high-concurrency algorithmic challenges across dynamic programming, graph traversals, tree balancing, and optimal memory management on top competitive platforms.
              </p>

              {/* Profiles Action Cluster */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://leetcode.com/dhruvaop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 text-xs font-mono font-medium flex items-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>LeetCode (900+ Solved)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="https://www.geeksforgeeks.org/profile/dhruvabhattacharya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-mono font-medium flex items-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  <span>GeeksforGeeks Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono text-slate-600 dark:text-[#86868b]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                  Graph Theory & DFS/BFS
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                  Dynamic Programming
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-cyan-400" />
                  Sliding Window & Pointers
                </span>
              </div>
            </div>

            {/* High-Impact Numerical Stat Tile */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-8 bg-black/[0.02] dark:bg-white/[0.04] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] text-center shadow-inner">
              <span className="text-6xl font-extrabold font-mono text-amber-500 dark:text-amber-400 tracking-tight">{leetcodeMetric}</span>
              <span className="text-base font-bold text-slate-900 dark:text-white mt-2 tracking-tight">DSA Problems Solved</span>
              <span className="text-xs font-mono text-slate-500 dark:text-[#86868b] mt-1">LeetCode & GeeksforGeeks</span>
              <div className="mt-4 px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] dark:text-cyan-400 border border-[#0071e3]/20 text-[10px] font-mono uppercase font-semibold">
                Top Decile Mastery
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
