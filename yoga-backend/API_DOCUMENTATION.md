# 📡 Yoga 3D API Documentation

Comprehensive REST API for the Yoga 3D platform with authentication, asana management, and progress tracking.

## Base URL
```
http://localhost:5000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 10  // Optional, for list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Endpoints

---

## 🔐 Authentication Routes

### Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "level": "Beginner"  // Optional: Beginner, Intermediate, Advanced
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "level": "Beginner",
    "avatar": "https://ui-avatars.com/api/?name=John+Doe",
    "totalPracticeTime": 0,
    "streak": 0
  }
}
```

**Error Responses:**
- `400` - Validation error or email already exists

---

### Login User
Authenticate and receive JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "level": "Beginner",
    "avatar": "https://ui-avatars.com/api/?name=John+Doe",
    "totalPracticeTime": 120,
    "streak": 5
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials

---

### Get Current User
Get authenticated user's profile.

**Endpoint:** `GET /api/auth/me`

**Headers:** `Authorization: Bearer <token>` (Required)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "level": "Intermediate",
    "avatar": "https://ui-avatars.com/api/?name=John+Doe",
    "totalPracticeTime": 240,
    "streak": 7,
    "favoritePoses": [
      {
        "_id": "60a7b...",
        "name": "Tree Pose",
        "sanskritName": "Vrikshasana"
      }
    ],
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Not authorized

---

### Update User Details
Update user profile information.

**Endpoint:** `PUT /api/auth/updatedetails`

**Headers:** `Authorization: Bearer <token>` (Required)

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "level": "Advanced"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* Updated user object */ }
}
```

---

### Toggle Favorite Pose
Add or remove a pose from favorites.

**Endpoint:** `POST /api/auth/favorites/:asanaId`

**Headers:** `Authorization: Bearer <token>` (Required)

**Parameters:**
- `asanaId` - MongoDB ObjectId of the asana

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* Updated user with favoritePoses populated */ }
}
```

---

## 🧘 Asana Routes

### Get All Asanas
Retrieve all yoga poses.

**Endpoint:** `GET /api/asanas`

**Success Response (200):**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "60a7b...",
      "name": "Tree Pose",
      "sanskritName": "Vrikshasana",
      "difficulty": "Beginner",
      "description": "Balance on one leg like a tree...",
      "benefits": [
        "Improves balance",
        "Strengthens legs",
        "Opens hips"
      ],
      "imageUrl": "assets/images/tree.jpg",
      "modelUrl": "assets/models/tree.glb"
    }
  ]
}
```

---

### Get Single Asana
Retrieve details of a specific pose.

**Endpoint:** `GET /api/asanas/:id`

**Parameters:**
- `id` - MongoDB ObjectId of the asana

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* Asana object */ }
}
```

**Error Responses:**
- `404` - Asana not found

---

## 📊 Progress Routes

### Get All Progress
Get user's progress for all poses.

**Endpoint:** `GET /api/progress`

**Headers:** `Authorization: Bearer <token>` (Required)

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "60a7c...",
      "user": "507f1f77bcf86cd799439011",
      "asana": {
        "_id": "60a7b...",
        "name": "Tree Pose",
        "sanskritName": "Vrikshasana"
      },
      "practiceCount": 15,
      "totalDuration": 900,  // seconds
      "lastPracticed": "2026-03-03T10:00:00.000Z",
      "mastered": true,
      "rating": 5,
      "notes": "Feeling great with this pose!",
      "sessions": [
        {
          "duration": 60,
          "date": "2026-03-03T10:00:00.000Z",
          "feedback": "Practice session completed"
        }
      ]
    }
  ]
}
```

---

### Get Asana Progress
Get progress for a specific pose.

**Endpoint:** `GET /api/progress/:asanaId`

**Headers:** `Authorization: Bearer <token>` (Required)

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* Progress object for specific asana */ }
}
```

**Error Responses:**
- `404` - No progress found for this pose

---

### Record Practice Session
Log a practice session for a pose.

**Endpoint:** `POST /api/progress/:asanaId`

**Headers:** `Authorization: Bearer <token>` (Required)

**Request Body:**
```json
{
  "duration": 300,  // seconds
  "feedback": "Great session today!",
  "rating": 4  // Optional: 1-5
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* Updated progress object */ },
  "userStats": {
    "totalPracticeTime": 245,  // minutes
    "streak": 8
  }
}
```

**Features:**
- Automatically increments practice count
- Adds to total duration
- Updates streak if practicing daily
- Auto-masters pose after 10 practices

---

### Update Practice Notes
Add or update notes for a pose.

**Endpoint:** `PUT /api/progress/:asanaId/notes`

**Headers:** `Authorization: Bearer <token>` (Required)

**Request Body:**
```json
{
  "notes": "Focus on ankle stability"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* Updated progress object */ }
}
```

---

### Get User Statistics
Get comprehensive user statistics and achievements.

**Endpoint:** `GET /api/progress/stats/user`

**Headers:** `Authorization: Bearer <token>` (Required)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalPracticeTime": 240,  // minutes
    "streak": 7,
    "totalPosesAttempted": 8,
    "masteredPoses": 3,
    "totalSessions": 45,
    "favoritePosesCount": 5,
    "level": "Intermediate",
    "achievements": [
      "🌱 First Steps",
      "🔥 Dedicated Yogi",
      "📅 Week Warrior"
    ]
  }
}
```

**Achievement Criteria:**
- 🌱 First Steps: 1+ sessions
- 🔥 Dedicated Yogi: 10+ sessions
- ⭐ Yoga Master: 50+ sessions
- 📅 Week Warrior: 7+ day streak
- 🏆 Month Champion: 30+ day streak
- 🎯 Pose Master: 5+ mastered poses

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (authentication required) |
| 404 | Not Found |
| 500 | Server Error |

## Rate Limiting

Currently, no rate limiting is implemented. For production use, consider implementing rate limiting middleware.

## Interactive Documentation

Visit `/api-docs` when the server is running for interactive Swagger documentation where you can test all endpoints directly.

---

**Last Updated:** March 3, 2026