'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, LogOut, Settings, Bell, User, Search, Plus,
  BarChart3, AlertCircle, Shield, TrendingUp, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';
import RiskScoreCard from '@/components/dashboard/RiskScoreCard';
import VulnerabilityOverview from '@/components/dashboard/VulnerabilityOverview';
import RecentActivityTimeline from '@/components/dashboard/RecentActivityTimeline';
import CriticalAlerts from '@/components/dashboard/CriticalAlerts';
import QuickStatistics from '@/components/dashboard/QuickStatistics';
import ScanModal from '@/components/dashboard/ScanModal';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showScanModal, setShowScanModal] = useState(false);
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalScans: 0,
    criticalVulns: 0,
    averageScore: 0,
    lastScanTime: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
      fetchScans(token);
    } catch (error) {
      console.error('Failed to load user data:', error);
      router.push('/login');
    }
  }, [router]);

  const fetchScans = async (token: string) => {
    try {
      const response = await fetch('/api/scans', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch scans');
      }

      const data = await response.json();
      setScans(data.scans || []);

      // Calculate stats
      if (data.scans.length > 0) {
        const totalScans = data.scans.length;
        const avgScore = Math.round(
          data.scans.reduce((sum: number, scan: any) => sum + scan.riskScore, 0) / totalScans
        );
        const criticalCount = data.scans.filter(
          (scan: any) => scan.threatLevel === 'Critical'
        ).length;

        setStats({
          totalScans,
          criticalVulns: criticalCount,
          averageScore: avgScore,
          lastScanTime: data.scans[0]?.createdAt || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch scans:', error);
      toast.error('Failed to load scans');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleScanComplete = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchScans(token);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar onLogout={handleLogout} onClose={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950/50 backdrop-blur-md border-b border-cyan-500/10 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-3 bg-slate-900/50 rounded-lg px-4 py-2">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search scans..."
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            <div className="border-l border-cyan-500/10 pl-4 flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-slate-400 capitalize">{user.role}</p>
              </div>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </motion.nav>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 lg:p-8 space-y-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-1">Security Dashboard</h1>
                <p className="text-slate-400">
                  {loading ? 'Loading...' : `${stats.totalScans} scans • ${stats.criticalVulns} critical`}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowScanModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                <Plus size={20} />
                New Scan
              </motion.button>
            </div>

            {/* Quick Statistics */}
            <QuickStatistics stats={stats} />

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Risk Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <RiskScoreCard stats={stats} />
              </motion.div>

              {/* Middle Column - Vulnerability Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <VulnerabilityOverview scans={scans} />
              </motion.div>
            </div>

            {/* Bottom Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <RecentActivityTimeline scans={scans} />
              </motion.div>

              {/* Critical Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CriticalAlerts scans={scans} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scan Modal */}
      <AnimatePresence>
        {showScanModal && (
          <ScanModal
            onClose={() => setShowScanModal(false)}
            onScanComplete={handleScanComplete}
            scansRemaining={user.scansLimit - user.scansUsed}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
