# Vercel Setup Guide for GitHub Actions

This guide explains how to get the required Vercel credentials and configure them in GitHub Actions.

## Required Secrets

Your GitHub Actions workflow needs three secrets from Vercel:

1. **VERCEL_TOKEN** - API token for authentication
2. **VERCEL_ORG_ID** - Your Vercel organization/team ID
3. **VERCEL_PROJECT_ID** - Your Vercel project ID

## Step 1: Get VERCEL_TOKEN (API Token)

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Click on your profile icon (top right)
   - Select **Settings**

2. **Navigate to Tokens**
   - In the left sidebar, click **Tokens**
   - Or go directly to: [vercel.com/account/tokens](https://vercel.com/account/tokens)

3. **Create New Token**
   - Click **Create Token**
   - Give it a descriptive name (e.g., "GitHub Actions Deployment")
   - Set expiration (recommended: **No expiration** for CI/CD)
   - Click **Create**

4. **Copy the Token**
   - ⚠️ **Important**: Copy the token immediately - you won't be able to see it again!
   - The token looks like: `vercel_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# The token is stored in ~/.vercel/auth.json
# But it's easier to create one via dashboard
```

## Step 2: Get VERCEL_ORG_ID

### Method 1: Via Vercel Dashboard

1. **Go to Your Project**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your project (or create one if you haven't)

2. **Open Project Settings**
   - Click on **Settings** tab
   - Scroll down to **General** section
   - Look for **Team ID** or **Organization ID**
   - Copy the ID (it's a string like: `team_xxxxxxxxxxxxxxxxxxxxx`)

### Method 2: Via Vercel CLI

```bash
# If you have a project linked locally
vercel whoami

# Or check your vercel.json or .vercel/project.json
cat .vercel/project.json
# Look for "orgId" field
```

### Method 3: Via API (if you have token)

```bash
# Using curl
curl -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  https://api.vercel.com/v2/teams

# Or for personal account
curl -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  https://api.vercel.com/v2/user
```

**Note**: 
- If you're using a **personal account**, the org ID might be your user ID
- If you're using a **team/organization**, use the team ID
- The ID format is usually: `team_xxxxxxxxx` or `user_xxxxxxxxx`

## Step 3: Get VERCEL_PROJECT_ID

### Method 1: Via Vercel Dashboard

1. **Go to Your Project**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your project

2. **Open Project Settings**
   - Click on **Settings** tab
   - Scroll to **General** section
   - Look for **Project ID**
   - Copy the ID (it's a string like: `prj_xxxxxxxxxxxxxxxxxxxxx`)

### Method 2: Via Vercel CLI

```bash
# Link your project (if not already linked)
vercel link

# Check the project configuration
cat .vercel/project.json
# Look for "projectId" field
```

### Method 3: Create Project First

If you don't have a project yet:

1. **Create Project in Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **Add New...** → **Project**
   - Import your GitHub repository (optional, we're using GitHub Actions)
   - Or create an empty project
   - The Project ID will be shown in Settings

## Step 4: Add Secrets to GitHub

1. **Go to GitHub Repository**
   - Navigate to your repository on GitHub
   - Click **Settings** (top menu)
   - In the left sidebar, click **Secrets and variables** → **Actions**

2. **Add Each Secret**
   - Click **New repository secret**
   - Add each secret one by one:

   **Secret 1: VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: Paste your Vercel API token
   - Click **Add secret**

   **Secret 2: VERCEL_ORG_ID**
   - Name: `VERCEL_ORG_ID`
   - Value: Paste your Organization/Team ID
   - Click **Add secret**

   **Secret 3: VERCEL_PROJECT_ID**
   - Name: `VERCEL_PROJECT_ID`
   - Value: Paste your Project ID
   - Click **Add secret**

## Step 5: Vercel Project Setup

### Initial Project Configuration

If you haven't created a Vercel project yet:

1. **Create Project in Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **Add New...** → **Project**
   - You can either:
     - **Import from GitHub** (optional - we're using GitHub Actions)
     - **Create empty project** (just for getting the Project ID)

2. **Configure Build Settings** (if importing)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm ci`

3. **Note**: Since we're using GitHub Actions for deployment, you don't need to connect the GitHub repo in Vercel. The GitHub Actions workflow will deploy directly using the API.

### Project Configuration File

Your project already has `vercel.json` configured:

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

This configuration is used when deploying via GitHub Actions.

## Verification

### Test the Setup

1. **Push to main branch** (or merge develop → main)
2. **Check GitHub Actions**
   - Go to your repository → **Actions** tab
   - Watch the workflow run
   - The deploy job should succeed

3. **Check Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Your project should show a new deployment
   - The deployment should be marked as "Production"

## Troubleshooting

### Error: "Invalid token"
- **Solution**: Verify your `VERCEL_TOKEN` is correct and hasn't expired
- Create a new token if needed

### Error: "Project not found"
- **Solution**: Verify your `VERCEL_PROJECT_ID` is correct
- Make sure the project exists in your Vercel account

### Error: "Organization not found"
- **Solution**: Verify your `VERCEL_ORG_ID` is correct
- If using a personal account, use your user ID instead of team ID
- Check if you're using the right team/organization

### Deployment succeeds but site doesn't work
- Check Vercel dashboard for deployment logs
- Verify `vercel.json` configuration is correct
- Check if custom domain is configured (if using one)

## Security Best Practices

1. **Token Permissions**
   - Use tokens with minimal required permissions
   - Don't share tokens publicly
   - Rotate tokens periodically

2. **GitHub Secrets**
   - Never commit secrets to your repository
   - Use GitHub Secrets for all sensitive values
   - Review who has access to repository secrets

3. **Token Expiration**
   - For CI/CD, you can set tokens to "No expiration"
   - Or set a long expiration and rotate regularly

## Quick Reference

| Secret | Where to Find | Format |
|--------|---------------|--------|
| `VERCEL_TOKEN` | Settings → Tokens → Create Token | `vercel_xxxxx...` |
| `VERCEL_ORG_ID` | Project Settings → General → Team ID | `team_xxxxx` or `user_xxxxx` |
| `VERCEL_PROJECT_ID` | Project Settings → General → Project ID | `prj_xxxxx` |

## Next Steps

After setting up the secrets:

1. ✅ Push to main branch to trigger deployment
2. ✅ Monitor GitHub Actions workflow
3. ✅ Check Vercel dashboard for deployment status
4. ✅ Configure custom domain (if needed) in Vercel dashboard
5. ✅ Set environment variables in Vercel (if needed)

Your GitHub Actions workflow will now automatically deploy to Vercel on every merge to main! 🚀

