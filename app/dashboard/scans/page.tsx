'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Scan {
  _id: string;
  target: string;
  riskScore: number;
  grade: string;
  threatLevel: string;
  vulnCount: number;
  status: string;
  createdAt: string;
}

export default function ScansPage() {
  const router = useRouter();
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchScans(token);
  }, [router]);

  const fetchScans = async (token: string) => {
    try {
      const response = await fetch('/api/scans', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setScans(data.scans || []);
    } catch (error) {
      console.error('Failed to fetch scans:', error);
      toast.error('Failed to load scans');
    } finally {
      setLoading(false);
    }
  };

  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || scan.threatLevel === filterLevel;
    const matchesStatus = filterStatus === 'all' || scan.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/10 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Scan History</h1>
        <p className="text-slate-400">View and manage all your security scans</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl p-4 border border-cyan-500/20 space-y-4 sm:space-y-0"
      >
        <div className="grid sm:grid-cols-4 gap-4">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search targets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-cyan-500/20 rounded-lg focus:border-cyan-500 outline-none transition"
            />
          </div>

          {/* Risk Level Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2 bg-slate-900/50 border border-cyan-500/20 rounded-lg focus:border-cyan-500 outline-none transition"
          >
            <option value="all">All Risk Levels</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-slate-900/50 border border-cyan-500/20 rounded-lg focus:border-cyan-500 outline-none transition"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="scanning">Scanning</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </motion.div>

      {/* Scans Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-cyan-500/20 overflow-hidden"
      >
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredScans.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p>No scans found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-cyan-500/10 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Target</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Risk Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Grade</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Threat Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Vulnerabilities</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10">
                {filteredScans.map((scan, idx) => (
                  <motion.tr
                    key={scan._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-slate-800/50 transition"
                  >
                    <td className="px-6 py-4 font-medium truncate">{scan.target}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                          {scan.riskScore}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-semibold">
                        {scan.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(scan.threatLevel)}`}>
                        {scan.threatLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{scan.vulnCount}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(scan.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/dashboard/scans/${scan._id}`} className="p-2 hover:bg-slate-800 rounded transition">
                          <Eye size={16} className="text-cyan-400" />
                        </Link>
                        <button className="p-2 hover:bg-slate-800 rounded transition">
                          <Download size={16} className="text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-800 rounded transition">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
