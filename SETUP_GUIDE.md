# 🚀 LinkedIn Clone - Setup & Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Local Installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Cloudinary Account** - [Sign up for free](https://cloudinary.com/)

## 📁 Project Structure

```
linkedin-clone/
├── client/          # React Frontend
│   ├── src/
│   ├── package.json
│   └── .env
└── server/          # Express Backend
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── utils/
    ├── package.json
    └── .env
```

## 🔧 Installation Steps

### 1. Clone or Navigate to the Project

```powershell
cd "c:\Royal Technosoft P Limited\23_GENERAL3_AHM\Internships\AppDost - Full Stack\linkedin-clone"
```

### 2. Backend Setup

#### Navigate to server directory
```powershell
cd server
```

#### Install dependencies
```powershell
npm install
```

#### Create .env file
```powershell
copy .env.example .env
```

#### Configure environment variables in `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (Choose one)
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/linkedin-clone

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

#### Start the backend server
```powershell
npm run dev
```

The server will start on `http://localhost:5000`

### 3. Frontend Setup

#### Open a new PowerShell terminal and navigate to client directory
```powershell
cd "c:\Royal Technosoft P Limited\23_GENERAL3_AHM\Internships\AppDost - Full Stack\linkedin-clone\client"
```

#### Install dependencies
```powershell
npm install
```

#### Create .env file
```powershell
copy .env.example .env
```

#### Configure environment variables in `.env`:

```env
# API URL (backend server)
VITE_API_URL=http://localhost:5000/api

# Cloudinary Configuration (optional for direct upload)
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Start the frontend development server
```powershell
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔑 Getting Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com/) and create a free account
2. After logging in, go to Dashboard
3. Copy the following credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Paste them in your `.env` files

## 🗄️ MongoDB Setup Options

### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use `mongodb://localhost:27017/linkedin-clone` as connection string

### Option 2: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and replace in `.env`

## ✅ Verify Installation

### Check Backend
Open `http://localhost:5000` in your browser. You should see:
```json
{
  "success": true,
  "message": "LinkedIn Clone API",
  "version": "1.0.0"
}
```

### Check Frontend
Open `http://localhost:5173` in your browser. You should see the LinkedIn Clone homepage.

## 🎯 Features to Test

1. **Sign Up** - Create a new account
2. **Login** - Login with your credentials
3. **Create Post** - Add text and/or image
4. **Like Post** - Like/unlike posts
5. **Comment** - Add comments on posts
6. **Edit Profile** - Update profile information
7. **Delete Post** - Delete your own posts
8. **View Profile** - Visit user profiles

## 🚀 Deployment Guide

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click "New Project"
4. Import your repository
5. Set root directory to `client`
6. Add environment variables:
   - `VITE_API_URL` = your backend URL
7. Deploy

### Backend (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com/) and sign in
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables (all from `.env`)
7. Deploy

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Check if MongoDB service is running
- Verify connection string in `.env`
- Check firewall settings

### Cloudinary Upload Error
- Verify credentials are correct
- Check if images are under 5MB
- Ensure image formats are supported (JPEG, PNG, GIF, WebP)

## 📧 Support

For issues or questions, contact: hr@appdost.in

## 🎉 You're All Set!

Your LinkedIn Clone is now running locally. Start building and testing! 🚀

---

**Happy Coding!** 💻✨
