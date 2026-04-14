'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Lock, User, Sun, Moon, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const settingsSections = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        { label: 'Full Name', value: user?.name, type: 'text' },
        { label: 'Email Address', value: user?.email, type: 'email', disabled: true },
        { label: 'Subscription Plan', value: user?.subscription?.toUpperCase(), type: 'text', disabled: true },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', toggle: true, value: emailAlerts, onChange: setEmailAlerts },
        { label: 'Scan Alerts', toggle: true, value: notificationsEnabled, onChange: setNotificationsEnabled },
      ],
    },
    {
      title: 'Display',
      icon: darkMode ? Moon : Sun,
      items: [
        { label: 'Dark Mode', toggle: true, value: darkMode, onChange: setDarkMode },
      ],
    },
    {
      title: 'Security',
      icon: Lock,
      items: [
        { label: '2-Factor Authentication', toggle: true, value: false, onChange: () => { } },
        { label: 'Change Password', type: 'button', action: () => toast('Change password feature coming soon') },
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Settings size={32} className="text-cyan-400" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <p className="text-slate-400">Manage your account preferences and security settings</p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIdx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={sectionIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
              className="glass rounded-2xl border border-cyan-500/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Icon size={24} className="text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item: any, itemIdx: number) => (
                  <motion.div
                    key={itemIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: itemIdx * 0.05 }}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition"
                  >
                    <span className="text-slate-300">{item.label}</span>

                    {item.toggle ? (
                      <button
                        onClick={() => item.onChange(!item.value)}
                        className={`relative w-12 h-6 rounded-full transition ${
                          item.value ? 'bg-cyan-500' : 'bg-slate-700'
                        }`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: item.value ? 24 : 2 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        />
                      </button>
                    ) : item.type === 'button' ? (
                      <button
                        onClick={item.action}
                        className="px-4 py-2 text-sm rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition"
                      >
                        Update
                      </button>
                    ) : (
                      <input
                        type={item.type || 'text'}
                        value={item.value}
                        disabled={item.disabled}
                        className="px-4 py-2 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-right disabled:opacity-50 disabled:cursor-not-allowed focus:border-cyan-500 outline-none transition"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl border border-red-500/20 p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-red-950/10"
      >
        <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition text-left font-medium">
            • Delete Account
          </button>
          <p className="text-xs text-red-400/70">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 justify-end pt-4 border-t border-cyan-500/10"
      >
        <button className="px-6 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition font-medium">
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveSettings}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50"
        >
          <Save size={20} />
          {loading ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </motion.div>
    </div>
  );
}
