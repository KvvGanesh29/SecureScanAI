'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Plus, History, BarChart3, Settings, LogOut, X, Shield, AlertCircle
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  onClose: () => void;
}

export default function Sidebar({ onLogout, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Plus, label: 'New Scan', href: '/dashboard/new-scan' },
    { icon: History, label: 'Scan History', href: '/dashboard/scans' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: AlertCircle, label: 'Reports', href: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3 }}
      className="fixed lg:static w-80 h-full bg-slate-950/95 backdrop-blur-md border-r border-cyan-500/10 flex flex-col z-40"
    >
      {/* Header */}
      <div className="p-6 border-b border-cyan-500/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">SecureScan</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-slate-800 rounded transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <motion.div key={item.href} whileHover={{ x: 4 }}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-400'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-cyan-500/10 space-y-3">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition text-left">
          <Settings size={20} />
          <span>Account</span>
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition text-left font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
