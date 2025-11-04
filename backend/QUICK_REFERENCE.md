# Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your credentials

# 3. Start development server
npm run dev

# 4. Start production server
npm start
```

## 🔑 Essential Environment Variables

```env
# Required
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
JWT_SECRET=your_super_secret_key_here

# Optional (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## 📡 Most Used Endpoints

```bash
# Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

# Posts
GET    /api/posts
POST   /api/posts
POST   /api/posts/:id/like
POST   /api/posts/:id/comments

# Users
GET    /api/users/:id
PUT    /api/users/:id
GET    /api/users/search?q=query
```

## 🔧 Common Tasks

### Test Health Check
```bash
curl http://localhost:5000/health
```

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","fullName":"Test User"}'
```

### Get All Posts
```bash
curl -X GET http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📚 Documentation Files

1. **README.md** - Complete setup guide
2. **API_DOCUMENTATION.md** - All endpoints with examples
3. **FRONTEND_INTEGRATION.md** - Firebase migration guide
4. **COMPLETION_SUMMARY.md** - Project overview

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check `MONGO_URI` in `.env`
- Verify MongoDB Atlas IP whitelist
- Confirm database user credentials

### JWT Token Invalid
- Check `JWT_SECRET` in `.env`
- Verify token format: `Bearer <token>`
- Check token expiration

### Image Upload Failed
- Verify Cloudinary credentials in `.env`
- Check file size (max 5MB)
- Verify file type (jpeg, jpg, png, gif, webp)

### CORS Error
- Set correct `FRONTEND_URL` in `.env`
- Check frontend is sending credentials
- Verify CORS headers in response

## 🔗 Useful Links

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Cloudinary: https://cloudinary.com
- Render: https://render.com
- JWT.io: https://jwt.io
- Postman: https://www.postman.com

## 📊 Project Structure

```
backend/
├── src/
│   ├── config/        # Database & Cloudinary
│   ├── models/        # Mongoose schemas
│   ├── controllers/   # Business logic
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth, validation, error
│   ├── utils/         # JWT, uploads
│   ├── app.js         # Express setup
│   └── server.js      # Entry point
├── package.json
└── .env.example
```

## 🎯 Key Features

✅ JWT Authentication (access + refresh tokens)
✅ Google OAuth & Anonymous login
✅ Post CRUD operations
✅ Like & Comment system
✅ Image uploads (Cloudinary)
✅ User profiles
✅ Search functionality
✅ Pagination
✅ Input validation
✅ Rate limiting
✅ Security (Helmet, CORS, bcrypt)

## 💡 Pro Tips

1. **Use nodemon for development** - Auto-restarts on file changes
2. **Check logs** - Server logs show all errors
3. **Test with Postman** - Easier than curl for complex requests
4. **Use MongoDB Compass** - GUI for database inspection
5. **Enable CORS** - Required for frontend integration
6. **Secure JWT_SECRET** - Use long random string in production
7. **Monitor rate limits** - Check response headers
8. **Handle errors** - All endpoints return consistent error format

## 🚀 Deployment Checklist

- [ ] Set `NODE_ENV=production` in environment
- [ ] Use strong `JWT_SECRET`
- [ ] Configure MongoDB Atlas with secure user
- [ ] Set up Cloudinary account
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Enable HTTPS in production
- [ ] Set up monitoring/logging
- [ ] Test all endpoints in production
- [ ] Configure rate limiting appropriately
- [ ] Set up backup strategy for database

## 📞 Support

- **Documentation:** See README.md, API_DOCUMENTATION.md
- **Issues:** GitHub Issues
- **Email:** support@example.com

---

**Last Updated:** 2024
**Version:** 1.0.0
