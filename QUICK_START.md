# LinkedIn Clone - Quick Start Commands

## 🚀 Initial Setup (First Time Only)

### Backend Setup
```powershell
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env file with your credentials
# Then start the server
npm run dev
```

### Frontend Setup (In new terminal)
```powershell
# Navigate to client folder
cd client

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env file
# Then start the frontend
npm run dev
```

## 🔄 Daily Development Commands

### Start Backend (Terminal 1)
```powershell
cd server
npm run dev
```

### Start Frontend (Terminal 2)
```powershell
cd client
npm run dev
```

## 📦 Production Build

### Build Frontend
```powershell
cd client
npm run build
```

### Test Production Build Locally
```powershell
cd client
npm run preview
```

## 🧪 Testing Endpoints

### Test Backend Health
```powershell
# Using PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health
```

### Test API with curl (if installed)
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

## 🗄️ MongoDB Commands

### Start Local MongoDB (if installed locally)
```powershell
mongod
```

### Connect to MongoDB (if installed locally)
```powershell
mongosh
use linkedin-clone
db.users.find()
db.posts.find()
```

## 🔧 Troubleshooting

### Clear Node Modules and Reinstall
```powershell
# Backend
cd server
Remove-Item -Recurse -Force node_modules
npm install

# Frontend
cd client
Remove-Item -Recurse -Force node_modules
npm install
```

### Check Running Processes
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Check if port 5173 is in use
netstat -ano | findstr :5173
```

### Kill Process on Port
```powershell
# Find PID
netstat -ano | findstr :5000

# Kill process (replace <PID> with actual PID)
taskkill /PID <PID> /F
```

## 📝 Git Commands

### Initial Commit
```powershell
git init
git add .
git commit -m "Initial commit: LinkedIn Clone"
```

### Create GitHub Repository
```powershell
# After creating repo on GitHub
git remote add origin https://github.com/yourusername/linkedin-clone.git
git branch -M main
git push -u origin main
```

### Regular Updates
```powershell
git add .
git commit -m "Your commit message"
git push
```

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Backend Health**: http://localhost:5000/health
- **API Documentation**: http://localhost:5000

## 📋 Environment Variables Quick Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/linkedin-clone
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 🎯 Features Checklist

- [ ] User Registration
- [ ] User Login
- [ ] User Logout
- [ ] Create Post
- [ ] Upload Image with Post
- [ ] View All Posts
- [ ] Like Post
- [ ] Unlike Post
- [ ] Add Comment
- [ ] Delete Comment
- [ ] Edit Post
- [ ] Delete Post
- [ ] View User Profile
- [ ] Edit User Profile
- [ ] Dark Mode Toggle
- [ ] Responsive Design

## 📧 Get Help

For issues or questions:
- Email: hr@appdost.in
- Check SETUP_GUIDE.md
- Check DEPLOYMENT_GUIDE.md

Happy Coding! 🚀
