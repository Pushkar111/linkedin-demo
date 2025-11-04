# API Documentation

Complete REST API documentation for the LinkedIn Clone Backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-backend.onrender.com/api
```

## Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "fullName": "John Doe",
    "profilePicURL": "https://...",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "headline": "",
      "about": ""
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### Login User

Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "fullName": "John Doe",
    "profilePicURL": "https://...",
    "profile": { ... },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Google OAuth

Login or register via Google OAuth.

**Endpoint:** `POST /auth/google`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@gmail.com",
  "fullName": "John Doe",
  "profilePicURL": "https://lh3.googleusercontent.com/...",
  "googleId": "1234567890"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

---

### Anonymous Login

Create temporary guest account.

**Endpoint:** `POST /auth/anonymous`

**Auth Required:** No

**Request Body:** None

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "guest-ABC123@linkedin-clone.com",
    "fullName": "Guest User ABC123",
    "authMethod": "anonymous",
    ...
  }
}
```

---

### Get Current User

Get logged-in user details.

**Endpoint:** `GET /auth/me`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "fullName": "John Doe",
    "profilePicURL": "https://...",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "headline": "Software Developer",
      "about": "Passionate about technology...",
      "countryLoc": "United States",
      "postalCodeLoc": "94105"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Logout

Logout current user.

**Endpoint:** `POST /auth/logout`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Refresh Token

Get new access token using refresh token.

**Endpoint:** `POST /auth/refresh`

**Auth Required:** No

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📝 Post Endpoints

### Get All Posts

Get paginated list of posts (news feed).

**Endpoint:** `GET /posts`

**Auth Required:** No (optional for personalization)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Posts per page (default: 10)

**Example:** `GET /posts?page=1&limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": {
        "_id": "507f1f77bcf86cd799439012",
        "fullName": "John Doe",
        "profilePicURL": "https://...",
        "profile": {
          "headline": "Software Developer"
        }
      },
      "text": "Hello LinkedIn!",
      "mediaType": "photo",
      "mediaURL": "https://res.cloudinary.com/...",
      "likes": ["507f1f77bcf86cd799439013"],
      "comments": [],
      "likeCount": 1,
      "commentCount": 0,
      "viewCount": 10,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Single Post

Get post by ID.

**Endpoint:** `GET /posts/:id`

**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "user": { ... },
    "text": "Hello LinkedIn!",
    "mediaType": "photo",
    "mediaURL": "https://...",
    "likes": [],
    "comments": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "user": {
          "fullName": "Jane Smith",
          "profilePicURL": "https://..."
        },
        "text": "Great post!",
        "replies": [],
        "createdAt": "2024-01-01T01:00:00.000Z"
      }
    ],
    "likeCount": 0,
    "commentCount": 1,
    "viewCount": 15,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Create Post

Create a new post.

**Endpoint:** `POST /posts`

**Auth Required:** Yes

**Request Body:**
```json
{
  "text": "Hello LinkedIn! This is my first post.",
  "imageBase64": "data:image/png;base64,iVBORw0KGgo..." // Optional
}
```

Or with file upload (multipart/form-data):
```
text: "Hello LinkedIn!"
image: <file>
```

**Success Response (201):**
```json
{
  "success": true,
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "user": { ... },
    "text": "Hello LinkedIn! This is my first post.",
    "mediaType": "photo",
    "mediaURL": "https://res.cloudinary.com/...",
    "likes": [],
    "comments": [],
    "likeCount": 0,
    "commentCount": 0,
    "viewCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Post text is required"
}
```

---

### Update Post

Update an existing post (owner only).

**Endpoint:** `PUT /posts/:id`

**Auth Required:** Yes (must be post owner)

**Request Body:**
```json
{
  "text": "Updated post text",
  "imageBase64": "data:image/png;base64,..." // Optional
}
```

**Success Response (200):**
```json
{
  "success": true,
  "post": { ... }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this post"
}
```

---

### Delete Post

Delete a post (soft delete - owner only).

**Endpoint:** `DELETE /posts/:id`

**Auth Required:** Yes (must be post owner)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

### Toggle Like

Like or unlike a post.

**Endpoint:** `POST /posts/:id/like`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "isLiked": true,
  "likeCount": 5,
  "post": { ... }
}
```

---

### Add Comment

Add a comment to a post.

**Endpoint:** `POST /posts/:id/comments`

**Auth Required:** Yes

**Request Body:**
```json
{
  "text": "Great post! Thanks for sharing."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "comment": {
    "_id": "507f1f77bcf86cd799439015",
    "user": "507f1f77bcf86cd799439012",
    "text": "Great post! Thanks for sharing.",
    "replies": [],
    "createdAt": "2024-01-01T01:00:00.000Z"
  },
  "commentCount": 1,
  "post": { ... }
}
```

---

### Delete Comment

Delete a comment (owner or post owner only).

**Endpoint:** `DELETE /posts/:id/comments/:commentId`

**Auth Required:** Yes (must be comment owner or post owner)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Comment deleted successfully",
  "commentCount": 0,
  "post": { ... }
}
```

---

### Get User's Posts

Get all posts by a specific user.

**Endpoint:** `GET /posts/user/:userId`

**Auth Required:** No

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Posts per page (default: 10)

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "page": 1,
  "pages": 2,
  "posts": [ ... ]
}
```

---

## 👤 User Endpoints

### Get All Users

Get list of users (for suggestions).

**Endpoint:** `GET /users`

**Auth Required:** No (optional to exclude current user)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Users per page (default: 20)

**Success Response (200):**
```json
{
  "success": true,
  "count": 20,
  "total": 150,
  "page": 1,
  "pages": 8,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "profilePicURL": "https://...",
      "profile": {
        "headline": "Software Developer",
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  ]
}
```

---

### Search Users

Search users by name, email, or headline.

**Endpoint:** `GET /users/search`

**Auth Required:** No

**Query Parameters:**
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)

**Example:** `GET /users/search?q=john&page=1&limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "total": 3,
  "page": 1,
  "pages": 1,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "profilePicURL": "https://...",
      "profile": {
        "headline": "Software Developer"
      }
    }
  ]
}
```

---

### Get User Profile

Get user profile by ID.

**Endpoint:** `GET /users/:id`

**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "fullName": "John Doe",
    "profilePicURL": "https://...",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "headline": "Software Developer at Tech Corp",
      "about": "Passionate about technology and innovation...",
      "countryLoc": "United States",
      "postalCodeLoc": "94105",
      "backgroundPicURL": "https://...",
      "sections": ["experience", "education", "skills"]
    },
    "postCount": 25,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update User Profile

Update user profile (owner only).

**Endpoint:** `PUT /users/:id`

**Auth Required:** Yes (must be profile owner)

**Request Body:**
```json
{
  "fullName": "John Doe Jr.",
  "profile": {
    "firstName": "John",
    "lastName": "Doe Jr.",
    "headline": "Senior Software Developer",
    "about": "Updated bio...",
    "countryLoc": "United States",
    "postalCodeLoc": "94105"
  },
  "profileImageBase64": "data:image/png;base64,...", // Optional
  "backgroundImageBase64": "data:image/png;base64,..." // Optional
}
```

Or with file upload (multipart/form-data):
```
fullName: "John Doe Jr."
profile[headline]: "Senior Software Developer"
profileImage: <file>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": { ... }
}
```

---

### Deactivate Account

Deactivate user account (soft delete - owner only).

**Endpoint:** `DELETE /users/:id`

**Auth Required:** Yes (must be account owner)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account deactivated successfully"
}
```

---

### Get User's Posts

Get all posts by a user (same as `/posts/user/:userId`).

**Endpoint:** `GET /users/:id/posts`

**Auth Required:** No

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Posts per page (default: 10)

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "page": 1,
  "pages": 2,
  "posts": [ ... ]
}
```

---

## 📤 Upload Endpoints

### Upload Image

Upload image to Cloudinary.

**Endpoint:** `POST /uploads`

**Auth Required:** Yes

**Request Body (JSON):**
```json
{
  "imageBase64": "data:image/png;base64,iVBORw0KGgo..."
}
```

Or multipart/form-data:
```
image: <file>
```

**Success Response (200):**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/linkedin-clone/uploads/abc123.jpg",
  "publicId": "linkedin-clone/uploads/abc123"
}
```

---

## 🚨 Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [ // Optional - for validation errors
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Common HTTP Status Codes

- `200` - OK - Request successful
- `201` - Created - Resource created successfully
- `400` - Bad Request - Invalid input data
- `401` - Unauthorized - Authentication required or invalid token
- `403` - Forbidden - Not authorized to perform action
- `404` - Not Found - Resource not found
- `429` - Too Many Requests - Rate limit exceeded
- `500` - Internal Server Error - Server error

---

## 📊 Rate Limiting

API requests are rate-limited to prevent abuse:

- **Window:** 15 minutes
- **Max Requests:** 100 per IP address
- **Headers:**
  - `RateLimit-Limit`: Maximum requests allowed
  - `RateLimit-Remaining`: Remaining requests in current window
  - `RateLimit-Reset`: Time when limit resets

**Rate Limit Exceeded Response (429):**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## 🔒 Security Notes

1. **Always use HTTPS in production**
2. **Store JWT tokens securely** (localStorage or httpOnly cookies)
3. **Never expose sensitive data** (passwords, API keys)
4. **Validate all input** on both client and server
5. **Handle errors gracefully** without exposing internal details
6. **Use CORS properly** with allowed origins
7. **Keep dependencies updated** for security patches

---

## 📚 Additional Resources

- [Postman Collection](./postman_collection.json) - Import for easy testing
- [Frontend Integration Guide](./FRONTEND_INTEGRATION.md)
- [Deployment Guide](./README.md#deployment)

---

## 🤝 Support

For API issues or questions:
- GitHub Issues: [github.com/your-repo/issues](https://github.com)
- Email: support@example.com
- Documentation: [docs.example.com](https://docs.example.com)
