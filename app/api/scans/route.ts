import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { verifyToken } from '@/lib/jwt';
import User from '@/models/User';
import Scan from '@/models/Scan';
import Vulnerability from '@/models/Vulnerability';
import { performSecurityScan } from '@/lib/scanner';

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check scan limit
    if (user.subscription === 'free' && user.scansUsed >= user.scansLimit) {
      return NextResponse.json(
        { message: 'Scan limit reached. Upgrade to Pro for unlimited scans.' },
        { status: 403 }
      );
    }

    const { target, targetType } = await req.json();

    if (!target || !['url', 'ip', 'domain'].includes(targetType)) {
      return NextResponse.json(
        { message: 'Invalid target or target type' },
        { status: 400 }
      );
    }

    // Create scan record
    const scan = await Scan.create({
      userId: user._id,
      target,
      targetType,
      status: 'scanning',
      scanStartTime: new Date(),
    });

    // Perform security scan
    const scanResults = await performSecurityScan(target, targetType);

    // Create vulnerability records
    const vulnerabilities = await Vulnerability.insertMany(
      scanResults.vulnerabilities.map((vuln: any) => ({
        scanId: scan._id,
        ...vuln,
      }))
    );

    // Update scan with results
    scan.status = 'completed';
    scan.scanEndTime = new Date();
    scan.duration = (scan.scanEndTime.getTime() - scan.scanStartTime.getTime()) / 1000;
    scan.riskScore = scanResults.riskScore;
    scan.grade = scanResults.grade;
    scan.threatLevel = scanResults.threatLevel;
    scan.vulnCount = vulnerabilities.length;
    scan.openPorts = scanResults.openPorts;
    scan.vulnerabilities = vulnerabilities.map((v: any) => v._id);

    await scan.save();

    // Increment scans used
    user.scansUsed += 1;
    await user.save();

    return NextResponse.json({
      message: 'Scan completed',
      scan: {
        id: scan._id,
        target: scan.target,
        riskScore: scan.riskScore,
        grade: scan.grade,
        threatLevel: scan.threatLevel,
        vulnCount: scan.vulnCount,
        duration: scan.duration,
        vulnerabilities: vulnerabilities.map((v: any) => ({
          id: v._id,
          title: v.title,
          severity: v.severity,
          cvssScore: v.cvssScore,
          port: v.port,
        })),
      },
    });
  } catch (error: any) {
    console.error('Scan error:', error);
    return NextResponse.json(
      { message: 'Scan failed: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();

    const scans = await Scan.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .populate('vulnerabilities')
      .limit(50);

    return NextResponse.json({ scans });
  } catch (error: any) {
    console.error('Get scans error:', error);
    return NextResponse.json(
      { message: 'Failed to get scans: ' + error.message },
      { status: 500 }
    );
  }
}
