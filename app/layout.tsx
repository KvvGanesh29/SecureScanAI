'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>SecureScan AI - Vulnerability Intelligence Platform</title>
        <meta name="description" content="AI-powered vulnerability intelligence and threat detection platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white min-h-screen">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
