# 🧘 Yoga 3D - Interactive Yoga Learning Platform

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![MongoDB](https://img.shields.io/badge/mongodb-4.4%2B-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A comprehensive full-stack web application for learning and practicing yoga through interactive 3D visualization. Features user authentication, progress tracking, practice timers, and personalized dashboards.

---

## 🚀 Quick Start

**Ready to run?** See **[NEXT_STEPS.md](NEXT_STEPS.md)** for complete setup instructions!

**Want real 3D models?** See **[3D_MODELS_GUIDE.md](3D_MODELS_GUIDE.md)** for where to get free models!

### TL;DR - Start in 30 seconds:
```powershell
# Terminal 1 - Start Backend
cd yoga-backend
npm start

# Terminal 2 - Start Frontend  
cd yoga-asana-3d
python -m http.server 8080

# Open: http://localhost:8080
```

---

## ✨ Features

### 🎨 3D Visualization
- **Interactive 3D Models**: Rotate and examine yoga poses from every angle using Three.js
- **Dual Rendering System**: Supports both real .glb/.gltf models AND procedural poses
- **Auto-Fallback**: Automatically uses procedural pose if 3D model not found
- **Multiple Difficulty Levels**: Beginner, Intermediate, and Advanced poses
- **Real-time Pose Rendering**: Smooth animations with realistic lighting and shadows
- **12 Yoga Poses**: Curated collection covering all skill levels

### 🔐 User Authentication
- **Secure Registration & Login**: JWT-based authentication with bcrypt password hashing
- **User Profiles**: Customizable avatars and experience levels
- **Session Management**: Persistent login with token-based authentication

### 📊 Progress Tracking
- **Practice Sessions**: Record and track practice duration for each pose
- **Streak System**: Build daily practice streaks to stay motivated
- **Mastery Tracking**: Automatically mark poses as mastered after 10 practices
- **Session History**: View detailed history of all practice sessions
- **Personal Notes**: Add notes and ratings for each pose

### 🎯 Interactive Features
- **Practice Timer**: Built-in timer to track session duration
- **Favorites System**: Save favorite poses for quick access
- **Achievement Badges**: Unlock achievements as you progress
- **User Dashboard**: Comprehensive stats including total practice time, streak, and mastered poses
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📡 RESTful API
- **Swagger Documentation**: Interactive API documentation at `/api-docs`
- **CORS Enabled**: Ready for cross-origin requests
- **Error Handling**: Comprehensive error responses

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Swagger** - API documentation

### Frontend
- **HTML5/CSS3** - Structure and styling
- **JavaScript (ES6+)** - Client-side logic
- **Three.js** - 3D graphics rendering
- **Fetch API** - HTTP requests

## 🚀 Quick Start

### Prerequisites
```bash
# Node.js 14+ and npm
node --version
npm --version

# MongoDB 4.4+ (local or Atlas)
mongo --version
```

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Design_Credit_Sem4_Project
```

2. **Install backend dependencies**
```bash
cd yoga-backend
npm install
```

3. **Configure environment variables**
```bash
# Create .env file in yoga-backend/
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/yoga-app
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
NODE_ENV=development
```

4. **Seed the database** (first time only)
```bash
npm run seed
```

5. **Start the server**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

6. **Access the application**
- Frontend: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

## 📋 Project Structure

```
Design_Credit_Sem4_Project/
├── yoga-backend/              # Backend API
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   ├── asanaController.js # Asana CRUD operations
│   │   ├── authController.js  # Authentication logic
│   │   └── progressController.js # Progress tracking
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── Asana.js           # Asana schema
│   │   ├── User.js            # User schema with auth methods
│   │   └── UserProgress.js    # Progress tracking schema
│   ├── routes/
│   │   ├── asanaRoutes.js
│   │   ├── authRoutes.js
│   │   └── progressRoutes.js
│   ├── utils/
│   │   └── errorResponse.js
│   ├── server.js              # Express app entry point
│   ├── seed.js                # Database seeding script
│   └── package.json
│
└── yoga-asana-3d/            # Frontend
    ├── assets/
    │   ├── css/
    │   │   └── style.css          # Global styles
    │   └── js/
    │       └── api.js             # API integration module
    ├── index.html             # 3D Viewer page
    ├── asanas.html            # Gallery page
    ├── dashboard.html         # User dashboard
    ├── login.html             # Login page
    ├── register.html          # Registration page
    ├── about.html             # About page
    └── contact.html           # Contact page
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/updatedetails` - Update user profile (Protected)
- `POST /api/auth/favorites/:asanaId` - Toggle favorite pose (Protected)

### Asanas
- `GET /api/asanas` - Get all asanas
- `GET /api/asanas/:id` - Get single asana

### Progress
- `GET /api/progress` - Get all user progress (Protected)
- `GET /api/progress/:asanaId` - Get progress for specific pose (Protected)
- `POST /api/progress/:asanaId` - Record practice session (Protected)
- `PUT /api/progress/:asanaId/notes` - Update practice notes (Protected)
- `GET /api/progress/stats/user` - Get user statistics (Protected)

For detailed API documentation, visit `/api-docs` when the server is running.

## 📚 Usage Guide

### For Users

1. **Create an Account**
   - Navigate to `/register.html`
   - Fill in your details and select your experience level
   - You'll be automatically logged in

2. **Explore Poses**
   - Visit the 3D Viewer to interact with poses
   - Browse the Gallery to see all available poses
   - Filter by difficulty level

3. **Practice**
   - Select a pose in the 3D Viewer
   - Click "Start Practice" to begin the timer
   - When finished, click "Save Session" to record your practice

4. **Track Progress**
   - View your Dashboard to see stats and achievements
   - Monitor your practice streak
   - See which poses you've mastered

### For Developers

See [FRONTEND_API_INTEGRATION.md](yoga-asana-3d/FRONTEND_API_INTEGRATION.md) for detailed integration guide.

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Protection against XSS attacks
- **Input Validation**: Mongoose schema validation
- **CORS Configuration**: Controlled cross-origin access

## 🧪 Testing

### Manual Testing
1. Start the server: `npm run dev`
2. Visit http://localhost:5000
3. Register a new account
4. Practice a few poses and save sessions
5. Check your dashboard for updated stats

### API Testing
Use the Swagger UI at `/api-docs` to test all endpoints interactively.

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
# Add MongoDB Atlas URI to environment variables
heroku config:set MONGO_URI=your-atlas-uri
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main
```

### Frontend Deployment
The frontend is served statically by the Express server, so deploying the backend automatically deploys the frontend.

## 📈 Future Enhancements

- [ ] Video tutorials for each pose
- [ ] Social features (follow friends, share progress)
- [ ] Guided yoga sessions with sequences
- [ ] Voice commands for hands-free practice
- [ ] Mobile native apps (iOS/Android)
- [ ] AI-powered pose correction using camera
- [ ] Integration with fitness trackers
- [ ] Personalized practice recommendations

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

Design Credit Semester 4 Project

## 🙏 Acknowledgments

- Three.js community for excellent 3D rendering library
- MongoDB for robust database solution
- All yoga practitioners who inspired this project

---

**Made with ❤️ for the yoga community**