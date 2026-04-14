'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileText, Calendar, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Report {
  id: string;
  name: string;
  target: string;
  createdAt: string;
  vulnerabilities: number;
  riskScore: number;
  status: 'completed' | 'processing' | 'failed';
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'API Security Assessment',
      target: 'api.example.com',
      createdAt: '2024-04-12',
      vulnerabilities: 5,
      riskScore: 7.2,
      status: 'completed',
    },
    {
      id: '2',
      name: 'Web App Scan',
      target: 'app.example.com',
      createdAt: '2024-04-10',
      vulnerabilities: 12,
      riskScore: 6.8,
      status: 'completed',
    },
    {
      id: '3',
      name: 'Infrastructure Audit',
      target: '192.168.1.0/24',
      createdAt: '2024-04-08',
      vulnerabilities: 3,
      riskScore: 4.1,
      status: 'completed',
    },
  ]);

  const handleDownload = (reportId: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Generating PDF...',
        success: 'Report downloaded!',
        error: 'Failed to download',
      }
    );
  };

  const handleDelete = (reportId: string) => {
    setReports(reports.filter(r => r.id !== reportId));
    toast.success('Report deleted');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'processing':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 8) return 'text-red-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-blue-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link href="/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Security Reports</h1>
            <p className="text-slate-400">View and download your vulnerability assessment reports</p>
          </div>
        </div>

        {/* Reports Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl border border-cyan-500/30 p-6 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="px-4 py-3 text-left text-cyan-400 font-medium">Report</th>
                <th className="px-4 py-3 text-left text-cyan-400 font-medium">Target</th>
                <th className="px-4 py-3 text-left text-cyan-400 font-medium">Date</th>
                <th className="px-4 py-3 text-left text-cyan-400 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-cyan-400 font-medium">Risk Score</th>
                <th className="px-4 py-3 text-left text-cyan-400 font-medium">Vulns</th>
                <th className="px-4 py-3 text-left text-cyan-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-slate-800 hover:bg-slate-800/30 transition"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-cyan-400" />
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{report.target}</td>
                  <td className="px-4 py-3 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`capitalize font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${getRiskColor(report.riskScore)}`}>
                      {report.riskScore}/10
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{report.vulnerabilities}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(report.id)}
                        className="p-2 hover:bg-cyan-500/20 rounded-lg transition text-cyan-400"
                        title="Download"
                      >
                        <Download size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(report.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {reports.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <FileText size={32} className="mx-auto mb-2 opacity-50" />
              <p>No reports yet. Start a scan to generate a report.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
