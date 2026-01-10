# Integration Checklist

## Quick Start Verification

### 1. Development Server
```bash
npm run dev
```
- Server should start on `http://localhost:5000`
- No TypeScript errors
- No build errors

### 2. Environment Variables
- **`.env` file** should contain: `VITE_API_URL=http://localhost:8000` (or your backend URL)
- If `VITE_API_URL` is empty, API calls will use relative URLs (same origin)
- API endpoints are automatically prefixed with `/api/newsletter`

### 3. React Query Integration

#### Verify Query Hooks are Configured:
- ✅ `usePosts()` - Fetches once on initial load, uses cache afterward
- ✅ `usePost(id)` - Fetches once per post ID, uses cache afterward
- ✅ `useSubscribers()` - Admin only, fetches once on initial load
- ✅ `useCurrentUser()` - Fetches once, uses cache afterward

#### Configuration (`client/src/lib/queryClient.ts`):
- ✅ `refetchOnMount: false` - Component remounts use cached data
- ✅ `refetchOnWindowFocus: false` - Window focus doesn't trigger refetch
- ✅ `refetchOnReconnect: false` - Network reconnection doesn't trigger refetch
- ✅ `staleTime: Infinity` - Data never becomes stale (only fetch once)

### 4. API Client Configuration

#### Verify API Endpoints (`client/src/lib/api-client.ts`):
- ✅ All endpoints use `getApiEndpoint()` which prepends `/api/newsletter`
- ✅ Authentication tokens (access token in sessionStorage, refresh token in localStorage)
- ✅ Automatic token refresh on 401 responses
- ✅ Data transformation (backend `id` → frontend `_id` for subscribers)

#### API Endpoints Structure:
```
GET  /api/newsletter/posts?published=true&limit=1000
GET  /api/newsletter/posts/:id
POST /api/newsletter/posts
PUT  /api/newsletter/posts/:id
DELETE /api/newsletter/posts/:id

GET  /api/newsletter/subscribers
POST /api/newsletter/subscribers
PUT  /api/newsletter/subscribers/:id
DELETE /api/newsletter/subscribers/:id

POST /api/newsletter/subscriptions

POST /api/newsletter/auth/login
POST /api/newsletter/auth/logout
GET  /api/newsletter/auth/me
POST /api/newsletter/auth/refresh
```

### 5. Component Integration

#### User Pages:
- ✅ **Home** (`/`) - Uses `useToast()` hook (PascalCase)
- ✅ **Posts** (`/posts`) - Uses `usePosts(true)` to fetch published posts
- ✅ **PostDetail** (`/posts/:id`) - Uses `usePost(id)` to fetch single post
- ✅ **Payment** (`/payment`) - Uses `useCreateSubscription()` mutation
- ✅ **Privacy** (`/privacy`) - Static page
- ✅ **Terms** (`/terms`) - Static page

#### Admin Pages:
- ✅ **AdminLogin** (`/admin`) - Uses `useLogin()` mutation
- ✅ **AdminDashboard** (`/admin/dashboard`) - Uses:
  - `useIsAdmin()` - Check admin status
  - `useSubscribers()` - List all subscribers
  - `useUpdateSubscriber()` - Toggle subscriber status
  - `usePosts()` - List all posts (published + unpublished)
  - `useCreatePost()` - Create new post
  - `useUpdatePost()` - Edit post
  - `useDeletePost()` - Delete post

### 6. Hook File Naming (PascalCase)

✅ All hooks follow PascalCase naming convention:
- `client/src/hooks/useMobile.tsx` (was `use-mobile.tsx`)
- `client/src/hooks/useToast.ts` (was `use-toast.ts`)
- `client/src/hooks/useAuth.ts`
- `client/src/hooks/usePosts.ts`
- `client/src/hooks/useSubscribers.ts`
- `client/src/hooks/useSubscriptions.ts`

All imports updated throughout codebase.

### 7. Data Models

✅ Frontend models match backend MongoDB schema:

**Subscriber** (`client/src/models/subscriber.ts`):
```typescript
{
  _id: string;
  email: string;
  name: string;
  is_active: boolean;
  plan_id: "free" | "standard" | "premium";
  subscribed_at: string; // ISO date string
  unsubscribed_at: string | null; // ISO date string or null
}
```

**Post** (`client/src/models/post.ts`):
```typescript
{
  id: string;
  title: string;
  content: string; // Markdown content
  excerpt: string;
  createdAt: string; // ISO date string
  published: boolean;
}
```

### 8. Testing the Integration

#### Test Scenarios:

1. **Home Page** (`http://localhost:5000/`)
   - Should load without errors
   - Should display subscription plans
   - Should handle plan selection (free plan works, others show "coming soon")

2. **Posts Page** (`http://localhost:5000/posts`)
   - Should make API call to `/api/newsletter/posts?published=true&limit=1000`
   - Should display loading state
   - Should render posts or empty state
   - Navigate away and back - should use cached data (no new API call)

3. **Post Detail** (`http://localhost:5000/posts/:id`)
   - Should make API call to `/api/newsletter/posts/:id`
   - Should render markdown content
   - Navigate away and back - should use cached data (no new API call)

4. **Admin Login** (`http://localhost:5000/admin`)
   - Should display login form
   - On submit, should call `/api/newsletter/auth/login`
   - Should store tokens and redirect to `/admin/dashboard`

5. **Admin Dashboard** (`http://localhost:5000/admin/dashboard`)
   - Should check authentication with `/api/newsletter/auth/me`
   - Should fetch subscribers from `/api/newsletter/subscribers`
   - Should fetch posts from `/api/newsletter/posts`
   - Create/Edit/Delete posts should work with optimistic updates
   - Toggle subscriber status should work

### 9. Network Tab Verification

Open browser DevTools → Network tab and verify:

1. **Initial Load**:
   - ✅ API calls made (e.g., `/api/newsletter/posts?published=true`)
   - ✅ No 404 errors
   - ✅ Response headers include `Content-Type: application/json`

2. **Subsequent Navigation**:
   - ✅ No redundant API calls (cache is used)
   - ✅ Only mutations trigger new requests

3. **Authentication**:
   - ✅ Login request includes credentials
   - ✅ Response includes `access_token` and `refresh_token`
   - ✅ Subsequent requests include `Authorization: Bearer <token>` header

4. **Error Handling**:
   - ✅ 401 errors trigger automatic token refresh
   - ✅ Failed mutations show error toasts
   - ✅ Network errors are handled gracefully

### 10. Console Verification

Open browser DevTools → Console and verify:
- ✅ No React errors
- ✅ No uncaught exceptions
- ✅ No console.error messages (except intentional error logging)
- ✅ React Query DevTools (if installed) shows query states

### 11. Expected Behavior

#### Query Fetch Behavior:
- ✅ **First load**: API call is made
- ✅ **Subsequent loads**: Uses cached data (no API call)
- ✅ **After mutations**: Queries invalidated, background refetch happens
- ✅ **Optimistic updates**: UI updates immediately, then syncs with server

#### Error Handling:
- ✅ Network errors show toast notifications
- ✅ 401 errors trigger token refresh automatically
- ✅ Failed mutations rollback optimistic updates (for delete operations)

## Common Issues & Solutions

### Issue: "Cannot find module '@/hooks/use-toast'"
**Solution**: Verify all imports use PascalCase: `@/hooks/useToast`

### Issue: API calls failing with 404
**Solution**: 
- Check `VITE_API_URL` is set correctly in `.env`
- Verify backend is running on the specified port
- Check API endpoint structure matches `/api/newsletter/*`

### Issue: Queries refetching on every navigation
**Solution**: Verify `queryClient.ts` has `refetchOnMount: false` and `staleTime: Infinity`

### Issue: Authentication not working
**Solution**:
- Check tokens are stored in `sessionStorage` (access) and `localStorage` (refresh)
- Verify `Authorization` header is included in API requests
- Check backend authentication endpoint matches `/api/newsletter/auth/login`

## Next Steps

1. ✅ Start development server: `npm run dev`
2. ✅ Open browser: `http://localhost:5000`
3. ✅ Check browser console for errors
4. ✅ Check Network tab for API calls
5. ✅ Test each page and verify integration
6. ✅ Verify React Query caching behavior
7. ✅ Test admin authentication flow
8. ✅ Test CRUD operations (create, read, update, delete)

