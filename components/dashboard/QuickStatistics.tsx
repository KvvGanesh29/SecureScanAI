'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, AlertCircle, TrendingUp } from 'lucide-react';

interface QuickStatisticsProps {
  stats: {
    totalScans: number;
    criticalVulns: number;
    averageScore: number;
    lastScanTime: string;
  };
}

export default function QuickStatistics({ stats }: QuickStatisticsProps) {
  const statItems = [
    {
      icon: Zap,
      label: 'Total Scans',
      value: stats.totalScans,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: AlertCircle,
      label: 'Critical Issues',
      value: stats.criticalVulns,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Shield,
      label: 'Avg Risk Score',
      value: `${stats.averageScore}/100`,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: TrendingUp,
      label: 'Security Trend',
      value: stats.averageScore > 60 ? '↑ Improving' : '↓ Declining',
      color: stats.averageScore > 60 ? 'from-green-500 to-cyan-500' : 'from-red-500 to-orange-500',
      bgColor: stats.averageScore > 60 ? 'bg-green-500/10' : 'bg-red-500/10',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass rounded-xl p-4 border border-cyan-500/20 ${item.bgColor}`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</p>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20`}>
                <Icon size={16} className={`bg-gradient-to-br ${item.color} text-transparent bg-clip-text`} />
              </div>
            </div>
            <p className="text-2xl font-bold">{item.value}</p>
            <div className="mt-2 text-xs text-slate-500">
              {item.label === 'Total Scans' && 'This month'}
              {item.label === 'Critical Issues' && 'Unresolved'}
              {item.label === 'Avg Risk Score' && 'All assets'}
              {item.label === 'Security Trend' && 'Last 30 days'}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
