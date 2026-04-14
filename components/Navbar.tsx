'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsAuth(!!token);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-40 bg-slate-950/50 backdrop-blur-md border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">SecureScan</span>
        </Link>

        <div className="flex gap-4">
          {isAuth ? (
            <Link href="/dashboard" className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-6 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition">
                Login
              </Link>
              <Link href="/register" className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
