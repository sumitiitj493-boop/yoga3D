# 🚀 Quick Start Guide - Yoga 3D Platform

## Prerequisites
- Node.js 14+ installed
- MongoDB running (local or Atlas)
- A web browser

## Step-by-Step Setup

### 1. Install Dependencies
```bash
cd yoga-backend
npm install
```

### 2. Configure Environment
The `.env` file is already set up with:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/yoga-app
```

### 3. Seed the Database (First Time Only)
```bash
npm run seed
```
✅ This will create 12 yoga poses in your database

### 4. Start the Server
```bash
npm run dev
```

### 5. Open Your Browser
Navigate to: **http://localhost:5000**

## 🎯 Test the Complete System

### Test #1: Create an Account
1. Go to http://localhost:5000/register.html
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Level: Beginner
3. Click "Create Account"
4. ✅ You should be redirected to the dashboard

### Test #2: Practice a Pose
1. Go to http://localhost:5000 (home/3D viewer)
2. Select "Tree Pose (Vrikshasana)" from dropdown
3. Click "♥️ Add to Favorites"
4. Click "▶️ Start Practice"
5. Wait 30 seconds
6. Click "⏸️ Pause Practice"
7. Click "💾 Save Session"
8. ✅ You should see a success message with your streak!

### Test #3: View Your Dashboard
1. Go to http://localhost:5000/dashboard.html
2. ✅ You should see:
   - Your user info and avatar
   - Streak: 1 day
   - Total practice time
   - 1 pose attempted
   - Recent activity showing Tree Pose
   - Achievement: "🌱 First Steps"

### Test #4: Browse Gallery
1. Go to http://localhost:5000/asanas.html
2. Click filter buttons (All, Beginner, Intermediate, Advanced)
3. ✅ You should see poses filtered by difficulty

### Test #5: API Documentation
1. Go to http://localhost:5000/api-docs
2. ✅ You should see interactive Swagger documentation
3. Try the "GET /api/asanas" endpoint
4. Click "Try it out" → "Execute"
5. ✅ You should see all 12 poses returned

## 📱 All Available Pages

- **3D Viewer**: http://localhost:5000
- **Gallery**: http://localhost:5000/asanas.html
- **Dashboard**: http://localhost:5000/dashboard.html
- **Login**: http://localhost:5000/login.html
- **Register**: http://localhost:5000/register.html
- **About**: http://localhost:5000/about.html
- **Contact**: http://localhost:5000/contact.html
- **API Docs**: http://localhost:5000/api-docs

## 🎮 Features to Try

### User Features
- ✅ Register and login
- ✅ Practice timer (track your sessions)
- ✅ Save practice sessions
- ✅ Build daily streaks
- ✅ Add poses to favorites
- ✅ View statistics and achievements
- ✅ See practice history
- ✅ Master poses (practice 10 times)

### Interactive 3D Viewer
- ✅ Rotate the 3D model (click and drag)
- ✅ Zoom in/out (scroll wheel)
- ✅ Switch between poses
- ✅ See pose details and benefits
- ✅ Track practice time

### Developer Features
- ✅ RESTful API with Swagger docs
- ✅ JWT authentication
- ✅ MongoDB with Mongoose
- ✅ Progress tracking system
- ✅ Achievement system

## 🔑 Test Credentials
After registration, you can login with:
- Email: test@example.com
- Password: test123

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem**: "MongooseServerSelectionError"
**Solution**: 
```bash
# Make sure MongoDB is running
# On Windows:
net start MongoDB

# On Mac/Linux:
sudo service mongod start

# Or use MongoDB Atlas cloud connection
```

### Port Already in Use
**Problem**: "Port 5000 is already in use"
**Solution**: 
```bash
# Change PORT in .env file to 3000 or 8000
```

### Dependencies Not Installed
**Problem**: "Cannot find module 'express'"
**Solution**: 
```bash
cd yoga-backend
npm install
```

## 📊 Expected Output When Starting Server

```
🚀 Server: http://localhost:5000
📚 API Docs: http://localhost:5000/api-docs
🧘 3D Viewer: http://localhost:5000
📊 Features: Auth, Progress Tracking, 3D Visualization
```

## 🎯 Next Steps

1. ✅ **Practice Different Poses**: Try all 12 poses in the 3D viewer
2. ✅ **Build Your Streak**: Practice daily to increase your streak
3. ✅ **Unlock Achievements**: Practice to unlock all 6 achievements
4. ✅ **Master Poses**: Practice each pose 10 times to master it
5. ✅ **Explore API**: Use the Swagger docs to test endpoints

## 📚 Need Help?

- **API Documentation**: Check `API_DOCUMENTATION.md`
- **Frontend Guide**: Check `FRONTEND_API_INTEGRATION.md`
- **Full README**: Check `README.md`
- **Implementation Details**: Check `IMPLEMENTATION_SUMMARY.md`

---

**Enjoy your yoga journey! 🧘‍♀️✨**
