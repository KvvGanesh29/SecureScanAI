'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface RecentActivityTimelineProps {
  scans: any[];
}

const formatDistanceToNow = (date: string | Date) => {
  const now = new Date();
  const pastDate = new Date(date);
  const diffMs = now.getTime() - pastDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return pastDate.toLocaleDateString();
};

export default function RecentActivityTimeline({ scans }: RecentActivityTimelineProps) {
  const recentScans = scans.slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'scanning':
        return <Clock size={16} className="text-cyan-400 animate-spin" />;
      case 'failed':
        return <AlertCircle size={16} className="text-red-400" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };

  const getSeverityColor = (threatLevel: string) => {
    switch (threatLevel) {
      case 'Critical':
        return 'bg-red-500/10 text-red-400';
      case 'High':
        return 'bg-orange-500/10 text-orange-400';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'Low':
        return 'bg-green-500/10 text-green-400';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 border border-cyan-500/20"
    >
      <h3 className="text-xl font-semibold mb-6">Recent Scan Activity</h3>

      {recentScans.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p>No scans yet</p>
          <p className="text-sm">Start your first scan to see activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentScans.map((scan, idx) => (
            <motion.div
              key={scan._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition border border-cyan-500/0 hover:border-cyan-500/30"
            >
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
                {idx < recentScans.length - 1 && (
                  <div className="w-0.5 h-10 bg-gradient-to-b from-cyan-400 to-transparent my-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(scan.status)}
                  <p className="font-semibold truncate">{scan.target}</p>
                </div>
                <p className="text-xs text-slate-400">
                  {formatDistanceToNow(new Date(scan.createdAt), { addSuffix: true })}
                </p>
              </div>

              {/* Severity badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(scan.threatLevel)}`}>
                {scan.threatLevel}
              </div>

              {/* Risk score */}
              <div className="text-right">
                <p className="font-semibold">{scan.riskScore}/100</p>
                <p className="text-xs text-slate-400">{scan.vulnCount} vulns</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
