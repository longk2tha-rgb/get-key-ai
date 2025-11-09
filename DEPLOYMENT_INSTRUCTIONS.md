# Deployment Instructions for GET KEY AI

## Overview
This project has been set up for deployment on GitHub Pages and can be deployed to Netlify.

## Current Deployments

### GitHub Pages (Active)
- **URL**: https://longk2tha-rgb.github.io/get-key-ai/
- **Status**: ✅ Live and running
- **Deployment**: Automated via GitHub Actions (`.github/workflows/deploy.yml`)

### Netlify (Ready for Setup)

#### Prerequisites
1. A Netlify account (sign up at https://app.netlify.com)
2. GitHub account with access to this repo

#### Option 1: Deploy via GitHub Integration (Recommended)
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Choose GitHub and select this repository
4. Build settings will auto-populate:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20
5. Click "Deploy site"

#### Option 2: Deploy via GitHub Actions
1. Get your Netlify credentials:
   - Log in to Netlify → User menu → Account settings → Applications
   - Create a new OAuth token (or use existing)
   - Copy your Site ID from site settings
2. Go to GitHub repo → Settings → Secrets and variables → Actions
3. Add two new secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify auth token
   - `NETLIFY_SITE_ID`: Your Netlify site ID
4. The GitHub Actions workflow (`.github/workflows/netlify-deploy.yml`) will automatically deploy on push

#### Option 3: Manual Drag & Drop
1. Build locally: `npm install && npm run build`
2. Go to https://app.netlify.com/drop
3. Drag and drop the `dist` folder
4. Done! Your site will be live

## Build Configuration
- **Build tool**: Vite
- **Framework**: React
- **Build output**: `dist` folder
- **Node version**: 20 (recommended)
- **Package manager**: npm

## Configuration Files
- `netlify.toml`: Netlify deployment configuration
- `.github/workflows/deploy.yml`: GitHub Pages deployment
- `.github/workflows/netlify-deploy.yml`: Netlify deployment via GitHub Actions
- `package.json`: Build and deployment scripts

## Scripts
```bash
npm install      # Install dependencies
npm run dev      # Run development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Troubleshooting

### Build Fails
- Ensure Node.js 20+ is installed
- Run `npm install` to install dependencies
- Check for TypeScript errors: `npm run build`

### Deployment Issues
- Check GitHub Actions logs for errors
- Verify `netlify.toml` configuration
- Ensure `dist` folder is the publish directory
- Check environment variables and secrets

## Support
For issues with GitHub Pages, check GitHub Actions logs.
For Netlify issues, visit https://docs.netlify.com
