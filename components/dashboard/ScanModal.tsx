'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ScanModalProps {
  onClose: () => void;
  onScanComplete: () => void;
  scansRemaining: number;
}

export default function ScanModal({ onClose, onScanComplete, scansRemaining }: ScanModalProps) {
  const [target, setTarget] = useState('');
  const [targetType, setTargetType] = useState<'url' | 'ip' | 'domain'>('url');
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate scan progress
    if (scanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 20;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const handleDetectType = (value: string) => {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      setTargetType('url');
    } else if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
      setTargetType('ip');
    } else {
      setTargetType('domain');
    }
  };

  const handleTargetChange = (value: string) => {
    setTarget(value);
    handleDetectType(value);
  };

  const validateTarget = () => {
    if (!target.trim()) {
      setError('Please enter a target');
      return false;
    }

    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

    if (targetType === 'url' && !urlRegex.test(target) && !target.startsWith('http')) {
      setError('Invalid URL format');
      return false;
    }
    if (targetType === 'ip' && !ipRegex.test(target)) {
      setError('Invalid IP address');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTarget()) {
      return;
    }

    if (scansRemaining <= 0) {
      toast.error('Scan limit reached. Upgrade to continue.');
      return;
    }

    setLoading(true);
    setScanning(true);
    setScanProgress(0);

    try {
      const token = localStorage.getItem('token');

      // Simulate some initial progress
      setTimeout(() => setScanProgress(10), 100);
      setTimeout(() => setScanProgress(25), 500);
      setTimeout(() => setScanProgress(40), 1000);

      const response = await fetch('/api/scans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          target,
          targetType,
        }),
      });

      if (!response.ok) {
        throw new Error('Scan failed');
      }

      setScanProgress(100);
      await new Promise(r => setTimeout(r, 1000));

      toast.success('Scan completed successfully!');
      onScanComplete();
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Scan failed');
      setError(err.message || 'Scan failed');
      setScanProgress(0);
    } finally {
      setLoading(false);
      setScanning(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="glass rounded-2xl border border-cyan-500/30 p-8 w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Security Scan</h2>
          <button
            onClick={onClose}
            disabled={scanning}
            className="p-1 hover:bg-slate-800 rounded transition disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2"
          >
            <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        <div className="mb-6 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-xs text-cyan-400">
            <strong>Scans remaining:</strong> {scansRemaining} / {scansRemaining + 1}
          </p>
        </div>

        {scanning ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Scanning: {target}</span>
                <span className="text-sm font-semibold text-cyan-400">{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-400">
              {[
                { name: 'Initializing scan', progress: 5 },
                { name: 'Port scanning', progress: 25 },
                { name: 'Security headers check', progress: 45 },
                { name: 'Vulnerability detection', progress: 70 },
                { name: 'Risk assessment', progress: 90 },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: scanProgress >= step.progress ? 1 : 0.3, x: 0 }}
                  className={`flex items-center justify-between p-2 rounded ${
                    scanProgress >= step.progress ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  <span>{step.name}</span>
                  {scanProgress > step.progress && <span className="text-xs">✓</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Target</label>
              <input
                type="text"
                value={target}
                onChange={e => handleTargetChange(e.target.value)}
                placeholder="example.com or 192.168.1.1"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg focus:border-cyan-500 focus:bg-slate-900 outline-none transition text-white placeholder-slate-500 disabled:opacity-50"
              />
              <p className="text-xs text-slate-400 mt-1">URL, domain, or IP address</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Target Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['url', 'domain', 'ip'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTargetType(type)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg border transition capitalize disabled:opacity-50 ${
                      targetType === type
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                        : 'border-cyan-500/20 text-slate-400 hover:border-cyan-500/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={18} />
              {loading ? 'Scanning...' : 'Start Scan'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
