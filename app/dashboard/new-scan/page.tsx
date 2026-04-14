'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Zap, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NewScanPage() {
  const router = useRouter();
  const [target, setTarget] = useState('');
  const [targetType, setTargetType] = useState<'url' | 'ip' | 'domain'>('url');
  const [loading, setLoading] = useState(false);

  const targetTypes = [
    { id: 'url', label: 'Website URL', icon: Globe, description: 'Scan a full URL (e.g., https://example.com)' },
    { id: 'domain', label: 'Domain', icon: Zap, description: 'Scan a domain (e.g., example.com)' },
    { id: 'ip', label: 'IP Address', icon: BarChart3, description: 'Scan an IP address (e.g., 192.168.1.1)' },
  ];

  // Detect target type automatically
  const detectTargetType = (input: string): 'url' | 'ip' | 'domain' => {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return 'url';
    }
    // Simple IP regex
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(input)) {
      return 'ip';
    }
    return 'domain';
  };

  const handleTargetChange = (value: string) => {
    setTarget(value);
    if (value.trim()) {
      const detected = detectTargetType(value);
      setTargetType(detected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!target.trim()) {
      toast.error('Please enter a target');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/scans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          target: target.trim(),
          targetType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to start scan');
      }

      toast.success('Scan started successfully!');
      router.push('/dashboard/scans');
    } catch (error: any) {
      console.error('Scan error:', error);
      toast.error(error.message || 'Failed to start scan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">New Security Scan</h1>
          <p className="text-slate-400">Initiate a vulnerability scan on your target</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Target Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl border border-cyan-500/30 p-6"
          >
            <label className="block text-sm font-medium mb-2 text-slate-300">Target URL or IP</label>
            <input
              type="text"
              value={target}
              onChange={(e) => handleTargetChange(e.target.value)}
              placeholder="https://example.com or 192.168.1.1"
              className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500"
            />
            {target && (
              <p className="text-xs text-cyan-400 mt-2">Detected type: <span className="font-medium capitalize">{targetType}</span></p>
            )}
          </motion.div>

          {/* Target Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium mb-4 text-slate-300">Target Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {targetTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <motion.button
                    key={type.id}
                    type="button"
                    onClick={() => setTargetType(type.id as 'url' | 'ip' | 'domain')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      targetType === type.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700 bg-slate-900/50 hover:border-cyan-500/50'
                    }`}
                  >
                    <Icon size={24} className="mb-2 text-cyan-400" />
                    <h3 className="font-medium text-white">{type.label}</h3>
                    <p className="text-xs text-slate-400 mt-1">{type.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Starting Scan...' : 'Start Scan'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
