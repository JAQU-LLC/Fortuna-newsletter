# Fortuna.ai Newsletter Platform

A modern newsletter subscription platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Subscription Plans**: Free, Standard ($9/mo), and Premium ($29/mo) tiers
- **Public Posts**: Browse published newsletter articles
- **Admin Dashboard**: Protected admin area for content management
  - Create and publish posts
  - View and search subscribers by email
  - Activate/deactivate subscriptions
- **Payment Flow**: Mock payment page for subscription checkout

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Routing**: Wouter
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React hooks with in-memory store
- **Build Tool**: Vite

## Local Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fortuna-newsletter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev:client
   ```

4. **Open in browser**
   Navigate to `http://localhost:5000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:client` | Start frontend dev server on port 5000 |
| `npm run dev` | Start full-stack dev server |
| `npm run build` | Build for production |
| `npm run check` | Run TypeScript type checking |

## Project Structure

```
├── client/
│   ├── public/          # Static assets (favicon)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   └── ui/      # shadcn/ui components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and store
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app with routing
│   │   ├── index.css    # Global styles & design tokens
│   │   └── main.tsx     # Entry point
│   └── index.html       # HTML template
├── attached_assets/     # Brand assets (logo, favicon)
└── package.json
```

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with subscription plans |
| `/posts` | Public posts listing |
| `/payment?plan=<id>` | Payment/checkout page |
| `/admin` | Admin login (hidden) |
| `/admin/dashboard` | Admin dashboard |

## Admin Access

The admin panel is accessible at `/admin` with the following credentials:

- **Username**: `admin`
- **Password**: `admin123`

> Note: This is a frontend mockup. In production, implement proper authentication.

## Deployment

### Deploy on Replit

1. Click the **Deploy** button in the Replit workspace
2. Your app will be available at `https://<your-repl>.replit.app`

### Deploy Elsewhere

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Output**
   The production build will be in `dist/public/`

3. **Serve**
   Deploy the `dist/public` folder to any static hosting:
   - Vercel
   - Netlify
   - Cloudflare Pages
   - AWS S3 + CloudFront

### Environment Variables

This frontend mockup doesn't require environment variables. For production with real backend:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Session encryption key |

## Customization

### Branding

- **Logo**: Replace `attached_assets/logo.png`
- **Favicon**: Replace `attached_assets/favicon.png`
- **Colors**: Edit CSS variables in `client/src/index.css`

### Design Tokens

The design system uses CSS custom properties defined in `index.css`:

```css
:root {
  --primary: 238 100% 64%;      /* Brand blue-purple */
  --secondary: 235 88% 13%;      /* Dark navy */
  --background: 0 0% 100%;       /* White */
  --foreground: 235 88% 13%;     /* Text color */
}
```

## License

MIT
