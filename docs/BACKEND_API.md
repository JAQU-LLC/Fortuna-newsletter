# Backend API Documentation

## Overview
This document outlines all backend API endpoints required to support the Fortuna.ai newsletter platform frontend. These endpoints will be implemented in a Python FastAPI backend with MongoDB.

**Base URL**: All endpoints are prefixed with `/api` unless otherwise specified.

## Authentication

All admin endpoints require authentication via JWT token in the `Authorization` header. Authentication is admin-only and returns the authorization level/role of the authenticated user.

### POST /api/auth/login
**Description**: Admin login endpoint. Returns JWT token and authorization details.

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response** (200 OK):
```json
{
  "access_token": "string",
  "token_type": "bearer",
  "user": {
    "id": "string",
    "username": "string",
    "role": "admin",
    "authorization_level": "admin"
  }
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Incorrect username or password"
}
```

**Authorization**: Returns authorization level (e.g., "admin") to determine what actions the user can perform.

**Frontend Usage**: Used by `admin-login.tsx` via `store.login()` function.

---

### POST /api/auth/logout
**Description**: Admin logout endpoint. Invalidates the current session/token.

**Headers**:
- `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "message": "Successfully logged out"
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Frontend Usage**: Used by `admin-dashboard.tsx` via `store.logout()` function.

---

### GET /api/auth/me
**Description**: Get current authenticated admin user information and authorization level.

**Headers**:
- `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "id": "string",
  "username": "string",
  "role": "admin",
  "authorization_level": "admin"
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Frontend Usage**: Used to verify admin session on page load and get authorization level.

---

## Subscribers

### GET /api/subscribers
**Description**: Get all subscribers (admin only). Supports search and filtering.

**Headers**:
- `Authorization: Bearer <token>` (required)

**Query Parameters**:
- `search` (optional, string): Search by email or name
- `is_active` (optional, boolean): Filter by active status (`true`/`false`)
- `page` (optional, number, default: 1): Page number for pagination
- `limit` (optional, number, default: 50): Items per page

**Response** (200 OK):
```json
{
  "subscribers": [
    {
      "_id": "string",
      "email": "string",
      "name": "string",
      "is_active": true,
      "subscribed_at": "2024-01-15T00:00:00.000Z",
      "unsubscribed_at": null
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 50
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Frontend Usage**: Used by `admin-dashboard.tsx` to display subscriber list with search functionality.

**MongoDB Schema Alignment**: Matches `Subscriber` interface with `_id`, `is_active`, `subscribed_at`, `unsubscribed_at` fields.

---

### POST /api/subscribers
**Description**: Create a new subscriber (public endpoint for subscription). Used when user subscribes via payment page.

**Request Body**:
```json
{
  "name": "string",
  "email": "string"
}
```

**Response** (201 Created):
```json
{
  "_id": "string",
  "email": "string",
  "name": "string",
  "is_active": true,
  "subscribed_at": "2024-01-15T00:00:00.000Z",
  "unsubscribed_at": null
}
```

**Response** (400 Bad Request):
```json
{
  "detail": "Email already subscribed"
}
```

**Response** (422 Validation Error):
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**Frontend Usage**: Used by `payment.tsx` via `store.addSubscriber()` when user completes subscription form.

**MongoDB Schema Alignment**: Creates subscriber with `is_active: true`, `subscribed_at: current_timestamp`, `unsubscribed_at: null`.

---

### PATCH /api/subscribers/:id
**Description**: Update subscriber status (admin only - activate/deactivate). Toggles `is_active` and sets `unsubscribed_at` accordingly.

**Headers**:
- `Authorization: Bearer <token>` (required)

**Path Parameters**:
- `id` (string): Subscriber `_id` (MongoDB ObjectId)

**Request Body**:
```json
{
  "is_active": true
}
```

**Response** (200 OK):
```json
{
  "_id": "string",
  "email": "string",
  "name": "string",
  "is_active": false,
  "subscribed_at": "2024-01-15T00:00:00.000Z",
  "unsubscribed_at": "2024-04-01T00:00:00.000Z"
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Response** (404 Not Found):
```json
{
  "detail": "Subscriber not found"
}
```

**Frontend Usage**: Used by `admin-dashboard.tsx` via `store.toggleSubscriberStatus()` when admin clicks activate/deactivate button.

**MongoDB Schema Alignment**: 
- If `is_active: true` → sets `unsubscribed_at: null`
- If `is_active: false` → sets `unsubscribed_at: current_timestamp`

---

### DELETE /api/subscribers/:id
**Description**: Delete a subscriber permanently (admin only).

**Headers**:
- `Authorization: Bearer <token>` (required)

**Path Parameters**:
- `id` (string): Subscriber `_id` (MongoDB ObjectId)

**Response** (204 No Content)

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Response** (404 Not Found):
```json
{
  "detail": "Subscriber not found"
}
```

**Frontend Usage**: Currently not implemented in frontend, but may be needed for admin management.

---

## Posts

### GET /api/posts
**Description**: Get posts (public endpoint). Returns published posts by default. Admin can view all posts including unpublished.

**Query Parameters**:
- `published` (optional, boolean, default: `true`): Filter by published status. Admin-only parameter if `false`.
- `page` (optional, number, default: 1): Page number for pagination
- `limit` (optional, number, default: 20): Items per page

**Headers** (for unpublished posts):
- `Authorization: Bearer <token>` (required if `published=false`)

**Response** (200 OK):
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "excerpt": "string",
      "createdAt": "2024-04-01T00:00:00.000Z",
      "published": true
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

**Frontend Usage**: 
- Used by `posts.tsx` to display published posts (public)
- Used by `admin-dashboard.tsx` to display all posts including unpublished (admin)

---

### GET /api/posts/:id
**Description**: Get a single post by ID (public endpoint for published posts, admin-only for unpublished).

**Path Parameters**:
- `id` (string): Post ID

**Headers** (for unpublished posts):
- `Authorization: Bearer <token>` (required if post is unpublished)

**Response** (200 OK):
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "createdAt": "2024-04-01T00:00:00.000Z",
  "published": true
}
```

**Response** (404 Not Found):
```json
{
  "detail": "Post not found"
}
```

**Frontend Usage**: Used by `post-detail.tsx` to display individual post content. Currently uses `store.posts`, will be replaced with API call.

**Note**: Content should be stored as markdown and rendered on frontend using `react-markdown`.

---

### POST /api/posts
**Description**: Create a new post (admin only). Content should be in markdown format.

**Headers**:
- `Authorization: Bearer <token>` (required)

**Request Body**:
```json
{
  "title": "string",
  "content": "string",
  "published": true
}
```

**Response** (201 Created):
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "createdAt": "2024-04-01T00:00:00.000Z",
  "published": true
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Response** (422 Validation Error):
```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**Frontend Usage**: Used by `admin-dashboard.tsx` via `store.addPost()` when admin publishes a new post using markdown editor.

**Note**: 
- The `excerpt` should be auto-generated from the first 150 characters of content (with markdown stripped) + "..." if content is longer.
- Content is stored as markdown and rendered using `react-markdown` on frontend.
- Markdown formatting should be stripped for excerpt generation.

---

### PATCH /api/posts/:id
**Description**: Update a post (admin only). Can update title, content (markdown), or published status.

**Headers**:
- `Authorization: Bearer <token>` (required)

**Path Parameters**:
- `id` (string): Post ID

**Request Body** (all fields optional):
```json
{
  "title": "string",
  "content": "string",
  "published": false
}
```

**Response** (200 OK):
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "createdAt": "2024-04-01T00:00:00.000Z",
  "published": false
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Response** (404 Not Found):
```json
{
  "detail": "Post not found"
}
```

**Frontend Usage**: Currently not implemented in frontend, but will be needed for admin to edit existing posts.

**Note**: If `content` is updated, `excerpt` should be regenerated automatically.

---

### DELETE /api/posts/:id
**Description**: Delete a post (admin only).

**Headers**:
- `Authorization: Bearer <token>` (required)

**Path Parameters**:
- `id` (string): Post ID

**Response** (204 No Content)

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Response** (404 Not Found):
```json
{
  "detail": "Post not found"
}
```

**Frontend Usage**: Currently not implemented in frontend, but will be needed for admin to delete posts.

---

## Subscriptions

### POST /api/subscriptions
**Description**: Create a new subscription (payment processing - public endpoint). This creates both a subscriber record and a subscription record. For free plan, no payment processing is required.

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "plan_id": "free" | "standard" | "premium",
  "payment_details": {
    "card_number": "string",
    "expiry": "string",
    "cvc": "string"
  }
}
```

**Note**: For `plan_id: "free"`, `payment_details` can be omitted or empty.

**Response** (201 Created):
```json
{
  "subscription_id": "string",
  "status": "active",
  "plan": "free" | "standard" | "premium",
  "subscriber": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "is_active": true,
    "subscribed_at": "2024-01-15T00:00:00.000Z",
    "unsubscribed_at": null
  }
}
```

**Response** (400 Bad Request):
```json
{
  "detail": "Payment failed" | "Email already subscribed"
}
```

**Response** (422 Validation Error):
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "invalid email format",
      "type": "value_error"
    }
  ]
}
```

**Frontend Usage**: Used by `payment.tsx` when user completes subscription form. Currently creates subscriber via `store.addSubscriber()`, but should create subscription record and handle Stripe payment processing for paid plans.

**MongoDB Schema Alignment**: 
- Creates subscriber with `is_active: true`, `subscribed_at: current_timestamp`, `unsubscribed_at: null`
- Creates subscription record linking subscriber to plan
- For paid plans, processes payment via Stripe before creating subscription

**Future Integration**: This endpoint will integrate with Stripe for `standard` and `premium` plans.

---

### GET /api/subscriptions
**Description**: Get all subscriptions (admin only). Useful for subscription management and analytics.

**Headers**:
- `Authorization: Bearer <token>` (required)

**Query Parameters**:
- `plan_id` (optional, string): Filter by plan (`free`, `standard`, `premium`)
- `status` (optional, string): Filter by subscription status (`active`, `cancelled`, `expired`)
- `page` (optional, number, default: 1): Page number for pagination
- `limit` (optional, number, default: 50): Items per page

**Response** (200 OK):
```json
{
  "subscriptions": [
    {
      "subscription_id": "string",
      "subscriber": {
        "_id": "string",
        "email": "string",
        "name": "string"
      },
      "plan": "free" | "standard" | "premium",
      "status": "active",
      "created_at": "2024-01-15T00:00:00.000Z",
      "updated_at": "2024-01-15T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 50
}
```

**Frontend Usage**: Currently not implemented in frontend, but may be needed for admin subscription management dashboard.

---

## Plan Configuration

### GET /api/plan-config
**Description**: Get current plan configuration (public endpoint). Returns which plan is marked as "most popular" and which plans are disabled.

**Response** (200 OK):
```json
{
  "most_popular": "free" | "standard" | "premium" | null,
  "disabled_plans": ["standard", "premium"]
}
```

**Frontend Usage**: 
- Used by `home.tsx` to determine which plan to highlight as "most popular" and which plans to disable
- Currently uses `localStorage` via `planConfig.ts`, should be replaced with API call

---

### PATCH /api/plan-config
**Description**: Update plan configuration (admin only). Allows admin to set which plan is "most popular" and which plans are disabled.

**Headers**:
- `Authorization: Bearer <token>` (required)

**Request Body**:
```json
{
  "most_popular": "free" | "standard" | "premium" | null,
  "disabled_plans": ["standard", "premium"]
}
```

**Response** (200 OK):
```json
{
  "most_popular": "free",
  "disabled_plans": ["standard", "premium"]
}
```

**Response** (400 Bad Request):
```json
{
  "detail": "A plan cannot be both most popular and disabled"
}
```

**Response** (401 Unauthorized):
```json
{
  "detail": "Not authenticated"
}
```

**Response** (422 Validation Error):
```json
{
  "detail": [
    {
      "loc": ["body", "disabled_plans"],
      "msg": "invalid plan_id",
      "type": "value_error"
    }
  ]
}
```

**Frontend Usage**: Used by `admin-dashboard.tsx` when admin changes plan configuration settings. Currently uses `localStorage` via `planConfig.ts`, should be replaced with API call.

**Validation Rules**:
- `most_popular` cannot be in `disabled_plans` array (mutually exclusive)
- `disabled_plans` can contain `free`, `standard`, `premium`
- If a plan is set as `most_popular`, it must be removed from `disabled_plans`

---

## Error Responses

All endpoints may return the following error responses:

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 403 Forbidden
```json
{
  "detail": "Not enough permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "error message",
      "type": "error_type"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Authentication Flow

1. Admin navigates to `/admin` and enters credentials
2. Frontend calls `POST /api/auth/login` with `username` and `password`
3. Server validates credentials and returns JWT token with user info including `authorization_level`
4. Frontend stores token (in memory or secure storage) and authorization level
5. Subsequent admin requests include `Authorization: Bearer <token>` header
6. Server validates token on each request and checks authorization level for protected routes
7. Admin calls `POST /api/auth/logout` to invalidate session (optional, token expiry also handles logout)

---

## Data Models

### Subscriber (MongoDB Schema)
```typescript
{
  _id: ObjectId,              // MongoDB ObjectId
  email: string,              // Unique, required
  name: string,               // Required
  is_active: boolean,         // Default: true
  subscribed_at: ISODate,     // ISO 8601 timestamp
  unsubscribed_at: ISODate | null  // ISO 8601 timestamp or null
}
```

### Post (Backend Schema)
```typescript
{
  id: string,                 // UUID or MongoDB ObjectId string
  title: string,              // Required
  content: string,            // Markdown format, required
  excerpt: string,            // Auto-generated from content (first 150 chars, markdown stripped)
  createdAt: ISODate,         // ISO 8601 timestamp
  published: boolean          // Default: false (draft)
}
```

### Plan Configuration (Backend Schema)
```typescript
{
  most_popular: "free" | "standard" | "premium" | null,
  disabled_plans: Array<"free" | "standard" | "premium">
}
```

---

## Notes

- **Timestamps**: All timestamps are in ISO 8601 format (UTC) with timezone information (e.g., `2024-01-15T00:00:00.000Z`)
- **IDs**: Post IDs can be UUID strings or MongoDB ObjectId strings. Subscriber IDs are MongoDB ObjectIds (returned as strings in JSON)
- **Authorization**: Admin endpoints require valid JWT token in `Authorization: Bearer <token>` header
- **Authorization Level**: Currently only "admin" role exists. The `authorization_level` field is returned in login response for future role-based access control
- **Markdown Support**: Post content is stored as markdown and rendered on frontend using `react-markdown` with `remark-gfm`, `rehype-raw`, and `rehype-sanitize`
- **Excerpt Generation**: Post excerpts are auto-generated server-side by stripping markdown formatting from the first 150 characters of content
- **Frontend State**: The frontend currently uses local in-memory store (`store.ts`) and `localStorage` (plan config) - these will be replaced with API calls when backend is implemented
- **Pagination**: All list endpoints support pagination with `page` and `limit` query parameters. Response includes `total`, `page`, and `limit` fields
- **Search**: Subscriber list endpoint supports search by email or name via `search` query parameter
- **Plan Configuration**: Currently stored in `localStorage` on frontend, but should be persisted in backend database for consistency
- **Stripe Integration**: Subscription endpoint will integrate with Stripe for paid plans (`standard`, `premium`). Free plan subscriptions don't require payment processing

---

## Frontend Action Mapping

### From `store.ts`:
- `addSubscriber(name, email)` → `POST /api/subscribers` (or `POST /api/subscriptions` for payment flow)
- `toggleSubscriberStatus(id)` → `PATCH /api/subscribers/:id`
- `addPost(title, content)` → `POST /api/posts`
- `login(username, password)` → `POST /api/auth/login`
- `logout()` → `POST /api/auth/logout`

### From `admin-dashboard.tsx`:
- Display subscribers list → `GET /api/subscribers` (with search query)
- Display posts list → `GET /api/posts?published=false` (admin sees all)
- Update plan config → `PATCH /api/plan-config`

### From `posts.tsx`:
- Display published posts → `GET /api/posts?published=true`

### From `post-detail.tsx`:
- Display single post → `GET /api/posts/:id`

### From `home.tsx`:
- Get plan config → `GET /api/plan-config`

### From `payment.tsx`:
- Create subscription → `POST /api/subscriptions` (handles subscriber creation + payment)

### From `planConfig.ts`:
- Get plan config → `GET /api/plan-config` (currently uses `localStorage`)
- Set plan config → `PATCH /api/plan-config` (currently uses `localStorage`)

---

## Future Enhancements

The following endpoints may be needed in the future but are not currently used by the frontend:

1. **Post Management**:
   - `PATCH /api/posts/:id` - Edit existing posts (admin)
   - `DELETE /api/posts/:id` - Delete posts (admin)

2. **Subscription Management**:
   - `GET /api/subscriptions` - List all subscriptions (admin)
   - `PATCH /api/subscriptions/:id` - Update subscription status (admin)
   - `DELETE /api/subscriptions/:id` - Cancel subscription (admin/user)

3. **Subscriber Management**:
   - `DELETE /api/subscribers/:id` - Delete subscriber (admin)

4. **Analytics**:
   - `GET /api/analytics/stats` - Get dashboard statistics (admin)
   - `GET /api/analytics/subscribers` - Subscriber growth analytics (admin)
   - `GET /api/analytics/posts` - Post engagement analytics (admin)

5. **Email Verification**:
   - `POST /api/subscribers/verify` - Send verification email
   - `GET /api/subscribers/verify/:token` - Verify email token

6. **Unsubscribe**:
   - `POST /api/subscribers/unsubscribe` - Public unsubscribe endpoint (no auth required)
   - `GET /api/subscribers/unsubscribe/:token` - Unsubscribe via email link
