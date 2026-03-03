# Contributing to Yoga 3D App

Thanks for contributing! Follow these steps to get started.

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/sumitiitj493-boop/yoga3D.git
cd yoga3D
```

### 2. Install Dependencies
```bash
# Backend dependencies
cd yoga-backend
npm install

# Return to root
cd ..
```

### 3. Setup Environment
- Make sure MongoDB is installed and running
- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:8080

### 4. Seed the Database
```bash
cd yoga-backend
npm run seed
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd yoga-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd yoga-asana-3d
python -m http.server 8080
```

Open: http://localhost:8080

---

## 🌿 Branch Workflow

### Creating a Feature Branch
```bash
# Update main branch first
git checkout main
git pull origin main

# Create your feature branch
git checkout -b feature/your-feature-name
```

### Making Changes
```bash
# Make your changes...

# Check what changed
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add: description of your feature"

# Push to GitHub
git push -u origin feature/your-feature-name
```

### Creating a Pull Request
1. Go to: https://github.com/sumitiitj493-boop/yoga3D
2. Click "Compare & pull request"
3. Add description of your changes
4. Click "Create pull request"
5. Wait for review!

---

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:
- `Add: Added meditation timer feature`
- `Fix: Fixed practice timer bug`
- `Update: Updated Sketchfab model for Tree Pose`
- `Improve: Improved dashboard UI`
- `Docs: Updated README with new features`

---

## 🎯 Areas to Contribute

### Easy Tasks:
- ✅ Add new Sketchfab yoga pose models
- ✅ Improve CSS styling and colors
- ✅ Add more achievement badges
- ✅ Write documentation

### Medium Tasks:
- 🔷 Add sound effects for timer
- 🔷 Create meditation mode
- 🔷 Add pose difficulty filters
- 🔷 Implement search functionality

### Advanced Tasks:
- 🔸 Add pose recommendations based on level
- 🔸 Create workout planner
- 🔸 Add social sharing features
- 🔸 Implement video tutorials

---

## 📂 Project Structure

```
yoga3D/
├── yoga-backend/           # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── controllers/       # Business logic
│   ├── routes/            # API routes
│   └── server.js          # Main server file
│
└── yoga-asana-3d/         # Frontend
    ├── index.html         # Main 3D viewer
    ├── dashboard.html     # User dashboard
    ├── assets/
    │   ├── js/           # JavaScript files
    │   └── css/          # Stylesheets
    └── assets/models/     # 3D models (if using GLB)
```

---

## 🔧 Adding a New Sketchfab Model

1. Get embed code from Sketchfab
2. Edit `yoga-backend/seed.js`
3. Add new pose:
```javascript
{ 
    name: 'PoseName', 
    sanskritName: 'Sanskrit Name', 
    difficulty: 'Beginner|Intermediate|Advanced',
    description: 'Pose description',
    benefits: ['Benefit 1', 'Benefit 2'],
    imageUrl: 'assets/images/pose.jpg',
    modelUrl: 'https://sketchfab.com/models/MODEL_ID/embed',
    modelType: 'sketchfab'
}
```
4. Update the count in console.log
5. Run: `npm run seed`
6. Commit and push!

---

## ✅ Testing Checklist

Before submitting a pull request:
- [ ] Code runs without errors
- [ ] Backend starts successfully
- [ ] Frontend displays correctly
- [ ] New features work as expected
- [ ] No console errors in browser
- [ ] Committed all necessary files

---

## 🤝 Code Style

- Use clear variable names
- Add comments for complex logic
- Keep functions small and focused
- Follow existing code formatting

---

## 📧 Questions?

- Create an issue on GitHub
- Or contact the maintainer

Happy coding! 🧘‍♀️✨
