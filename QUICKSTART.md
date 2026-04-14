# 🚀 SecureScan AI - Complete Setup Guide

## ⚡ Quick Start (5 minutes)

### Prerequisites
- ✅ Node.js 18+
- ✅ MongoDB (local or Atlas)
- ✅ npm or yarn

### 1. Install Dependencies
```bash
cd hackathonproject
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

**Edit `.env.local`:**
```env
MONGODB_URI=mongodb://localhost:27017/securescan-ai
JWT_SECRET=dev_secret_key_change_in_production
```

### 3. Start Local MongoDB
```bash
# If installed locally
mongod

# OR use MongoDB Atlas
# Get connection string and update MONGODB_URI
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

### 5. Login with Demo Credentials
- **Email**: demo@example.com
- **Password**: Demo123!

## 📁 Project Structure

```
hackathonproject/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/login/route.ts
│   │   ├── auth/register/route.ts
│   │   └── scans/route.ts
│   ├── dashboard/                # Protected dashboard
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx
│   └── globals.css
│
├── components/                   # React components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── GradientBackground.tsx
│   └── dashboard/
│       ├── RiskScoreCard.tsx
│       ├── VulnerabilityOverview.tsx
│       ├── RecentActivityTimeline.tsx
│       ├── CriticalAlerts.tsx
│       ├── QuickStatistics.tsx
│       └── ScanModal.tsx
│
├── models/                       # MongoDB schemas
│   ├── User.ts
│   ├── Scan.ts
│   └── Vulnerability.ts
│
├── lib/                          # Utilities
│   ├── mongodb.ts
│   ├── jwt.ts
│   └── scanner.ts
│
├── types/                        # TypeScript types
│   └── globals.d.ts
│
├── scripts/                      # Utility scripts
│   └── seed.js
│
├── README.md                     # Full documentation
├── API_DOCS.md                   # API reference
├── DEPLOYMENT.md                 # Deployment guide
└── package.json
```

## 🔑 Key Features

### ✨ Core Functionality
- **User Authentication**: JWT-based login/register
- **Security Scanning**: Simulated port scanning and vulnerability detection
- **Risk Scoring**: CVSS-inspired algorithm with A-F grading
- **Real-time Dashboard**: Animated charts and live metrics
- **Scan History**: Complete vulnerability tracking
- **Professional Reports**: PDF export and detailed analysis

### 🎨 UI/UX
- Dark theme with cyan/blue accents
- Smooth Framer Motion animations
- Glassmorphism design patterns
- Fully responsive mobile/tablet/desktop
- Real-time progress indicators
- Skeleton loaders and transitions

### 🔐 Security
- Password hashing with bcrypt
- JWT token authentication
- Input validation
- SQL injection detection simulation
- XSS prevention
- Secure headers checking

### 📊 Analytics
- Risk score visualization
- Vulnerability distribution charts
- Open port analysis
- Historical trend analysis
- Critical alerts highlighting

## 📋 Important Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run seed             # Seed demo data

# Linting
npm run lint             # Run ESLint
```

## 🗄️ Database Models

### User Schema
```typescript
{
  name: string;
  email: string (unique);
  password: string (hashed);
  role: 'user' | 'admin';
  subscription: 'free' | 'pro' | 'enterprise';
  scansUsed: number;
  scansLimit: number;
  createdAt: Date;
}
```

### Scan Schema
```typescript
{
  userId: ObjectId;
  target: string;
  targetType: 'url' | 'ip' | 'domain';
  status: 'pending' | 'scanning' | 'completed' | 'failed';
  riskScore: 0-100;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  threatLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  vulnCount: number;
  vulnerabilities: ObjectId[];
  openPorts: number[];
  duration: number (seconds);
}
```

### Vulnerability Schema
```typescript
{
  scanId: ObjectId;
  title: string;
  description: string;
  type: string;
  severity: 'Crítico' | 'Alto' | 'Medio' | 'Bajo' | 'Informativo';
  cvssScore: 0-10;
  port?: number;
  protocol?: string;
  evidence: string;
  mitigation: string;
  cveIds: string[];
}
```

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register          Create account
POST   /api/auth/login             Login
```

### Scans
```
GET    /api/scans                  Get all scans (auth required)
POST   /api/scans                  Create scan (auth required)
```

Full API documentation: See `API_DOCS.md`

## 🎯 Component Architecture

### Layout Hierarchy
```
RootLayout
├── Navbar
├── Dashboard
│   ├── Sidebar
│   ├── TopNavbar
│   └── Main Content
│       ├── QuickStatistics
│       ├── RiskScoreCard
│       ├── VulnerabilityOverview
│       ├── RecentActivityTimeline
│       └── CriticalAlerts
└── Modals
    └── ScanModal
```

### State Management
- React hooks (useState, useEffect)
- localStorage for auth tokens
- Client-side user data caching
- Simple, scalable approach

## 🚀 Deployment

### Quick Deployment Options

#### 1. Vercel (Recommended)
```bash
npm i -g vercel
vercel deploy --prod
```

#### 2. Render
Push to GitHub → Auto-deploy

#### 3. Docker
```bash
docker-compose up -d
```

See `DEPLOYMENT.md` for detailed instructions on all platforms.

## 🔒 Security Checklist

### Development
- ✅ Password hashing enabled
- ✅ JWT authentication implemented
- ✅ Input validation active
- ✅ CORS configured
- ✅ Environment variables used

### Production Recommended
- ⚠️ Update JWT_SECRET to strong value (min 32 chars)
- ⚠️ Enable HTTPS/TLS only
- ⚠️ Setup WAF (Cloudflare recommended)
- ⚠️ Configure rate limiting
- ⚠️ Monitor error logs
- ⚠️ Regular security audits
- ⚠️ Keep dependencies updated

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
```bash
mongod  # Start MongoDB locally
# OR update MONGODB_URI for Atlas
```

### Login Not Working
- Clear browser cookies/localStorage
- Check JWT_SECRET in .env.local
- Verify database has users
- Check browser console for errors

### Scans Not Showing
- Ensure user is authenticated
- Check browser localStorage has token
- Verify database connection
- Check API response in Network tab

### Build Errors
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Documentation Files

- **README.md** - Full project documentation
- **API_DOCS.md** - API endpoint reference
- **DEPLOYMENT.md** - Deployment strategies
- **This file** - Quick setup guide

## 🎓 Learning Resources

### Next.js
- [Next.js App Router](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Authentication
- [JWT.io](https://jwt.io) - Token debugging
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

### Database
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)

### UI/Styling
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🎉 What's Included

✅ Complete frontend (Next.js + React)
✅ Backend API (Node.js/Express patterns)
✅ Database models (MongoDB/Mongoose)
✅ Authentication system (JWT + bcrypt)
✅ Security scanning engine (simulation)
✅ Dashboard with analytics
✅ Responsive design
✅ Smooth animations
✅ Professional UI/UX
✅ Production-ready code
✅ Complete documentation
✅ Deployment guides

## 🚀 Next Steps

1. **Run locally**
   ```bash
   npm install
   npm run dev
   ```

2. **Explore the codebase**
   - Check out components in `/components`
   - Review API routes in `/app/api`
   - Examine models in `/models`

3. **Create first scan**
   - Login with demo credentials
   - Click "New Scan"
   - Enter target URL/IP
   - View results

4. **Customize**
   - Update branding in components
   - Modify color scheme in tailwind.config.js
   - Add custom scanning logic in `/lib/scanner.ts`

5. **Deploy**
   - Follow DEPLOYMENT.md
   - Choose your platform
   - Configure environment variables
   - Deploy to production

## 💡 Tips

- **Development**: Use `npm run dev` with file watching enabled
- **Testing**: Use demo credentials to avoid creating test accounts
- **Debugging**: Check browser DevTools and server logs
- **Performance**: Database queries are optimized by default
- **Scaling**: Consider adding Redis for caching in production

## 📞 Support

- 📖 Check documentation files first
- 🔍 Search in code comments
- 💬 Review API_DOCS.md for endpoints
- 📧 Contact: support@securescan.ai

## ⭐ Production Checklist

Before deploying to production:

- [ ] Update all `.env` variables
- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Test all authentication flows
- [ ] Verify API endpoints
- [ ] Check responsive design
- [ ] Enable HTTPS
- [ ] Setup monitoring/logging
- [ ] Test database backups
- [ ] Configure email service
- [ ] Create admin account
- [ ] Update privacy policy
- [ ] Setup rate limiting
- [ ] Configure CORS properly
- [ ] Test on production database

## 🎯 Success Criteria

Your deployment is successful when:

✅ Landing page loads
✅ User registration works
✅ User login works
✅ Dashboard displays
✅ New scan can be created
✅ Scan results show
✅ Charts render properly
✅ Responsive on mobile
✅ No console errors
✅ Database connected

---

**You're all set! 🚀 Happy scanning with SecureScan AI!**

For detailed information, see README.md, API_DOCS.md, or DEPLOYMENT.md
