'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, BarChart3, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { useState } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Shield,
      title: 'Port Scanning',
      description: 'Comprehensive port discovery and service identification',
    },
    {
      icon: AlertCircle,
      title: 'Risk Scoring',
      description: 'AI-powered vulnerability assessment and severity rating',
    },
    {
      icon: Zap,
      title: 'Threat Simulation',
      description: 'Security header analysis and XSS/SQL injection detection',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Dashboard',
      description: 'Live monitoring and analytics visualization',
    },
    {
      icon: Clock,
      title: 'Report Generation',
      description: 'Professional PDF reports with mitigation strategies',
    },
    {
      icon: CheckCircle,
      title: 'Compliance Tracking',
      description: 'CVSS scoring and compliance framework mapping',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CISO at TechCorp',
      content: 'SecureScan AI has transformed our vulnerability management process. Incredibly accurate and fast.',
    },
    {
      name: 'Marcus Johnson',
      role: 'Security Lead at FinanceHub',
      content: 'The AI-powered threat detection is unmatched. We reduced our detection time by 80%.',
    },
    {
      name: 'Dr. Elena Rodriguez',
      role: 'Head of Security at HealthNet',
      content: 'Professional, reliable, and worth every penny. Our best security investment this year.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      features: ['5 scans/month', 'Basic reports', 'Email support', 'Public dashboard'],
    },
    {
      name: 'Pro',
      price: '$99',
      features: ['Unlimited scans', 'Advanced analytics', 'Priority support', 'Custom branding', 'API access'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Dedicated support', 'Custom integrations', 'SSO/SAML', 'Audit logs', 'SLA guarantee'],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <GradientBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SecureScan</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
            <a href="#testimonials" className="hover:text-cyan-400 transition">Testimonials</a>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition">
              Login
            </Link>
            <Link href="/register" className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={item}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">AI-Powered</span> Vulnerability Intelligence
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Enterprise-grade security scanning and threat detection powered by advanced AI. Identify and remediate vulnerabilities before attackers do.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center gap-2">
                Start Free Scan <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-4 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition font-semibold">
                View Demo
              </button>
            </div>
          </motion.div>

          <motion.div variants={item} className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
            <div className="relative bg-slate-900/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 h-full flex flex-col justify-center items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full"
              />
              <p className="mt-8 text-cyan-400 font-mono text-sm">Scanning infrastructure...</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Security Features</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need for enterprise-grade vulnerability detection and management
          </p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group glass rounded-2xl p-8 border border-cyan-500/0 hover:border-cyan-500/50 cursor-pointer card"
              >
                <div className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 p-4 rounded-lg w-fit mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition">
                  <Icon className="text-cyan-400 group-hover:text-cyan-300 transition" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-300 transition">{feature.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Workflow Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple Security Workflow</h2>
          <p className="text-slate-400 text-lg">Four steps to comprehensive vulnerability analysis</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {['Scan', 'Analyze', 'Prioritize', 'Secure'].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 border border-cyan-500/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold">{step}</h3>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute -right-4 top-1/2 text-cyan-500/50">
                  <ArrowRight size={32} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted by Enterprise Security Teams</h2>
          <p className="text-slate-400 text-lg">Hear from security leaders using SecureScan AI</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="glass rounded-2xl p-8 border border-cyan-500/20"
            >
              <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-cyan-400">{testimonial.name}</p>
                <p className="text-slate-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-lg">Choose the plan that fits your needs</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className={`rounded-2xl p-8 border transition ${
                plan.popular
                  ? 'glass border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 transform md:scale-105'
                  : 'glass border-cyan-500/20'
              }`}
            >
              {plan.popular && (
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle size={20} className="text-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.popular
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50'
                  : 'border border-cyan-500/30 hover:bg-cyan-500/10'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="glass rounded-2xl p-12 border border-cyan-500/30 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Infrastructure?</h2>
          <p className="text-slate-400 mb-8">Start your free vulnerability scan today. No credit card required.</p>
          <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition inline-flex items-center gap-2">
            Start Free Scan <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-cyan-400" />
                <span className="font-bold">SecureScan</span>
              </div>
              <p className="text-slate-400 text-sm">Enterprise vulnerability intelligence platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cyan-500/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2024 SecureScan AI. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition">LinkedIn</a>
              <a href="#" className="hover:text-cyan-400 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
