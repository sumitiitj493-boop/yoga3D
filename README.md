# Yoga 3D - Interactive Yoga Learning Platform

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![MongoDB](https://img.shields.io/badge/mongodb-4.4%2B-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A full-stack yoga learning platform for exploring poses, tracking progress, and managing user accounts with email OTP verification.

## Features

### Visualization
- Interactive yoga pose viewer
- Support for Sketchfab embeds, local GIFs, and procedural pose rendering
- Beginner, Intermediate, and Advanced pose categories

### Authentication
- Secure registration and login with JWT and bcrypt
- Email OTP verification before first login
- User profile, favorites, and protected dashboard features

### Progress Tracking
- Practice session tracking
- Daily streak tracking
- Pose mastery progress
- User dashboard with stats

### API
- Express + MongoDB backend
- Swagger docs at `/api-docs`

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- Nodemailer
- Swagger

### Frontend
- HTML
- CSS
- JavaScript
- Three.js

## Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd yoga3D
```

### 2. Install backend dependencies
```bash
cd yoga-backend
npm install
```

### 3. Configure environment variables
Create `yoga-backend/.env` from `yoga-backend/.env.example`.

Example:

```env
PORT=5000
APP_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
MONGO_URI=mongodb://127.0.0.1:27017/yoga-app
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your_16_character_app_password
SMTP_FROM_EMAIL=your-gmail-address@gmail.com
SMTP_FROM_NAME=Yoga3D Backend
```

### 4. Seed the database
```bash
npm run seed
```

### 5. Start the backend
```bash
npm start
```

### 6. Open the app
- App: `http://localhost:5000`
- Register: `http://localhost:5000/register.html`
- Verify Email: `http://localhost:5000/verify-email.html`
- API Docs: `http://localhost:5000/api-docs`
- Health: `http://localhost:5000/health`

## Authentication Flow

1. User registers on `register.html`
2. Backend creates an unverified account
3. OTP is sent by email
4. User enters the OTP on `verify-email.html`
5. Account becomes verified and login is allowed

## Project Structure

```text
yoga3D/
|-- yoga-backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |   |-- errorResponse.js
|   |   `-- sendEmail.js
|   |-- .env.example
|   |-- seed.js
|   |-- server.js
|   `-- package.json
|-- yoga-asana-3d/
|   |-- assets/
|   |-- index.html
|   |-- asanas.html
|   |-- dashboard.html
|   |-- login.html
|   |-- register.html
|   `-- verify-email.html
|-- .gitignore
`-- README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/verify-email-otp`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/updatedetails`
- `POST /api/auth/favorites/:asanaId`

### Asanas
- `GET /api/asanas`
- `GET /api/asanas/:id`

### Progress
- `GET /api/progress`
- `GET /api/progress/:asanaId`
- `POST /api/progress/:asanaId`
- `PUT /api/progress/:asanaId/notes`
- `GET /api/progress/stats/user`

## Security Notes

- Do not commit your real `yoga-backend/.env`
- Use `yoga-backend/.env.example` as the public template
- Gmail SMTP requires 2-Step Verification and an App Password
- In production, set `APP_URL`, `CORS_ORIGIN`, `MONGO_URI`, and a strong `JWT_SECRET`

## Manual Test Checklist

1. Start the backend with `npm run dev`
2. Register a new account
3. Confirm OTP email arrives
4. Verify the OTP successfully
5. Log in with the verified account
6. Save a practice session and check the dashboard

## Related Docs

- [QUICK_START.md](QUICK_START.md)
- [NEXT_STEPS.md](NEXT_STEPS.md)
- [3D_MODELS_GUIDE.md](3D_MODELS_GUIDE.md)

## License

MIT
