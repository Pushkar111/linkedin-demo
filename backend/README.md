# LinkedIn Clone Backend API

Complete Node.js + Express + MongoDB backend to replace Firebase services from the [pieroguerrero/linkedin](https://github.com/pieroguerrero/linkedin) repository.

## 🚀 Features

- ✅ **User Authentication** (Email/Password, Google OAuth, Anonymous)
- ✅ **JWT-based Authorization** with access and refresh tokens
- ✅ **Post Management** (Create, Read, Update, Delete)
- ✅ **Social Features** (Like, Comment, Share)
- ✅ **User Profiles** with customizable information
- ✅ **Image Uploads** via Cloudinary
- ✅ **Search Functionality** for users and posts
- ✅ **Pagination** for efficient data loading
- ✅ **Security** (Helmet, CORS, Rate Limiting)
- ✅ **Input Validation** with express-validator
- ✅ **Error Handling** with detailed error messages

## 📦 Tech Stack

- **Runtime:** Node.js v16+
- **Framework:** Express.js 4.18.2
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** Cloudinary
- **Validation:** express-validator
- **Security:** Helmet, CORS, bcryptjs, express-rate-limit

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── cloudinary.js         # Cloudinary configuration
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Post.js               # Post schema with comments
│   │   └── Reaction.js           # Reaction schema (bonus)
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── postController.js     # Post logic
│   │   ├── userController.js     # User/Profile logic
│   │   └── uploadController.js   # Upload logic
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── postRoutes.js         # Post endpoints
│   │   ├── userRoutes.js         # User endpoints
│   │   └── uploadRoutes.js       # Upload endpoints
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── error.js              # Error handling
│   │   ├── validation.js         # Input validation
│   │   └── upload.js             # Multer config
│   ├── utils/
│   │   ├── jwt.js                # JWT utilities
│   │   └── cloudinaryUpload.js   # Cloudinary helpers
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_*` - Cloudinary credentials (optional)

### 4. Start the server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/google` | Google OAuth | No |
| POST | `/api/auth/anonymous` | Anonymous login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/refresh` | Refresh token | No |

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts (paginated) | No |
| GET | `/api/posts/:id` | Get single post | No |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/:id` | Update post | Yes (owner) |
| DELETE | `/api/posts/:id` | Delete post | Yes (owner) |
| POST | `/api/posts/:id/like` | Toggle like | Yes |
| POST | `/api/posts/:id/comments` | Add comment | Yes |
| DELETE | `/api/posts/:id/comments/:commentId` | Delete comment | Yes |
| GET | `/api/posts/user/:userId` | Get user's posts | No |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | No |
| GET | `/api/users/search?q=query` | Search users | No |
| GET | `/api/users/:id` | Get user profile | No |
| PUT | `/api/users/:id` | Update profile | Yes (owner) |
| DELETE | `/api/users/:id` | Deactivate account | Yes (owner) |
| GET | `/api/users/:id/posts` | Get user's posts | No |

### Uploads

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/uploads` | Upload image | Yes |

## 📝 Request/Response Examples

### Register User

**Request:**
```json
POST /api/auth/register
{
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
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

### Create Post

**Request:**
```json
POST /api/posts
Authorization: Bearer <token>
{
  "text": "Hello LinkedIn!",
  "imageBase64": "data:image/png;base64,iVBORw0KGgo..."
}
```

**Response:**
```json
{
  "success": true,
  "post": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullName": "John Doe",
      "profilePicURL": "https://..."
    },
    "text": "Hello LinkedIn!",
    "mediaType": "photo",
    "mediaURL": "https://res.cloudinary.com/...",
    "likes": [],
    "comments": [],
    "likeCount": 0,
    "commentCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

Tokens are also sent as HTTP-only cookies for added security.

## 🌐 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (default Vite dev server)
- Add your production frontend URL to `.env`

## 🚨 Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (development only)"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📊 Database Schema

### User Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required for email auth),
  fullName: String (required),
  authMethod: 'email-password' | 'google' | 'anonymous',
  profilePicURL: String,
  active: Boolean,
  profile: {
    firstName: String,
    lastName: String,
    headline: String,
    about: String,
    countryLoc: String,
    postalCodeLoc: String,
    backgroundPicURL: String,
    sections: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  user: ObjectId (ref: User),
  text: String (required, max 3000 chars),
  mediaType: 'photo' | 'video' | 'none',
  mediaURL: String,
  likes: [ObjectId] (ref: User),
  comments: [{
    user: ObjectId (ref: User),
    text: String (max 500 chars),
    replies: [{
      user: ObjectId,
      text: String,
      createdAt: Date
    }],
    createdAt: Date
  }],
  viewCount: Number,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- **Password Hashing:** bcryptjs with salt rounds
- **JWT Tokens:** Signed with secret key
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Helmet:** Security headers
- **CORS:** Restricted origin access
- **Input Validation:** express-validator
- **MongoDB Injection Protection:** Mongoose sanitization

## 🚀 Deployment

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user and whitelist IP
4. Copy connection string to `.env` as `MONGO_URI`

### Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get credentials from dashboard
3. Add to `.env`:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### Deploy to Render

1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect GitHub repository
4. Set environment variables
5. Deploy!

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 📧 Support

For issues and questions, please open an issue on GitHub.
