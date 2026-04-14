'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, AlertCircle, Shield } from 'lucide-react';
import Link from 'next/link';

interface AnalyticsData {
  scanTrend: Array<{ month: string; scans: number }>;
  vulnerabilityTypes: Array<{ name: string; value: number }>;
  riskDistribution: Array<{ level: string; count: number }>;
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    scanTrend: [
      { month: 'Jan', scans: 12 },
      { month: 'Feb', scans: 19 },
      { month: 'Mar', scans: 15 },
      { month: 'Apr', scans: 22 },
      { month: 'May', scans: 28 },
      { month: 'Jun', scans: 25 },
    ],
    vulnerabilityTypes: [
      { name: 'XSS', value: 45 },
      { name: 'CSRF', value: 30 },
      { name: 'SQL Injection', value: 20 },
      { name: 'Other', value: 5 },
    ],
    riskDistribution: [
      { level: 'Critical', count: 5 },
      { level: 'High', count: 12 },
      { level: 'Medium', count: 28 },
      { level: 'Low', count: 55 },
    ],
  });

  const COLORS = ['#06b6d4', '#0ea5e9', '#3b82f6', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Security Analytics</h1>
          <p className="text-slate-400">Track your security metrics and trends over time</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl border border-cyan-500/30 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Total Scans</p>
                <p className="text-3xl font-bold">121</p>
              </div>
              <Shield size={32} className="text-cyan-400/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl border border-cyan-500/30 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Critical Issues</p>
                <p className="text-3xl font-bold text-red-400">5</p>
              </div>
              <AlertCircle size={32} className="text-red-400/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl border border-cyan-500/30 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Avg Risk Score</p>
                <p className="text-3xl font-bold">6.8/10</p>
              </div>
              <TrendingUp size={32} className="text-yellow-400/50" />
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scan Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl border border-cyan-500/30 p-6"
          >
            <h2 className="text-xl font-bold mb-4">Scan Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.scanTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.2)" />
                <XAxis stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(6,182,212,0.3)' }} />
                <Line type="monotone" dataKey="scans" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl border border-cyan-500/30 p-6"
          >
            <h2 className="text-xl font-bold mb-4">Risk Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analyticsData.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Vulnerability Types */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-xl border border-cyan-500/30 p-6 lg:col-span-2"
          >
            <h2 className="text-xl font-bold mb-4">Top Vulnerability Types</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.vulnerabilityTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.2)" />
                <XAxis stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(6,182,212,0.3)' }} />
                <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
