# Environment Variable Fix Instructions

## Problem
Frontend is calling `http://localhost:5001/api/newsletter/subscriptions` instead of `http://localhost:8000/api/newsletter/subscriptions`.

## Root Cause
`VITE_API_URL` is not being read from `.env` file, causing the frontend to use relative URLs which go to the same origin (port 5001) instead of the backend (port 8000).

## Solution

### Step 1: Verify .env file exists and has correct content
```bash
cat .env
```
Should show:
```
# Local development environment variables
# Backend API base URL
VITE_API_URL=http://localhost:8000
```

### Step 2: Kill all existing dev servers
```bash
# Kill all processes on ports 5000 and 5001
lsof -ti:5000,5001 | xargs kill -9
pkill -9 -f "vite"
pkill -9 -f "node.*dev"
```

### Step 3: Restart dev server
```bash
npm run dev
```

### Step 4: Verify in browser console
Open browser DevTools Console and navigate to any page. You should see:
```
[getApiUrl] Reading VITE_API_URL: { 
  'import.meta.env.VITE_API_URL': 'http://localhost:8000', 
  'apiUrl': 'http://localhost:8000',
  ...
}
[getApiEndpoint] Constructed full URL: http://localhost:8000/api/newsletter/...
```

### If VITE_API_URL is still undefined/empty:
1. Check if `.env` file is in the project root (same directory as `vite.config.ts`)
2. Verify `.env` file is not in `.gitignore` (it should be committed for local dev)
3. Restart the dev server (Vite only reads `.env` on startup)
4. Check browser console for the `[getApiUrl]` log to see what value is being read

## Configuration Details

- **vite.config.ts**: Located at project root
- **root**: Set to `client/` directory
- **envDir**: Set to `projectRoot` (where `.env` file is located)
- **.env file**: Located at project root with `VITE_API_URL=http://localhost:8000`

## Expected Behavior

- **With VITE_API_URL set**: API calls go to `http://localhost:8000/api/newsletter/...`
- **Without VITE_API_URL**: API calls go to relative URLs like `/api/newsletter/...` which resolve to the same origin (port 5000/5001)

## Current Status
✅ `.env` file exists with `VITE_API_URL=http://localhost:8000`
✅ `vite.config.ts` configured with `envDir: projectRoot`
✅ Backend running on `http://localhost:8000`
⚠️ **Need to restart dev server** to pick up `.env` changes

