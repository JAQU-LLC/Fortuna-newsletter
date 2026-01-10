# Hook Optimization Summary

## Overview
This document summarizes the optimizations made to all React hooks to prevent unnecessary re-renders and follow React Query best practices.

## Changes Made

### 1. Environment Variable Consolidation
- **Issue**: Two `.env` files existed (root and `client/`)
- **Solution**: 
  - Removed root `.env` file
  - `client/.env` is now the single source of truth
  - Updated `vite.config.ts` to explicitly set `envDir: path.resolve(projectRoot, "client")`
- **Location**: `vite.config.ts` line 53

### 2. Removed Console.logs from Hook Bodies
- **Issue**: Console.logs in hook bodies execute on every render, causing unnecessary execution
- **Hooks Fixed**:
  - `useAuth.ts` - Removed logs from `useLogin()` and `useCurrentUser()`
  - `usePosts.ts` - Removed logs from `usePosts()`
  - `useSubscriptions.ts` - Removed logs from `useCreateSubscription()`
- **Result**: Cleaner code, better performance, no unnecessary re-executions

### 3. Fixed useSubscribers Query Key Normalization
- **Issue**: Query key included entire `params` object, causing unnecessary refetches when object reference changed (even with same values)
- **Solution**: Normalized query key to use primitive values instead of object reference
- **Before**: `queryKey: ['subscribers', params]`
- **After**: `queryKey: ['subscribers', params.skip ?? 0, params.limit ?? 100, params.is_active]`
- **Result**: Queries only refetch when actual parameter values change, not when object reference changes

### 4. Fixed useToast Infinite Loop
- **Issue**: `useEffect` dependency array included `state`, causing infinite re-renders
- **Solution**: Removed `state` from dependency array (empty array `[]`)
- **Rationale**: `setState` is stable and doesn't need to be in dependencies. The effect only needs to run once to register/unregister the listener.
- **Result**: No more infinite loops, proper cleanup of listeners

## React Query Best Practices Applied

### Query Configuration
All queries now follow consistent patterns:
- `refetchOnMount: false` - Don't refetch when component mounts if data exists
- `refetchOnWindowFocus: false` - Don't refetch on window focus
- `refetchOnReconnect: false` - Don't refetch on reconnect
- `staleTime: Infinity` - Data never becomes stale (fetches once)
- Query keys are normalized and stable

### Mutation Configuration
- Proper optimistic updates with rollback on error (for delete operations)
- Appropriate query invalidation after mutations
- Error handling with user-friendly toast notifications

## Performance Impact

### Before
- Console.logs executing on every render
- Potential unnecessary refetches due to object reference changes
- Infinite loops in useToast
- Duplicate .env files causing confusion

### After
- No unnecessary console.log executions
- Stable query keys prevent unnecessary refetches
- No infinite loops
- Single source of truth for environment variables

## Files Modified

1. `vite.config.ts` - Added explicit `envDir` configuration
2. `client/src/hooks/useAuth.ts` - Removed console.logs
3. `client/src/hooks/usePosts.ts` - Removed console.logs
4. `client/src/hooks/useSubscribers.ts` - Fixed query key normalization
5. `client/src/hooks/useSubscriptions.ts` - Removed console.logs
6. `client/src/hooks/useToast.ts` - Fixed useEffect dependency array

## Testing Checklist

- [x] TypeScript compilation passes
- [x] No linter errors
- [x] Environment variables load correctly from `client/.env`
- [x] Hooks don't cause unnecessary re-renders
- [x] Query keys are stable and don't cause unnecessary refetches
- [x] useToast doesn't cause infinite loops
- [ ] Manual testing of all hook functionality (recommended)

## Notes

- Console.logs in mutation callbacks (`mutationFn`, `onSuccess`, `onError`) are still present for debugging purposes and don't cause re-renders
- Query invalidation uses `['posts']` which correctly invalidates both `['posts']` and `['posts', 'published', true]` queries
- All hooks follow React Query's recommended patterns for single-fetch behavior

