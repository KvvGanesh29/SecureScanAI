import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import { dbConnect } from './lib/mongodb';
import User from './models/User';
import Scan from './models/Scan';
import Vulnerability from './models/Vulnerability';

const seedData = async () => {
  try {
    await dbConnect();

    // Clear collections
    await User.deleteMany({});
    await Scan.deleteMany({});
    await Vulnerability.deleteMany({});

    // Create demo users
    const hashedPassword = await bcryptjs.hash('Demo123!', 10);

    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword,
      role: 'user',
      subscription: 'pro',
      scansUsed: 5,
      scansLimit: 100,
    });

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      subscription: 'enterprise',
      scansUsed: 50,
      scansLimit: Infinity,
    });

    // Create sample scans
    const scan1 = await Scan.create({
      userId: demoUser._id,
      target: 'example.com',
      targetType: 'domain',
      status: 'completed',
      riskScore: 72,
      grade: 'C',
      threatLevel: 'High',
      vulnCount: 8,
      openPorts: [80, 443, 22],
      scanStartTime: new Date(Date.now() - 86400000),
      scanEndTime: new Date(Date.now() - 86400000 + 120000),
      duration: 120,
    });

    const scan2 = await Scan.create({
      userId: demoUser._id,
      target: '192.168.1.100',
      targetType: 'ip',
      status: 'completed',
      riskScore: 45,
      grade: 'D',
      threatLevel: 'Medium',
      vulnCount: 3,
      openPorts: [80, 443],
      scanStartTime: new Date(Date.now() - 43200000),
      scanEndTime: new Date(Date.now() - 43200000 + 90000),
      duration: 90,
    });

    // Create vulnerabilities
    await Vulnerability.create(
      {
        scanId: scan1._id,
        title: 'Missing Security Headers',
        description: 'The website is missing critical security headers.',
        type: 'Security Header',
        severity: 'Alto',
        cvssScore: 7.2,
        port: 443,
        protocol: 'HTTPS',
        evidence: 'Headers X-Frame-Options and CSP not found',
        mitigation: 'Configure security headers in web server config',
        cveIds: [],
      },
      {
        scanId: scan1._id,
        title: 'Weak SSL/TLS Configuration',
        description: 'Server accepts deprecated TLS versions',
        type: 'Weak Cryptography',
        severity: 'Alto',
        cvssScore: 7.5,
        port: 443,
        protocol: 'HTTPS',
        evidence: 'TLS 1.0 detected',
        mitigation: 'Update to TLS 1.2 or higher',
        cveIds: ['CVE-2014-3566'],
      }
    );

    console.log('✓ Database seeding completed successfully!');
    console.log('Demo user email: demo@example.com');
    console.log('Demo password: Demo123!');
    console.log('Admin email: admin@example.com');
    console.log('Admin password: Demo123!');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
