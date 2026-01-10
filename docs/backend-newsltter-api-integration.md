# Newsletter API Endpoints Documentation

Complete API reference for the Newsletter FastAPI service. All endpoints are prefixed with `/api/newsletter`.

**Base URL:** `http://localhost:8000/api/newsletter` (development)  
**Production URL:** `https://your-domain.com/api/newsletter`

---

## Table of Contents

1. [Authentication Flow](#authentication-flow)
2. [Authentication Endpoints](#authentication-endpoints)
3. [Subscriber Endpoints](#subscriber-endpoints)
4. [Subscription Endpoints](#subscription-endpoints)
5. [Post Endpoints](#post-endpoints)
6. [Data Models](#data-models)
7. [Error Handling](#error-handling)

---

## Authentication Flow

### Overview

The API uses JWT (JSON Web Tokens) for authentication with access tokens and refresh tokens:

- **Access Token**: Short-lived (30 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens
- **Token Type**: Bearer token in Authorization header

### Authentication Flow Diagram

```
1. Login → Get access_token + refresh_token
2. Use access_token in Authorization header for protected endpoints
3. When access_token expires → Use refresh_token to get new access_token
4. Logout → Revoke refresh_token
```

### Token Storage Recommendations

- **Access Token**: Store in memory or session storage (not localStorage for security)
- **Refresh Token**: Store in httpOnly cookie or secure storage
- **Never expose tokens in URLs or logs**

---

## Authentication Endpoints

### 1. Login

**POST** `/auth/login`

Authenticate user and receive access and refresh tokens.

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "6961ec70a780d322a62519d6",
    "username": "test_admin",
    "role": "admin",
    "authorization_level": "admin"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Incorrect username or password
- `500 Internal Server Error`: Login failed

**Example:**
```javascript
const response = await fetch('http://localhost:8000/api/newsletter/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'test_admin',
    password: 'testpass123'
  })
});
const data = await response.json();
// Store tokens securely
localStorage.setItem('access_token', data.access_token);
localStorage.setItem('refresh_token', data.refresh_token);
```

---

### 2. Refresh Token

**POST** `/auth/refresh`

Get a new access token using a valid refresh token.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error Responses:**
- `401 Unauthorized`: Refresh token expired or invalid

**Example:**
```javascript
const refreshToken = localStorage.getItem('refresh_token');
const response = await fetch('http://localhost:8000/api/newsletter/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refresh_token: refreshToken })
});
const data = await response.json();
localStorage.setItem('access_token', data.access_token);
```

---

### 3. Logout

**POST** `/auth/logout`

Revoke refresh token and log out user.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:** `200 OK`
```json
{
  "message": "Successfully logged out"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `500 Internal Server Error`: Logout failed

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
await fetch('http://localhost:8000/api/newsletter/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
// Clear tokens from storage
localStorage.removeItem('access_token');
localStorage.removeItem('refresh_token');
```

---

### 4. Get Current User

**GET** `/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:** `200 OK`
```json
{
  "id": "6961ec70a780d322a62519d6",
  "username": "test_admin",
  "role": "admin",
  "authorization_level": "admin"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
const response = await fetch('http://localhost:8000/api/newsletter/auth/me', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
const user = await response.json();
```

---

## Subscriber Endpoints

### 1. List Subscribers

**GET** `/subscribers`

List all subscribers with pagination and filtering. **Admin only.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `skip` (int, default: 0): Number of subscribers to skip
- `limit` (int, default: 100, max: 1000): Maximum number of subscribers to return
- `search` (string, optional): Search term (searches email and name)
- `is_active` (boolean, optional): Filter by active status
- `plan_id` (string, optional): Filter by plan ID (`free`, `standard`, `premium`)

**Response:** `200 OK`
```json
{
  "subscribers": [
    {
      "id": "6961ef2797dd0a1924e153e9",
      "email": "subscriber@example.com",
      "name": "John Doe",
      "is_active": true,
      "plan_id": "free",
      "subscribed_at": "2026-01-10T06:18:15.941220+00:00",
      "unsubscribed_at": null
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 100
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an admin
- `400 Bad Request`: Invalid plan_id

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
const response = await fetch(
  'http://localhost:8000/api/newsletter/subscribers?skip=0&limit=10&plan_id=premium',
  {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  }
);
const data = await response.json();
```

---

### 2. Create Subscriber

**POST** `/subscribers`

Create a new subscriber. **Public endpoint (legacy)** - Creates subscriber with default `free` plan.

**Request:**
```json
{
  "email": "subscriber@example.com",
  "name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "id": "6961ef2797dd0a1924e153e9",
  "email": "subscriber@example.com",
  "name": "John Doe",
  "is_active": true,
  "plan_id": "free",
  "subscribed_at": "2026-01-10T06:18:15.941220+00:00",
  "unsubscribed_at": null
}
```

**Error Responses:**
- `409 Conflict`: Subscriber with email already exists
- `500 Internal Server Error`: Failed to create subscriber

**Note:** Automatically sets:
- `is_active`: `true`
- `subscribed_at`: Current UTC datetime
- `unsubscribed_at`: `null`

**Example:**
```javascript
const response = await fetch('http://localhost:8000/api/newsletter/subscribers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'subscriber@example.com',
    name: 'John Doe'
  })
});
const subscriber = await response.json();
```

---

### 3. Update Subscriber

**PATCH** `/subscribers/{id}`

Update subscriber information. **Admin only.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
- `id` (string): Subscriber MongoDB ObjectId

**Request:**
```json
{
  "name": "Updated Name",
  "is_active": false,
  "plan_id": "premium"
}
```

**Response:** `200 OK`
```json
{
  "id": "6961ef2797dd0a1924e153e9",
  "email": "subscriber@example.com",
  "name": "Updated Name",
  "is_active": false,
  "plan_id": "premium",
  "subscribed_at": "2026-01-10T06:18:15.941220+00:00",
  "unsubscribed_at": "2026-01-10T07:00:00.000000+00:00"
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an admin
- `404 Not Found`: Subscriber not found
- `400 Bad Request`: Invalid plan_id

**Note:** Setting `is_active` to `false` automatically sets `unsubscribed_at` to current datetime.

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
const response = await fetch(`http://localhost:8000/api/newsletter/subscribers/${subscriberId}`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    is_active: false,
    plan_id: 'premium'
  })
});
const updated = await response.json();
```

---

### 4. Change Subscriber Plan

**PATCH** `/subscribers/{id}/plan`

Change subscriber's subscription plan. **Public endpoint** - Authenticated users can change their own plan, admins can change any plan.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
- `id` (string): Subscriber MongoDB ObjectId

**Request:**
```json
{
  "plan_id": "premium"
}
```

**Response:** `200 OK`
```json
{
  "subscriber": {
    "id": "6961ef2797dd0a1924e153e9",
    "email": "subscriber@example.com",
    "name": "John Doe",
    "is_active": true,
    "plan_id": "premium",
    "subscribed_at": "2026-01-10T06:18:15.941220+00:00",
    "unsubscribed_at": null
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Subscriber not found
- `400 Bad Request`: Invalid plan_id

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
const response = await fetch(`http://localhost:8000/api/newsletter/subscribers/${subscriberId}/plan`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ plan_id: 'premium' })
});
const data = await response.json();
```

---

### 5. Delete Subscriber

**DELETE** `/subscribers/{id}`

Delete a subscriber. **Admin only.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
- `id` (string): Subscriber MongoDB ObjectId

**Response:** `204 No Content`

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an admin
- `404 Not Found`: Subscriber not found

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
await fetch(`http://localhost:8000/api/newsletter/subscribers/${subscriberId}`, {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
```

---

## Subscription Endpoints

### 1. Create Subscription

**POST** `/subscriptions`

Create a subscription (creates a subscriber with chosen plan). **Public endpoint** - Frontend should always use this for new subscriptions.

**Request:**
```json
{
  "email": "subscriber@example.com",
  "name": "John Doe",
  "plan_id": "premium",
  "payment_details": {
    "stripe_token": "tok_visa_1234"
  }
}
```

**Response:** `201 Created`
```json
{
  "subscription_id": "6961ef0f97dd0a1924e153e3",
  "status": "active",
  "plan": "premium",
  "subscriber": {
    "id": "6961ef0f97dd0a1924e153e3",
    "email": "subscriber@example.com",
    "name": "John Doe",
    "is_active": true,
    "plan_id": "premium",
    "subscribed_at": "2026-01-10T06:17:51.114580+00:00",
    "unsubscribed_at": null
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid plan_id
- `409 Conflict`: Subscriber with email already exists
- `500 Internal Server Error`: Failed to create subscription

**Note:** 
- `payment_details` is optional (for future Stripe integration)
- Automatically sets `is_active: true`, `subscribed_at`, and `unsubscribed_at: null`

**Example:**
```javascript
const response = await fetch('http://localhost:8000/api/newsletter/subscriptions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'subscriber@example.com',
    name: 'John Doe',
    plan_id: 'premium',
    payment_details: {
      stripe_token: 'tok_visa_1234'
    }
  })
});
const subscription = await response.json();
```

---

### 2. List Subscriptions

**GET** `/subscriptions`

List all subscriptions with filtering. **Admin only.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `skip` (int, default: 0): Number of subscriptions to skip
- `limit` (int, default: 100, max: 1000): Maximum number of subscriptions to return
- `plan_id` (string, optional): Filter by plan ID (`free`, `standard`, `premium`)
- `status` (string, optional): Filter by status (`active`)

**Response:** `200 OK`
```json
{
  "subscriptions": [
    {
      "subscription_id": "6961ef0f97dd0a1924e153e3",
      "status": "active",
      "plan": "premium",
      "subscriber": {
        "id": "6961ef0f97dd0a1924e153e3",
        "email": "subscriber@example.com",
        "name": "John Doe",
        "is_active": true,
        "plan_id": "premium",
        "subscribed_at": "2026-01-10T06:17:51.114580+00:00",
        "unsubscribed_at": null
      }
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 100
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an admin
- `400 Bad Request`: Invalid plan_id or status

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
const response = await fetch(
  'http://localhost:8000/api/newsletter/subscriptions?plan_id=premium&status=active',
  {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  }
);
const data = await response.json();
```

---

## Post Endpoints

### 1. List Posts

**GET** `/posts`

List all posts. Public users see only published posts. Admins see all posts.

**Headers (optional):**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `skip` (int, default: 0): Number of posts to skip
- `limit` (int, default: 100, max: 1000): Maximum number of posts to return
- `published` (boolean, optional): Filter by published status (admins only for unpublished)

**Response:** `200 OK`
```json
{
  "posts": [
    {
      "id": "6961ef1097dd0a1924e153e4",
      "title": "My First Post",
      "content": "# Hello World\n\nThis is my first post.",
      "excerpt": "Hello World...",
      "createdAt": "2026-01-10T06:17:52.844768+00:00",
      "published": true
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 100
}
```

**Error Responses:**
- `403 Forbidden`: Non-admin trying to view unpublished posts

**Example:**
```javascript
// Public access (only published posts)
const response = await fetch('http://localhost:8000/api/newsletter/posts?published=true');
const data = await response.json();

// Admin access (all posts)
const accessToken = localStorage.getItem('access_token');
const response = await fetch('http://localhost:8000/api/newsletter/posts', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
const data = await response.json();
```

---

### 2. Get Post

**GET** `/posts/{id}`

Get a single post by ID. Public users can only access published posts. Admins can access all posts.

**Headers (optional for published posts, required for unpublished):**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
- `id` (string): Post MongoDB ObjectId

**Response:** `200 OK`
```json
{
  "id": "6961ef1097dd0a1924e153e4",
  "title": "My First Post",
  "content": "# Hello World\n\nThis is my first post with **markdown**.",
  "excerpt": "Hello World...",
  "createdAt": "2026-01-10T06:17:52.844768+00:00",
  "published": true
}
```

**Error Responses:**
- `404 Not Found`: Post not found
- `403 Forbidden`: Non-admin trying to access unpublished post

**Example:**
```javascript
// Public access
const response = await fetch(`http://localhost:8000/api/newsletter/posts/${postId}`);
const post = await response.json();

// Admin access (unpublished posts)
const accessToken = localStorage.getItem('access_token');
const response = await fetch(`http://localhost:8000/api/newsletter/posts/${postId}`, {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
const post = await response.json();
```

---

### 3. Create Post

**POST** `/posts`

Create a new post. **Admin only.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "title": "My First Post",
  "content": "# Hello World\n\nThis is my first post with **markdown**.",
  "published": false
}
```

**Response:** `201 Created`
```json
{
  "id": "6961ef1097dd0a1924e153e4",
  "title": "My First Post",
  "content": "# Hello World\n\nThis is my first post with **markdown**.",
  "excerpt": "Hello World This is my first post with markdown...",
  "createdAt": "2026-01-10T06:17:52.844768+00:00",
  "published": false
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an admin
- `500 Internal Server Error`: Failed to create post

**Note:** Excerpt is automatically generated from content (first 150 characters, markdown stripped).

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
const response = await fetch('http://localhost:8000/api/newsletter/posts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'My First Post',
    content: '# Hello World\n\nThis is my first post.',
    published: false
  })
});
const post = await response.json();
```

---

### 4. Update Post

**PATCH** `/posts/{id}`

Update a post. **Admin only.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
- `id` (string): Post MongoDB ObjectId

**Request:**
```json
{
  "title": "Updated Title",
  "content": "# Updated Content\n\nNew content here.",
  "published": true
}
```

**Response:** `200 OK`
```json
{
  "id": "6961ef1097dd0a1924e153e4",
  "title": "Updated Title",
  "content": "# Updated Content\n\nNew content here.",
  "excerpt": "Updated Title New content here...",
  "createdAt": "2026-01-10T06:17:52.844768+00:00",
  "published": true
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an admin
- `404 Not Found`: Post not found

**Note:** Excerpt is automatically regenerated if content changes.

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
const response = await fetch(`http://localhost:8000/api/newsletter/posts/${postId}`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Updated Title',
    published: true
  })
});
const updated = await response.json();
```

---

### 5. Delete Post

**DELETE** `/posts/{id}`

Delete a post. **Admin only.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
- `id` (string): Post MongoDB ObjectId

**Response:** `204 No Content`

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an admin
- `404 Not Found`: Post not found

**Example:**
```javascript
const accessToken = localStorage.getItem('access_token');
await fetch(`http://localhost:8000/api/newsletter/posts/${postId}`, {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
```

---

## Data Models

### PlanEnum

Subscription plan types:

- `free`: Free plan
- `standard`: Standard plan
- `premium`: Premium plan

### User Roles

- `admin`: Administrator (full access)
- `user`: Regular user (limited access)

### Subscriber Model

```typescript
interface Subscriber {
  id?: string;                    // MongoDB ObjectId
  email: string;                  // Email address (unique)
  name?: string;                   // Subscriber name
  is_active: boolean;              // Active status (default: true)
  plan_id: "free" | "standard" | "premium";  // Subscription plan
  subscribed_at: string;           // ISO 8601 datetime
  unsubscribed_at?: string | null; // ISO 8601 datetime or null
}
```

### Post Model

```typescript
interface Post {
  id: string;                     // MongoDB ObjectId
  title: string;                  // Post title
  content: string;                 // Markdown content
  excerpt: string;                 // Auto-generated excerpt
  createdAt: string;               // ISO 8601 datetime
  published: boolean;              // Published status
}
```

### User Model

```typescript
interface User {
  id: string;                      // MongoDB ObjectId
  username: string;                 // Unique username
  role: "admin" | "user";          // User role
  authorization_level: string;     // Authorization level (same as role)
}
```

---

## Error Handling

### Standard Error Response

All errors follow this format:

```json
{
  "detail": "Error message description"
}
```

### HTTP Status Codes

- `200 OK`: Successful GET, PATCH request
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate email)
- `500 Internal Server Error`: Server error

### Common Error Scenarios

#### Authentication Errors

```javascript
// Token expired
if (response.status === 401) {
  // Try to refresh token
  const refreshToken = localStorage.getItem('refresh_token');
  const refreshResponse = await fetch('/api/newsletter/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken })
  });
  
  if (refreshResponse.ok) {
    const { access_token } = await refreshResponse.json();
    localStorage.setItem('access_token', access_token);
    // Retry original request
  } else {
    // Redirect to login
    window.location.href = '/login';
  }
}
```

#### Validation Errors

```javascript
// Invalid plan_id
if (response.status === 400) {
  const error = await response.json();
  console.error('Validation error:', error.detail);
  // Show error to user
}
```

---

## Frontend Integration Examples

### Complete Authentication Flow

```javascript
class NewsletterAPI {
  constructor(baseURL = 'http://localhost:8000/api/newsletter') {
    this.baseURL = baseURL;
  }

  async login(username, password) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
  }

  async getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async createSubscription(email, name, planId) {
    const response = await fetch(`${this.baseURL}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, plan_id: planId })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail);
    }
    
    return await response.json();
  }

  async listPosts(published = true) {
    const url = `${this.baseURL}/posts?published=${published}`;
    const response = await fetch(url);
    return await response.json();
  }
}

// Usage
const api = new NewsletterAPI();
await api.login('test_admin', 'testpass123');
const subscription = await api.createSubscription('user@example.com', 'John Doe', 'premium');
const posts = await api.listPosts(true);
```

---

## Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting in production.

---

## Support

For issues or questions, contact the development team or check the API health endpoint:

**GET** `/api/health`

Returns status of all services:
```json
{
  "gmail": "working",
  "gemini": "working",
  "discord": "working",
  "mongodb": "working"
}
```

---

## Changelog

### Version 1.0.0 (2026-01-10)
- Initial API release
- Authentication with JWT tokens
- Subscriber management
- Subscription management
- Post management
- Plan management

