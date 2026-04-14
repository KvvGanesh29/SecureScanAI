# SecureScan AI - Intelligent Vulnerability Intelligence Platform

A production-grade, enterprise cybersecurity SaaS platform featuring AI-powered vulnerability detection, intelligent threat analysis, and comprehensive security reporting.

![SecureScan AI Banner](https://via.placeholder.com/1200x400?text=SecureScan+AI+-+Enterprise+Cybersecurity)

## 🚀 Features

### Core Security Features
- **🔍 Port Scanning**: Real-time discovery of open ports and services
- **📊 Risk Scoring**: AI-powered CVSS-style vulnerability assessment
- **🛡️ Security Headers Analysis**: Check for CSP, HSTS, X-Frame-Options, and more
- **💉 Threat Simulation**: SQL injection, XSS, and vulnerability detection
- **📈 Real-Time Dashboard**: Live monitoring with animated visualizations
- **📄 Professional Reports**: PDF and JSON export with remediation guidance

### Enterprise Features
- **JWT Authentication**: Secure token-based user sessions
- **Role-Based Access**: User and Admin roles with different permissions
- **Subscription Tiers**: Free, Pro, and Enterprise plans with usage limits
- **Two-Factor Authentication**: UI prepared for 2FA implementation
- **Audit Logs**: Track all security events and scans
- **API Access**: RESTful API for integrations

### UI/UX Excellence
- **Dark Theme**: Premium cybersecurity aesthetic
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Real-Time Updates**: Live scan progress and notifications
- **Glassmorphism**: Modern frosted glass UI components
- **Accessibility**: Full keyboard navigation and ARIA labels

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications
- **Lucide Icons** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless backend
- **Express.js** - HTTP server (optional for standalone)
- **Node.js** - JavaScript runtime

### Database
- **MongoDB** - NoSQL database (via Mongoose ODM)
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **JWT** - Session tokens
- **bcryptjs** - Password hashing
- **Helmet.js** - Security headers

## 📋 Prerequisites

- **Node.js** 18+ with npm or yarn
- **MongoDB** 4.4+ (local or Atlas cloud)
- **Git** for version control

### Optional
- **Docker** for containerization
- **Redis** for caching (not required in base setup)

## 🚀 Quick Start

### 1. Clone & Setup

```bash
# Navigate to project directory
cd hackathonproject

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local`:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database - Use MongoDB Atlas for cloud
MONGODB_URI=mongodb://localhost:27017/securescan-ai

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d

# Security
BCRYPT_ROUNDS=10
```

### 3. Start MongoDB

```bash
# Local MongoDB
mongod

# OR use MongoDB Atlas
# Update MONGODB_URI in .env.local with your Atlas connection string
```

### 4. Seed Database (Optional)

```bash
npm run seed
```

This creates demo users:
- **Email**: demo@example.com | **Password**: Demo123!
- **Admin Email**: admin@example.com | **Password**: Demo123!

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📖 Project Structure

```
securescan-ai/
├── app/                           # Next.js App Router
│   ├── api/                       # API routes
│   │   ├── auth/                  # Authentication endpoints
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   └── scans/route.ts         # Scan endpoints
│   ├── login/                     # Login page
│   ├── register/                  # Registration page
│   ├── dashboard/                 # Protected dashboard
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
│
├── components/                    # Reusable React components
│   ├── Navbar.tsx                 # Navigation bar
│   ├── Sidebar.tsx                # Dashboard sidebar
│   ├── GradientBackground.tsx     # Animated background
│   └── dashboard/                 # Dashboard components
│       ├── RiskScoreCard.tsx       # Risk score visualization
│       ├── VulnerabilityOverview.tsx # Charts
│       ├── RecentActivityTimeline.tsx # Activity feed
│       ├── CriticalAlerts.tsx      # Alert panel
│       ├── QuickStatistics.tsx     # Stats cards
│       └── ScanModal.tsx           # New scan form
│
├── models/                        # MongoDB schemas
│   ├── User.ts                    # User model
│   ├── Scan.ts                    # Scan model
│   └── Vulnerability.ts           # Vulnerability model
│
├── lib/                           # Utility functions
│   ├── mongodb.ts                 # Database connection
│   ├── jwt.ts                     # JWT utilities
│   └── scanner.ts                 # Security scanning logic
│
├── scripts/                       # Utility scripts
│   └── seed.js                    # Database seeding
│
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── next.config.js                 # Next.js config
├── tailwind.config.js             # Tailwind config
└── postcss.config.js              # PostCSS config
```

## 🔐 Authentication Flow

### Registration
1. User enters name, email, password
2. Password strength validated
3. Password hashed with bcrypt (10 rounds)
4. User stored in MongoDB
5. JWT token generated
6. Redirect to dashboard

### Login
1. User enters email and password
2. Email lookup in database
3. Password compared with hash
4. JWT token generated on success
5. Token stored in localStorage
6. User data cached client-side

### Protected Routes
- All dashboard routes require valid JWT
- Token verified on API requests
- Automatic redirect to login if expired

## 🔍 Vulnerability Scanning

### Simulation-Based Approach
The scanning engine performs realistic checks:

1. **Port Scanning**: Simulates network port discovery
2. **Security Headers**: Checks for CSP, HSTS, X-Frame-Options, etc.
3. **Vulnerability Detection**: Simulates SQL injection, XSS detection
4. **SSL/TLS Analysis**: Detects weak cipher suites
5. **Service Enumeration**: Identifies common services

### Risk Scoring Algorithm
- Severity-weighted scoring system
- CVSS-inspired rating (0-10)
- Grade assignment (A-F)
- Threat level classification

### Vulnerability Data Structure
```typescript
{
  title: string;
  description: string;
  type: string;
  severity: 'Crítico' | 'Alto' | 'Medio' | 'Bajo' | 'Informativo';
  cvssScore: number; // 0-10
  port?: number;
  protocol?: string;
  evidence: string;
  mitigation: string;
  cveIds: string[];
}
```

## 📊 Dashboard Components

### Risk Score Card
- Animated circular progress indicator
- Real-time risk percentage
- Security grade (A-F)
- Color-coded threat levels

### Vulnerability Overview
- Pie chart: Risk distribution
- Bar chart: Open ports by service
- Line chart: Risk score trend

### Recent Activity Timeline
- Chronological scan history
- Status indicators (✓ Completed, ⏱ Scanning, ✗ Failed)
- Quick access to details

### Critical Alerts Panel
- Highlighted critical vulnerabilities
- Real-time pulsing animations
- One-click access to remediation

### Quick Statistics
- Total scans count
- Critical issues summary
- Average risk score
- Security trend

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register       # Create new account
POST   /api/auth/login          # User login
POST   /api/auth/logout         # User logout
```

### Scans
```
GET    /api/scans               # List user scans (requires auth)
POST   /api/scans               # Create new scan (requires auth)
GET    /api/scans/:id           # Get scan details
DELETE /api/scans/:id           # Delete scan
```

### Reports
```
GET    /api/scans/:id/report    # Generate PDF report
GET    /api/scans/:id/export    # Export JSON
```

## 🎨 UI/UX Design System

### Color Palette
- **Primary**: Slate 950-900 (#0f172a - #111827)
- **Accent**: Cyan 500 (#00d9ff)
- **Danger**: Red 400-500 (#ff4444)
- **Warning**: Amber 500 (#ffaa00)
- **Success**: Green 500 (#00ff88)

### Typography
- **Font Family**: Inter, Poppins
- **Headings**: Bold 24-48px
- **Body**: Regular 14-16px
- **Small Text**: 12px, slate-400

### Animations
- Page transitions: 0.3-0.8s ease
- Component entrance: staggered 0.1-0.2s
- Hover effects: 0.2s scale/color change
- Loading spinners: 1.5-2s rotations

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚢 Deployment

### Vercel (Frontend Only)

```bash
# Build
npm run build

# Deploy
vercel deploy
```

### Render (Full Stack)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render Service**
   - Visit [render.com](https://render.com)
   - Connect GitHub repository
   - Select "New Web Service"
   - Choose Node.js runtime
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`

3. **Environment Variables**
   Add in Render dashboard:
   ```
   MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/dbname
   JWT_SECRET = your_production_secret_key
   NODE_ENV = production
   ```

### Heroku Alternative

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create securescan-ai

# Set environment variables
heroku config:set MONGODB_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="..."

# Deploy
git push heroku main
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build image
docker build -t securescan-ai .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb://mongo:27017/securescan-ai" \
  -e JWT_SECRET="your_secret" \
  securescan-ai
```

## 📝 Database Setup

### MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and organization
3. Create cluster (free tier available)
4. Add IP address to whitelist (0.0.0.0/0 for development)
5. Create database user
6. Copy connection string
7. Replace `MONGODB_URI` in `.env.local`

### Local MongoDB

```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Windows
# Install from https://docs.mongodb.com/manual/installation/

# Connect
mongo
```

### Database Collections

**Users Collection**
- name (string)
- email (string, unique)
- password (string, hashed)
- role (enum: user, admin)
- subscription (enum: free, pro, enterprise)
- scansUsed (number)
- scansLimit (number)
- createdAt (date)

**Scans Collection**
- userId (ObjectId reference)
- target (string)
- targetType (enum: url, ip, domain)
- status (enum: pending, scanning, completed, failed)
- riskScore (number: 0-100)
- grade (enum: A-F)
- vulnCount (number)
- vulnerabilities (array of ObjectId references)
- scanStartTime (date)
- scanEndTime (date)
- duration (number, seconds)

**Vulnerabilities Collection**
- scanId (ObjectId reference)
- title (string)
- description (string)
- severity (enum: Crítico, Alto, Medio, Bajo, Informativo)
- cvssScore (number: 0-10)
- port (number)
- protocol (string)
- evidence (string)
- mitigation (string)
- cveIds (array of strings)

## 🔒 Security Best Practices

### Implemented
✅ Password hashing with bcrypt (10 rounds)
✅ JWT token authentication
✅ Secure header configuration
✅ Input validation on all forms
✅ SQL injection simulation detection
✅ XSS protection in rendering
✅ HTTPS ready (use in production)
✅ Environment variables for secrets
✅ CORS configuration
✅ Rate limiting ready (add Redis)

### Recommended for Production
⚠️ Enable HTTPS/TLS only
⚠️ Implement rate limiting
⚠️ Add Redis cache layer
⚠️ Setup database backups
⚠️ Monitor error logs
⚠️ Implement Web Application Firewall
⚠️ Setup DDoS protection (Cloudflare)
⚠️ Regular security audits
⚠️ Implement 2FA completely
⚠️ Add vulnerability scanning

## 🧪 Testing

```bash
# Unit tests (add Jest)
npm test

# E2E tests (add Cypress/Playwright)
npm run e2e

# Build check
npm run build

# Linting
npm run lint
```

## 📞 Support & Documentation

### API Documentation
See `API_DOCS.md` for detailed endpoint documentation

### Troubleshooting

**Connection Refused**
- Ensure MongoDB is running
- Check MONGODB_URI in `.env.local`
- Verify network connectivity

**JWT Token Expired**
- Tokens valid for 7 days by default
- Clear localStorage and re-login
- Change JWT_EXPIRE in .env.local

**Scans Not Showing**
- Verify user is logged in (check localStorage)
- Check browser console for errors
- Ensure MongoDB has scan documents

## 📄 License

MIT License - See LICENSE.md for details

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📧 Contact

**Email**: support@securescan.ai
**Website**: https://securescan.ai
**Twitter**: @SecureScanAI

---

**Made with ❤️ by the SecureScan AI Team**

### Quick Demo Credentials
- **Email**: demo@example.com
- **Password**: Demo123!

### Admin Credentials
- **Email**: admin@example.com
- **Password**: Demo123!
