# Deployment Strategy for Fortuna.ai

## Overview
This document outlines the recommended deployment strategy for deploying the Fortuna.ai newsletter platform to a custom domain (fortuna.ai) with CI/CD setup.

## Recommended Deployment Options

### Option 1: Vercel (Recommended for React SPAs)

**Pros**:
- Zero-config deployment for React/Vite apps
- Automatic HTTPS and custom domain support
- Built-in CI/CD with Git integration
- Excellent performance with global CDN
- Free tier is generous
- Easiest setup process

**Cons**:
- Primarily frontend-focused (backend would need separate deployment)

**Setup Steps**:
1. Push code to GitHub
2. Connect Vercel to GitHub repository
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`
4. Add custom domain `fortuna.ai` in Vercel dashboard
5. Update DNS records as instructed by Vercel
6. Automatic deployments on every push to main branch

**Cost**: Free tier available, Pro at $20/month

### Option 2: Netlify

**Pros**:
- Similar to Vercel, excellent for React SPAs
- Automatic HTTPS and custom domain
- Built-in CI/CD with Git integration
- Good free tier
- Easy deployment

**Cons**:
- Slightly more configuration needed than Vercel

**Setup Steps**:
1. Push code to GitHub
2. Connect Netlify to GitHub repository
3. Configure build settings (same as Vercel)
4. Add custom domain in Netlify dashboard
5. Update DNS records
6. Automatic deployments on push

**Cost**: Free tier available, Pro at $19/month

### Option 3: Cloudflare Pages

**Pros**:
- Excellent performance with Cloudflare's global network
- Generous free tier
- Automatic HTTPS
- Built-in CI/CD
- Great for static sites

**Cons**:
- Less intuitive UI than Vercel/Netlify
- Primarily for frontend

**Setup Steps**:
1. Push code to GitHub
2. Connect Cloudflare Pages to GitHub
3. Configure build settings
4. Add custom domain in Cloudflare dashboard
5. Update DNS (already managed if domain is on Cloudflare)

**Cost**: Free tier available, paid plans start at $20/month

### Option 4: AWS S3 + CloudFront

**Pros**:
- Full control over infrastructure
- Highly scalable
- Can integrate with other AWS services

**Cons**:
- More complex setup
- Requires AWS knowledge
- Manual CI/CD setup needed

**Setup Steps**:
1. Create S3 bucket for static hosting
2. Configure bucket for static website hosting
3. Create CloudFront distribution
4. Set up Route 53 for custom domain
5. Configure SSL certificate via ACM
6. Set up GitHub Actions for CI/CD

**Cost**: Pay-as-you-go, typically $1-5/month for small sites

## Recommended Approach: Vercel + GitHub Actions

For the easiest setup with custom domain and CI/CD, we recommend **Vercel** for the following reasons:

1. **Easiest Setup**: Zero-config deployment for Vite/React apps
2. **Built-in CI/CD**: Automatic deployments on Git push
3. **Custom Domain**: One-click custom domain setup
4. **Performance**: Global CDN out of the box
5. **Free Tier**: Sufficient for initial deployment

## Deployment Configuration

### For Vercel/Netlify/Cloudflare Pages

Create `vercel.json` (or `netlify.toml` / `_redirects`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes (including `/admin` and `/admin/dashboard`) fall through to `index.html` for client-side routing.

### GitHub Actions CI/CD Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Run type check
        run: npm run check
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Custom Domain Setup (fortuna.ai)

### Step 1: Purchase/Verify Domain
- Ensure you own `fortuna.ai`
- Domain should be registered with a registrar (Namecheap, GoDaddy, etc.)

### Step 2: Configure DNS
For Vercel:
1. Add domain in Vercel dashboard → Settings → Domains
2. Add `fortuna.ai` and `www.fortuna.ai`
3. Vercel provides DNS records to add:
   - A record pointing to Vercel IP
   - CNAME for www subdomain

For Netlify:
1. Add domain in Netlify dashboard
2. Follow DNS configuration instructions

For Cloudflare (if using Cloudflare for DNS):
1. Add site to Cloudflare Pages
2. Add custom domain
3. DNS automatically configured

### Step 3: SSL Certificate
All recommended providers automatically provision SSL certificates via Let's Encrypt. No manual configuration needed.

## CI/CD Pipeline Flow

```
Developer Push → GitHub → 
  GitHub Actions (test/build) → 
    Deploy to Vercel → 
      Automatic SSL + Domain → 
        Live at fortuna.ai
```

## Environment Variables

For production deployment, configure these in your deployment platform:

- `VITE_API_URL`: Backend API URL (when FastAPI backend is deployed)
- Other environment variables as needed

## Backend Deployment (Future)

When FastAPI backend is ready, recommended options:
- **Railway**: Easy Python deployment, automatic HTTPS, $5/month
- **Render**: Similar to Railway, good free tier
- **Fly.io**: Great for FastAPI, global deployment
- **AWS App Runner**: Fully managed, auto-scaling

## Quick Start: Vercel Deployment

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Add Custom Domain**:
   ```bash
   vercel domains add fortuna.ai
   ```

4. **Update DNS**: Follow Vercel's instructions

5. **Production Deploy**:
   ```bash
   vercel --prod
   ```

Or simply connect GitHub repository in Vercel dashboard for automatic deployments.

## Recommendations

1. **Start with Vercel** for fastest deployment
2. **Use GitHub Actions** for CI/CD (already integrated)
3. **Add custom domain** after initial deployment works
4. **Monitor** using Vercel analytics
5. **Scale backend** separately when needed (Railway/Render for FastAPI)

## Cost Estimate

- **Frontend (Vercel)**: Free tier (sufficient initially)
- **Domain (fortuna.ai)**: ~$20-40/year
- **Backend (Future)**: $5-20/month (Railway/Render)
- **Total**: ~$5-20/month initially

## Security Considerations

1. **HTTPS**: Automatic with all recommended providers
2. **CORS**: Configure when connecting FastAPI backend
3. **Environment Variables**: Store secrets in deployment platform, not in code
4. **Rate Limiting**: Configure at API gateway level
5. **Content Security Policy**: Add headers via deployment platform

