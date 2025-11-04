# 🚀 LinkedIn Clone - Deployment Guide

## 📦 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas database created
- [ ] Cloudinary account configured
- [ ] Environment variables documented
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] All features tested in production

## 🗄️ Step 1: Setup MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier M0)
3. **Database Access**: Create database user
   - Username: `linkedinclone`
   - Password: Generate strong password
   - Built-in Role: `Atlas admin`
4. **Network Access**: Add IP addresses
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific IP addresses for security
5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone`

## 📁 Step 2: Push Code to GitHub

```powershell
# Navigate to project root
cd "c:\Royal Technosoft P Limited\23_GENERAL3_AHM\Internships\AppDost - Full Stack\linkedin-clone"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: LinkedIn Clone full stack application"

# Create GitHub repository (do this on GitHub.com first)
# Then add remote
git remote add origin https://github.com/yourusername/linkedin-clone.git

# Push to GitHub
git push -u origin main
```

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### 3.2 Configure Service

**Basic Settings:**
- **Name**: `linkedin-clone-api`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3.3 Add Environment Variables

Click "Advanced" → "Add Environment Variable"

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
JWT_SECRET=your_production_jwt_secret_here_use_strong_random_string
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=https://your-app-name.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://your-service-name.onrender.com`

### 3.5 Test Backend

Visit: `https://your-service-name.onrender.com`

Should return:
```json
{
  "success": true,
  "message": "LinkedIn Clone API",
  "version": "1.0.0"
}
```

## 🌐 Step 4: Deploy Frontend to Vercel

### 4.1 Create Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository

### 4.2 Configure Project

**Framework Preset**: Vite
**Root Directory**: `client`
**Build Command**: `npm run build` (auto-detected)
**Output Directory**: `dist` (auto-detected)

### 4.3 Add Environment Variables

Click "Environment Variables" and add:

```env
VITE_API_URL=https://your-service-name.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 4.4 Deploy

1. Click "Deploy"
2. Wait for build (2-5 minutes)
3. Your app will be live at: `https://your-app-name.vercel.app`

## ⚙️ Step 5: Update CORS Settings

After frontend deployment, update backend environment variable:

1. Go to Render Dashboard → Your Service
2. Environment → Edit
3. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-app-name.vercel.app
   ```
4. Save changes (triggers auto-redeploy)

## ✅ Step 6: Test Production App

### Test Complete Flow:

1. **Visit your app**: `https://your-app-name.vercel.app`
2. **Register**: Create a new account
3. **Login**: Sign in with credentials
4. **Create Post**: Add a post with image
5. **Like**: Like some posts
6. **Comment**: Add comments
7. **Profile**: View and edit profile
8. **Delete**: Delete your own post

### Check Browser Console:
- No errors
- API calls successful
- Images loading correctly

### Check Network Tab:
- API responses returning data
- Status codes 200/201 for success

## 🔐 Security Checklist

- [ ] Strong JWT secret in production
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables never committed to Git
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Helmet security headers active

## 📧 Step 7: Submit Your Work

Email to: **hr@appdost.in**

**Subject**: LinkedIn Clone - Full Stack Internship Assignment

**Body**:
```
Hello,

I have completed the LinkedIn Clone assignment. Here are the details:

🔗 Live Links:
- Frontend: https://your-app-name.vercel.app
- Backend API: https://your-service-name.onrender.com

💻 GitHub Repository:
https://github.com/yourusername/linkedin-clone

✨ Features Implemented:
✅ User Authentication (Sign up/Login/Logout)
✅ Create Posts (Text + Image)
✅ View All Posts (Feed)
✅ Like Functionality
✅ Comment System
✅ Edit/Delete Posts
✅ User Profiles
✅ Profile Editing
✅ Image Upload (Cloudinary)
✅ Responsive Design
✅ Dark Mode

🛠️ Tech Stack:
Frontend: React.js, Chakra UI, TailwindCSS, Axios
Backend: Node.js, Express.js, MongoDB, JWT
Deployment: Vercel (Frontend), Render (Backend)

📝 Test Credentials (if needed):
Email: test@example.com
Password: test123

Thank you for the opportunity!

Best regards,
[Your Name]
```

## 🚨 Common Issues & Fixes

### Issue: Render service sleeping (Free tier)
**Solution**: First request takes 30-60 seconds to wake up. Consider upgrading or keep service warm.

### Issue: Images not uploading
**Solution**: 
- Check Cloudinary credentials
- Verify upload preset is "unsigned"
- Check file size < 5MB

### Issue: CORS errors
**Solution**:
- Update CLIENT_URL in Render
- Check Vercel environment variables
- Verify API URL format (no trailing slash)

### Issue: MongoDB connection timeout
**Solution**:
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Check user permissions

## 📊 Performance Optimization

### For Free Tier:

1. **Keep Render Service Warm**:
   - Use a cron job or UptimeRobot to ping every 5 minutes
   - Or accept cold start delay

2. **Optimize Images**:
   - Already implemented: Cloudinary auto-optimization
   - Images compressed before upload

3. **Enable Caching**:
   - Vercel auto-caches static assets
   - Render auto-scales based on traffic

## 🎉 Congratulations!

Your LinkedIn Clone is now live and ready for review! 🚀

---

**Need Help?** Contact hr@appdost.in
