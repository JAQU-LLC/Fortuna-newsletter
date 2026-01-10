# Backend API Documentation

## Overview
This document outlines all backend API endpoints that should be implemented to support the Fortuna.ai newsletter platform frontend. These endpoints will be implemented in a FastAPI backend.

## Authentication

All admin endpoints require authentication. Authentication is admin-only and returns the authorization level/role of the authenticated user.

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

## Subscribers

### GET /api/subscribers
**Description**: Get all subscribers (admin only).

**Headers**:
- `Authorization: Bearer <token>`

**Query Parameters**:
- `search` (optional, string): Search by email or name
- `active` (optional, boolean): Filter by active status
- `page` (optional, number): Page number for pagination
- `limit` (optional, number): Items per page

**Response** (200 OK):
```json
{
  "subscribers": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "subscribed_at": "2024-01-15T00:00:00Z",
      "active": true
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

### POST /api/subscribers
**Description**: Create a new subscriber (public endpoint for subscription).

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
  "id": "string",
  "name": "string",
  "email": "string",
  "subscribed_at": "2024-01-15T00:00:00Z",
  "active": true
}
```

**Response** (400 Bad Request):
```json
{
  "detail": "Email already subscribed"
}
```

### PATCH /api/subscribers/:id
**Description**: Update subscriber status (admin only - activate/deactivate).

**Headers**:
- `Authorization: Bearer <token>`

**Path Parameters**:
- `id` (string): Subscriber ID

**Request Body**:
```json
{
  "active": true
}
```

**Response** (200 OK):
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "subscribed_at": "2024-01-15T00:00:00Z",
  "active": true
}
```

### DELETE /api/subscribers/:id
**Description**: Delete a subscriber (admin only).

**Headers**:
- `Authorization: Bearer <token>`

**Path Parameters**:
- `id` (string): Subscriber ID

**Response** (204 No Content)

## Posts

### GET /api/posts
**Description**: Get all published posts (public endpoint).

**Query Parameters**:
- `published` (optional, boolean, default: true): Filter by published status
- `page` (optional, number): Page number for pagination
- `limit` (optional, number): Items per page

**Response** (200 OK):
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "excerpt": "string",
      "content": "string",
      "created_at": "2024-04-01T00:00:00Z",
      "published": true
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

### GET /api/posts/:id
**Description**: Get a single post by ID (public endpoint).

**Path Parameters**:
- `id` (string): Post ID

**Response** (200 OK):
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "created_at": "2024-04-01T00:00:00Z",
  "published": true
}
```

**Response** (404 Not Found):
```json
{
  "detail": "Post not found"
}
```

### POST /api/posts
**Description**: Create a new post (admin only).

**Headers**:
- `Authorization: Bearer <token>`

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
  "created_at": "2024-04-01T00:00:00Z",
  "published": true
}
```

**Note**: The `excerpt` should be auto-generated from the first 150 characters of content + "..." if content is longer.

### PATCH /api/posts/:id
**Description**: Update a post (admin only).

**Headers**:
- `Authorization: Bearer <token>`

**Path Parameters**:
- `id` (string): Post ID

**Request Body**:
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
  "created_at": "2024-04-01T00:00:00Z",
  "published": false
}
```

### DELETE /api/posts/:id
**Description**: Delete a post (admin only).

**Headers**:
- `Authorization: Bearer <token>`

**Path Parameters**:
- `id` (string): Post ID

**Response** (204 No Content)

## Subscriptions

### POST /api/subscriptions
**Description**: Create a new subscription (payment processing - public endpoint).

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

**Response** (201 Created):
```json
{
  "subscription_id": "string",
  "status": "active",
  "plan": "standard",
  "subscriber": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

**Response** (400 Bad Request):
```json
{
  "detail": "Payment failed" | "Email already subscribed"
}
```

## Error Responses

All endpoints may return the following error responses:

**401 Unauthorized**:
```json
{
  "detail": "Not authenticated"
}
```

**403 Forbidden**:
```json
{
  "detail": "Not enough permissions"
}
```

**404 Not Found**:
```json
{
  "detail": "Resource not found"
}
```

**422 Validation Error**:
```json
{
  "detail": [
    {
      "loc": ["string"],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

**500 Internal Server Error**:
```json
{
  "detail": "Internal server error"
}
```

## Authentication Flow

1. Admin calls `POST /api/auth/login` with credentials
2. Server validates credentials and returns JWT token with user info including `authorization_level`
3. Frontend stores token and authorization level
4. Subsequent requests include `Authorization: Bearer <token>` header
5. Server validates token and checks authorization level for protected routes
6. Admin calls `POST /api/auth/logout` to invalidate session

## Notes

- All timestamps are in ISO 8601 format (UTC)
- All IDs are UUID strings
- Admin endpoints require valid JWT token in Authorization header
- Authorization level determines what actions can be performed (currently only "admin" role exists)
- The frontend currently uses local state - these endpoints will replace that functionality

