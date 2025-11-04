# LinkedIn Clone - Full Stack Social Media Application

A modern, full-stack social media application inspired by LinkedIn, built with the MERN stack.

## 🚀 Features

- ✅ **User Authentication** - Secure signup/login with JWT
- ✅ **Create Posts** - Share text content with optional images
- ✅ **Image Upload** - Powered by Cloudinary
- ✅ **Like Posts** - Real-time like functionality
- ✅ **Comment System** - Add and delete comments
- ✅ **Edit/Delete Posts** - Manage your own content
- ✅ **User Profiles** - Personalized profile pages
- ✅ **Responsive Design** - Works seamlessly on all devices
- ✅ **Dark Mode** - Toggle between light and dark themes

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Chakra UI** - Component library
- **TailwindCSS** - Utility-first CSS
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Bcrypt** - Password hashing

## 📦 Project Structure

```
linkedin-clone/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── theme/         # Chakra UI theme
│   └── package.json
│
└── server/                # Express Backend
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── middleware/        # Custom middleware
    ├── utils/             # Utility functions
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Toggle like
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:postId/comment/:commentId` - Delete comment

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/posts` - Get user's posts

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Add environment variables
4. Deploy

## 👨‍💻 Development

### Code Quality
- ES6+ syntax with ES Modules
- RESTful API design
- Proper error handling
- Input validation
- Security best practices
- Clean, modular code

### Best Practices Followed
- JWT authentication with httpOnly cookies
- Password hashing with bcrypt
- Protected routes with middleware
- Error handling middleware
- CORS configuration
- Rate limiting (optional)
- Helmet for security headers

## 📝 License

MIT License

## 👤 Author

**Your Name**
- Email: hr@appdost.in
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

Built as part of AppDost Full Stack Developer Internship Assignment

---

**Note:** This project demonstrates full-stack development skills including frontend, backend, and database integration with modern best practices.
