# Fortuna.ai Newsletter Platform

A modern newsletter subscription platform built with React, TypeScript, and Tailwind CSS. This is a frontend-only application fully integrated with a FastAPI backend (see [Backend API Integration Documentation](docs/backend-newsltter-api-integration.md)).

## Features

- **Subscription Plans**: Free, Standard ($9/mo), and Premium ($29/mo) tiers with configurable popularity and availability
- **Public Posts**: Browse published newsletter articles with dedicated post detail pages
- **Admin Dashboard**: Protected admin area for content management
  - Create, edit, and delete posts (with markdown support)
  - View and search subscribers by email
  - Activate/deactivate subscriptions
  - Configure plan settings (most popular, disabled plans)
- **Payment Flow**: Subscription checkout page (ready for Stripe integration)
- **Internationalization**: Full i18n support with automatic language detection (English, Spanish, French, German, Chinese, Japanese)
- **Responsive Footer**: Social links and legal pages (Privacy Policy, Terms of Use)
- **Backend Integration**: Full API integration with React Query hooks, optimistic updates, and error handling
- **Code Quality**: ESLint, Prettier, and TypeScript for type safety

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Routing**: Wouter (SPA routing with dynamic routes)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Query (`@tanstack/react-query`) with backend API integration
- **Build Tool**: Vite
- **Internationalization**: react-i18next with automatic language detection
- **Markdown Support**: `@uiw/react-md-editor` for admin post creation, `react-markdown` for rendering
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

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

3. **Environment variables**
   
   The project uses a single `.env` file for local development:
   
   - **`.env`** - Local development configuration (committed to git)
   - Pre-configured with `VITE_API_URL=http://localhost:8000` for local development
   
   **Note**: 
   - The `.env` file is committed to git as a template for local development
   - Environment variables must be prefixed with `VITE_` to be exposed to the client
   - For production, set environment variables in your deployment platform (Vercel, Netlify, etc.)
   - Production environment variables override `.env` during build
   - See [Environment Variables](#environment-variables) section for more details

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5000 |
| `npm run build` | Build for production (outputs to `dist/public/`) |
| `npm run check` | Run TypeScript type checking |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check for code issues |
| `npm run lint:fix` | Auto-fix ESLint issues where possible |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting without making changes |

## Project Structure

```
├── client/
│   ├── public/          # Static assets (favicon, opengraph images)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── ui/      # shadcn/ui components: https://ui.shadcn.com
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── hooks/       # Custom React hooks (useAuth, usePosts, useSubscribers, etc.)
│   │   ├── lib/         # Utilities
│   │   │   ├── config.ts      # Environment variable configuration
│   │   │   ├── api-client.ts  # Centralized API client with auth and token refresh
│   │   │   ├── queryClient.ts # React Query configuration
│   │   │   ├── translations.ts # Backward compatibility wrapper
│   │   │   ├── i18n.ts        # i18next configuration
│   │   │   └── planConfig.ts  # Plan configuration
│   │   ├── models/      # TypeScript interfaces
│   │   │   ├── post.ts        # Post model
│   │   │   └── subscriber.ts  # Subscriber model (matches MongoDB schema)
│   │   ├── locales/     # Translation JSON files (en, es, fr, de, zh, ja)
│   │   ├── pages/       # Page components
│   │   │   ├── admin/
│   │   │   │   ├── AdminLogin.tsx
│   │   │   │   └── AdminDashboard.tsx
│   │   │   └── user/
│   │   │       ├── Home.tsx
│   │   │       ├── Posts.tsx
│   │   │       ├── PostDetail.tsx
│   │   │       ├── Payment.tsx
│   │   │       ├── Privacy.tsx
│   │   │       ├── Terms.tsx
│   │   │       └── NotFound.tsx
│   │   ├── App.tsx      # Main app with routing
│   │   ├── index.css    # Global styles & design tokens
│   │   └── main.tsx     # Entry point
│   └── index.html       # HTML template
├── assets/              # Brand assets (logo, favicon) - accessed via @assets alias
├── .env                 # Environment variables for local development (committed)
├── docs/
│   ├── backend-newsltter-api-integration.md # Complete backend API integration guide
│   ├── DEPLOYMENT_STRATEGY.md               # Deployment guide for custom domain
│   ├── I18N_SETUP.md                       # Internationalization setup guide
│   ├── GITHUB_SETUP.md                     # GitHub branch protection and CI/CD setup
│   ├── QUERY_FETCH_BEHAVIOR.md             # React Query fetch behavior documentation
│   ├── COMPONENT_NAMING_CONVENTION.md      # Component naming standards
│   └── ASYNC_PERFORMANCE_AUDIT.md          # Async operations audit
├── .github/workflows/  # CI/CD workflows
│   ├── lint.yml        # Linting and type checking workflow
│   └── deploy.yml      # Build and deployment workflow
├── vercel.json          # Vercel deployment config (SPA routing)
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
└── package.json
```

## Pages & Routes

| Route | Description |
|------|-------------|
| `/` | Home page with subscription plans |
| `/posts` | Public posts listing |
| `/posts/:id` | Individual post detail page |
| `/payment?plan=<id>` | Payment/checkout page |
| `/privacy` | Privacy Policy page |
| `/terms` | Terms of Use page |
| `/admin` | Admin login |
| `/admin/dashboard` | Admin dashboard |

## Admin Access

The admin panel is accessible at `/admin` and requires authentication via the FastAPI backend.

**Authentication Flow**:
- Login at `/admin` using admin credentials
- Backend returns JWT access and refresh tokens
- Tokens are stored (access token in sessionStorage, refresh token in localStorage)
- All API calls include the access token in the Authorization header
- Automatic token refresh on 401 responses
- Logout clears tokens and redirects to login

**Admin Features**:
- Full CRUD operations for posts (create, edit, delete)
- Markdown editor for post content
- Subscriber management (view, toggle status, change plan)
- Plan configuration (set most popular plan, disable plans)

> See [Backend API Integration Documentation](docs/backend-newsltter-api-integration.md) for complete authentication and authorization details.

## Internationalization

The application supports full internationalization with automatic language detection:

- **Supported Languages**: English (en), Spanish (es), French (fr), German (de), Chinese (zh), Japanese (ja)
- **Automatic Detection**: Detects user's browser language preference
- **Manual Selection**: Language switcher in header for manual language selection
- **Translation Files**: Located in `client/src/locales/` as JSON files
- **Implementation**: Uses `react-i18next` with `i18next-browser-languagedetector`

For detailed i18n setup and migration guide, see [I18N Setup Documentation](docs/I18N_SETUP.md).

## Code Quality

The project includes comprehensive code quality tools:

- **ESLint**: Code linting with TypeScript and React rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking
- **GitHub Actions**: Automated linting and type checking on every push/PR

### Running Quality Checks Locally

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Check code formatting
npm run format:check

# Format all code
npm run format

# Type check
npm run check
```

## Environment Variables

The project uses Vite's environment variable system following [Vite's official best practices](https://vite.dev/config/#using-environment-variables-in-config). All environment variables must be prefixed with `VITE_` to be exposed to the client.

### Environment File Structure

The project uses a single `.env` file for local development:

| File | When Loaded | Git Status | Purpose |
|------|-------------|------------|---------|
| `.env` | Always (local dev) | ✅ Committed | Local development configuration |

**Note**: 
- `.env` is used for local development only
- Production environment variables are set via deployment platform (Vercel, Netlify, etc.)
- Vite also supports `.env.local` for local overrides (gitignored)

### Available Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` (dev) or `https://api.fortuna.ai` (prod) |

### File Example

**`.env`** (local development - committed):
```bash
# Local development environment variables
# This file is used for local development only
# Production environment variables are set via deployment platform (Vercel, Netlify, etc.)
VITE_API_URL=http://localhost:8000
```

### Usage in Code

Environment variables are accessed through the `config.ts` utility:

```typescript
import { getApiUrl, getApiEndpoint } from '@/lib/config';

// Get the base API URL (reads from .env for local dev, or deployment platform for production)
const apiUrl = getApiUrl(); 

// Get a full API endpoint URL
const loginUrl = getApiEndpoint('/api/auth/login');
// Local dev: http://localhost:8000/api/auth/login (from .env)
// Production: https://api.fortuna.ai/api/auth/login (from deployment platform)
// If empty: /api/auth/login (relative URL)
```

The API client in `client/src/lib/api-client.ts` automatically uses the configured backend URL when making API calls.

### Best Practices

1. **Commit `.env`**: The `.env` file is committed as a template for local development
2. **Production variables**: Set via CI/CD platform (Vercel, Netlify, etc.) - these override `.env` during build
3. **Local overrides**: If needed, create `.env.local` (gitignored) for developer-specific settings
4. **Never commit secrets**: Only use `.env.local` for sensitive local-only values

### Production Deployment

For production deployments (Vercel, Netlify, etc.), set environment variables in your hosting platform's dashboard. These will override `.env` during build.

**Vercel Example**:
1. Go to Project Settings → Environment Variables
2. Add `VITE_API_URL` with your production backend URL (e.g., `https://api.fortuna.ai`)
3. Select environment (Production, Preview, Development)
4. Redeploy the application

**Note**: Vite loads `.env` files from the project root (where `vite.config.ts` is located), even if `root` is set to a subdirectory.

## Backend Integration

This frontend is fully integrated with a FastAPI backend using React Query (`@tanstack/react-query`). See [Backend API Integration Documentation](docs/backend-newsltter-api-integration.md) for complete endpoint specifications.

### API Client Architecture

**Centralized API Client** (`client/src/lib/api-client.ts`):
- Handles all backend API calls
- Manages authentication tokens (JWT access and refresh tokens)
- Automatic token refresh on 401 responses
- Transforms backend data to match frontend models
- Error handling and token management

**React Query Hooks** (`client/src/hooks/`):
- `useAuth.ts` - Authentication hooks (login, logout, current user, admin check)
- `usePosts.ts` - Post CRUD operations (list, get, create, update, delete)
- `useSubscribers.ts` - Subscriber management (list, create, update, delete)
- `useSubscriptions.ts` - Subscription creation

**Query Fetch Behavior**:
- All queries fetch **only once on initial load**
- Subsequent component mounts use cached data (no API calls)
- Optimistic updates for mutations (instant UI feedback)
- Automatic error handling and rollback on mutation failures
- See [Query Fetch Behavior Documentation](docs/QUERY_FETCH_BEHAVIOR.md) for details

**API Configuration**:
- All API requests use the `VITE_API_URL` environment variable for the backend base URL
- API endpoints are automatically prefixed with `/api/newsletter`
- If `VITE_API_URL` is not set, API calls use relative URLs (same origin)
- See `client/src/lib/config.ts` for configuration utilities

### Data Models

Frontend models (`client/src/models/`) match the backend MongoDB schema:
- **Post**: `id`, `title`, `content` (markdown), `excerpt`, `createdAt`, `published`
- **Subscriber**: `_id`, `email`, `name`, `is_active`, `plan_id`, `subscribed_at`, `unsubscribed_at`

All API responses are transformed to match these models automatically by the API client.

## Deployment

For detailed deployment instructions, see [Deployment Strategy](docs/DEPLOYMENT_STRATEGY.md).

### Quick Deploy to Vercel (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Push to GitHub
   - Connect repository to Vercel
   - Add custom domain `fortuna.ai` in Vercel dashboard
   - Configure DNS records as instructed

The `vercel.json` file is already configured for SPA routing (ensures admin routes work correctly).

### Other Deployment Options

- **Netlify**: Similar to Vercel, update `netlify.toml` if needed
- **Cloudflare Pages**: Excellent performance, add to Cloudflare dashboard
- **AWS S3 + CloudFront**: Full control, more setup required

All routes are configured to fall through to `index.html` for proper client-side routing.

### CI/CD

GitHub Actions workflows are configured for automated quality checks and deployments:

- **Lint Workflow** (`.github/workflows/lint.yml`): Runs on every push/PR
  - ESLint validation
  - Prettier formatting check
  - TypeScript type checking

- **Deploy Workflow** (`.github/workflows/deploy.yml`): Runs on push/PR to main
  - Runs all quality checks
  - Builds the project
  - Deploys to Vercel (only on main branch pushes)

For setting up branch protection rules and GitHub repository configuration, see [GitHub Setup Guide](docs/GITHUB_SETUP.md).

## Customization

### Branding

- **Logo**: Replace `assets/logo.png` (accessed via `@assets/logo.png` in code)
- **Favicon**: Replace `assets/favicon.png`
- **Colors**: Edit CSS variables in `client/src/index.css`
- **Social Links**: Update URLs in `client/src/components/Footer.tsx`
- **Footer Text**: Update in `client/src/locales/*.json` under `footer` section

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

### Adding Translations

To add a new language or modify text:

1. Create a new JSON file in `client/src/locales/` (e.g., `pt.json` for Portuguese)
2. Copy the structure from `en.json` and translate all values
3. Add the language code to `client/src/lib/i18n.ts` in the `supportedLngs` array
4. The language will automatically appear in the language switcher

### Using React Query Hooks

All data fetching uses React Query hooks for optimal performance and caching:

```typescript
import { usePosts, usePost, useCreatePost } from '@/hooks/usePosts';
import { useSubscribers } from '@/hooks/useSubscribers';
import { useCurrentUser, useIsAdmin } from '@/hooks/useAuth';

// List posts (fetches once, uses cache afterward)
const { data: postsData, isLoading, error } = usePosts(true); // published only

// Get single post (fetches once, uses cache afterward)
const { data: post } = usePost(postId);

// Create post mutation (with optimistic updates)
const createPost = useCreatePost();
createPost.mutate({ title, content, excerpt, published: true });

// Check authentication
const { data: user } = useCurrentUser();
const isAdmin = useIsAdmin();
```

**Key Behavior**:
- Queries fetch **only once on initial load** (see [Query Fetch Behavior](docs/QUERY_FETCH_BEHAVIOR.md))
- Subsequent component mounts use cached data (no API calls)
- Mutations provide optimistic updates for instant UI feedback
- Automatic error handling and rollback on failures
- No need for `useEffect` wrappers - React Query handles everything automatically

## Development Notes

- **SPA Routing**: All routes are handled client-side. The `vercel.json` ensures proper routing in production.
- **State Management**: Fully integrated with backend API using React Query hooks. All queries fetch once on initial load, with cached data for subsequent renders.
- **Component Naming**: All React components follow PascalCase naming convention (e.g., `AdminDashboard.tsx` exports `AdminDashboard`). See [Component Naming Convention](docs/COMPONENT_NAMING_CONVENTION.md).
- **Async Operations**: All client-to-server calls are asynchronous to prevent UI blocking. See [Async Performance Audit](docs/ASYNC_PERFORMANCE_AUDIT.md).
- **Type Safety**: Full TypeScript support with strict type checking. Frontend models match backend MongoDB schema.
- **Component Library**: Uses shadcn/ui components built on Radix UI primitives.
- **Code Quality**: All code must pass ESLint, Prettier, and TypeScript checks before merging (enforced by GitHub Actions).

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run quality checks: `npm run lint && npm run format:check && npm run check`
4. Commit and push your changes
5. Create a Pull Request
6. Ensure all CI checks pass before requesting review

See [GitHub Setup Guide](docs/GITHUB_SETUP.md) for detailed contribution workflow and branch protection rules.

## License

MIT
