'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface CriticalAlertsProps {
  scans: any[];
}

export default function CriticalAlerts({ scans }: CriticalAlertsProps) {
  const criticalScans = scans
    .filter(s => s.threatLevel === 'Critical')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 border border-red-500/20 bg-gradient-to-br from-slate-900 to-red-950/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle size={20} className="text-red-400 animate-pulse" />
        <h3 className="text-xl font-semibold">Critical Alerts</h3>
      </div>

      {criticalScans.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="text-sm">✓ No critical vulnerabilities found</p>
          <p className="text-xs text-slate-500 mt-2">Your infrastructure looks secure!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {criticalScans.map((scan, idx) => (
            <motion.div
              key={scan._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 hover:border-red-500/50 transition cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5 group-hover:animate-pulse" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-red-300 text-sm group-hover:text-red-200 transition truncate">
                    {scan.target}
                  </p>
                  <p className="text-xs text-red-400/70 mt-1">
                    {scan.vulnCount} vulnerabilities • Score: {scan.riskScore}/100
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-red-500/10">
        <button className="w-full py-2 px-4 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition">
          View All Critical Issues
        </button>
      </div>
    </motion.div>
  );
}
