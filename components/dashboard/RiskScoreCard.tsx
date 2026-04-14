'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface RiskScoreCardProps {
  stats: {
    totalScans: number;
    criticalVulns: number;
    averageScore: number;
    lastScanTime: string;
  };
}

export default function RiskScoreCard({ stats }: RiskScoreCardProps) {
  const score = stats.averageScore;
  const getColor = (score: number) => {
    if (score >= 80) return 'from-red-500 to-red-600';
    if (score >= 60) return 'from-orange-500 to-orange-600';
    if (score >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-8 border border-cyan-500/20 h-full flex flex-col items-center justify-center"
    >
      <div className="relative w-48 h-48 mb-6">
        {/* Background circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <circle
            cx={100}
            cy={100}
            r={90}
            fill="none"
            stroke="rgba(0, 217, 255, 0.1)"
            strokeWidth={15}
          />
          <motion.circle
            cx={100}
            cy={100}
            r={90}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={15}
            strokeDasharray={565}
            initial={{ strokeDashoffset: 565 }}
            animate={{ strokeDashoffset: 565 - (565 * score) / 100 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold gradient-text mb-2"
          >
            {score}
          </motion.div>
          <div className="text-sm text-slate-400">Risk Score</div>
        </div>
      </div>

      <div className="grid w-full gap-3">
        <div className="text-center">
          <p className="text-3xl font-bold gradient-text">{getGrade(score)}</p>
          <p className="text-xs text-slate-400 mt-1">Security Grade</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-sm font-semibold text-cyan-400">{stats.totalScans}</p>
            <p className="text-slate-500 text-xs">Total Scans</p>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-sm font-semibold text-red-400">{stats.criticalVulns}</p>
            <p className="text-slate-500 text-xs">Critical</p>
          </div>
        </div>
      </div>

      <div className="inline-block mt-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs text-slate-300">
        <Shield size={14} className="inline mr-1" />
        Last scan: Just now
      </div>
    </motion.div>
  );
}
