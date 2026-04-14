# Deployment Guide

Complete guide for deploying SecureScan AI to production.

## Pre-Deployment Checklist

- [ ] Update `.env` variables with production values
- [ ] Set strong `JWT_SECRET` (min 32 characters)
- [ ] Configure MongoDB Atlas or production database
- [ ] Test all API endpoints
- [ ] Update domain name in `NEXT_PUBLIC_APP_URL`
- [ ] Setup SSL/TLS certificates
- [ ] Configure CORS for your domain
- [ ] Setup email service for notifications
- [ ]Deploy logging and monitoring

## Option 1: Vercel + MongoDB Atlas (Recommended)

### Step 1: Prepare Repository

```bash
# Initialize Git if not done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git push origin main
```

### Step 2: Setup MongoDB Atlas

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create new project
3. Build a cluster (M0 free tier available)
4. Create database user
5. Whitelist IP address (0.0.0.0/0 for development, specific IPs for production)
6. Copy connection string
7. Replace `{username}` and `{password}` with your credentials

### Step 3: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add BCRYPT_ROUNDS

# Redeploy with env vars
vercel deploy --prod
```

OR use GitHub integration:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Import project
5. Add environment variables in settings
6. Click "Deploy"

### Production Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/securescan-ai?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_production_secret_key_min_32_chars
JWT_EXPIRE=7d

# Security
BCRYPT_ROUNDS=12
NODE_ENV=production

# URLs
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Email (Optional)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

## Option 2: Render + MongoDB Atlas

### Step 1: Create Render Account

1. Sign up at [render.com](https://render.com)
2. Connect GitHub account
3. Create new Web Service

### Step 2: Configure Render Service

```bash
# In Render dashboard:
# Build Command: npm install && npm run build
# Start Command: npm start
# Environment: Node.js 18+
```

### Step 3: Add Environment Variables

In Render dashboard → Environment:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=your_production_secret_key
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.onrender.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.onrender.com
```

### Step 4: Deploy

Push to GitHub → Render auto-deploys

## Option 3: AWS EC2 + RDS

### Step 1: Launch EC2 Instance

```bash
# SSH into instance
ssh -i key-pair.pem ec2-user@your-instance-ip

# Update system
sudo yum update -y
sudo yum install -y nodejs npm

# Clone repository
git clone https://github.com/yourusername/securescan-ai.git
cd securescan-ai
```

### Step 2: Setup MongoDB

Use Amazon DocumentDB or MongoDB Atlas.

### Step 3: Install Dependencies

```bash
npm install
npm run build
```

### Step 4: Start Application

```bash
# Using PM2 for process management
npm install -g pm2
pm2 start "npm start" --name securescan-ai
pm2 save
pm2 startup
```

### Step 5: Setup Nginx Reverse Proxy

```bash
sudo yum install -y nginx

# Edit /etc/nginx/nginx.conf
sudo nano /etc/nginx/nginx.conf
```

Add:
```nginx
upstream app {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 6: Setup SSL with Let's Encrypt

```bash
sudo yum install -y certbot python-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

## Option 4: Docker Containerization

### Step 1: Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build application
COPY . .
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Step 2: Create Docker Compose File

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/securescan-ai
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=securescan-ai

volumes:
  mongo_data:
```

### Step 3: Build and Run

```bash
docker-compose up -d
```

### Step 4: Push to Docker Hub

```bash
# Build image
docker build -t yourusername/securescan-ai:latest .

# Login to Docker Hub
docker login

# Push image
docker push yourusername/securescan-ai:latest
```

## Option 5: Railway

### Step 1: Connect Repository

1. Go to [railway.app](https://railway.app)
2. Create new account
3. Go to Projects → New Project
4. Click "Deploy from GitHub repo"
5. Select your repository

### Step 2: Add Plugins

In Railway dashboard:
- Add MongoDB plugin (or use MongoDB Atlas)

### Step 3: Configure Variables

In Railway settings:
```
MONGODB_URI=from_plugin
JWT_SECRET=your_secret
NODE_ENV=production
```

### Step 4: Deploy

Push to GitHub → Railway auto-deploys

## Monitoring & Logging

### Setup Error Tracking

Using Sentry:

```bash
npm install @sentry/nextjs
```

Initialize in `app/layout.tsx`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Database Backup

MongoDB Atlas automatic backups:
- Automated daily snapshots
- 35-day retention

Manual backup:
```bash
mongodump --uri "mongodb+srv://user:password@cluster.mongodb.net/db" --out ./backup
```

### Performance Monitoring

Use Vercel Analytics:
- Built-in with Vercel deployments
- Monitor Web Vitals
- Track API response times

### Scaling

Auto-scaling options by platform:
- **Vercel**: Automatic (serverless)
- **Render**: Scale with traffic
- **AWS**: Auto-scaling groups
- **Railway**: Auto-scaling available

## Health Checks

### Setup Health Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json(
      { status: 'error' },
      { status: 500 }
    );
  }
}
```

### Configure Health Checks

Platform-specific health check URLs:
```
https://yourdomain.com/api/health
```

## Security in Production

- ✅ Enable HTTPS only
- ✅ Set secure JWT_SECRET
- ✅ Configure CORS properly
- ✅ Enable rate limiting
- ✅ Setup Web Application Firewall
- ✅ Regular security audits
- ✅ Keep dependencies updated
- ✅ Monitor for breaches

## Troubleshooting

### "Can't connect to MongoDB"
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure MONGODB_URI is set in environment

### "JWT token invalid"
- Verify JWT_SECRET is same across all instances
- Check token hasn't expired
- Ensure correct Authorization header format

### "Scans are slow"
- Check database indexes
- Monitor write operations
- Consider caching with Redis
- Optimize scanning logic

### "Out of memory errors"
- Increase container memory
- Check for memory leaks
- Optimize database queries
- Reduce batch sizes

## Support

For issues or questions:
- Check README.md for setup help
- Review API_DOCS.md for endpoint details
- Contact: support@securescan.ai
