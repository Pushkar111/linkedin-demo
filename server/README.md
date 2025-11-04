# Server README

## Backend - LinkedIn Clone API

Express.js REST API with MongoDB for LinkedIn Clone application.

### Features
- JWT Authentication
- User Management
- Post CRUD Operations
- Like/Comment System
- Image Upload (Cloudinary)
- Input Validation
- Error Handling
- Rate Limiting
- Security Headers

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`

4. Start development server:
```bash
npm run dev
```

5. Start production server:
```bash
npm start
```

### Environment Variables

See `.env.example` for all required variables.

### API Documentation

#### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

#### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post (Protected)
- `PUT /api/posts/:id` - Update post (Protected)
- `DELETE /api/posts/:id` - Delete post (Protected)
- `POST /api/posts/:id/like` - Toggle like (Protected)
- `POST /api/posts/:id/comment` - Add comment (Protected)
- `DELETE /api/posts/:postId/comment/:commentId` - Delete comment (Protected)

#### Users
- `GET /api/users/search?q=query` - Search users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/posts` - Get user posts
- `PUT /api/users/:id` - Update profile (Protected)

### Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Create new Web Service
4. Add environment variables
5. Deploy

### Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Cloudinary
- Bcrypt
- Helmet
- CORS
