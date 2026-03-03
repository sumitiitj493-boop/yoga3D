# 🌐 Frontend API Integration Guide

Complete guide for integrating with the Yoga 3D API from your frontend application.

## Table of Contents
1. [Quick Start](#quick-start)
2. [API Module](#api-module)
3. [Authentication](#authentication)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

---

## Quick Start

The API integration is handled through the `yogaAPI` singleton object defined in `assets/js/api.js`.

### Include the API Module

```html
<script src="assets/js/api.js"></script>
```

The `yogaAPI` object is now available globally.

---

## API Module

### Initialization

The API automatically:
- Loads saved token from localStorage
- Loads saved user data from localStorage
- Persists authentication across page reloads

### Available Methods

#### Authentication Methods

```javascript
// Register a new user
await yogaAPI.register({
  name: "John Doe",
  email: "john@example.com",
  password: "securePass123",
  level: "Beginner"  // Optional
});

// Login
await yogaAPI.login({
  email: "john@example.com",
  password: "securePass123"
});

// Logout
yogaAPI.logout(); // Clears token and redirects to home

// Get current user
const user = await yogaAPI.getMe();

// Update profile
await yogaAPI.updateProfile({
  name: "John Smith",
  level: "Intermediate"
});

// Toggle favorite pose
await yogaAPI.toggleFavorite(asanaId);

// Check if user is logged in
if (yogaAPI.isAuthenticated()) {
  // User is logged in
}
```

#### Asana Methods

```javascript
// Get all asanas
const response = await yogaAPI.getAllAsanas();
const asanas = response.data;

// Get single asana
const response = await yogaAPI.getAsana(asanaId);
const asana = response.data;
```

#### Progress Methods

```javascript
// Get all progress
const response = await yogaAPI.getAllProgress();
const progress = response.data;

// Get progress for specific pose
const response = await yogaAPI.getAsanaProgress(asanaId);
const poseProgress = response.data;

// Record practice session
const response = await yogaAPI.recordPractice(asanaId, {
  duration: 300,  // seconds
  feedback: "Great session!",
  rating: 5  // Optional: 1-5
});

// Update notes
await yogaAPI.updateNotes(asanaId, "Focus on breathing");

// Get user statistics
const response = await yogaAPI.getUserStats();
const stats = response.data;
```

---

## Authentication

### User Properties

After successful login/register, user data is available at:

```javascript
yogaAPI.user
```

User object structure:
```javascript
{
  id: "507f1f77bcf86cd799439011",
  name: "John Doe",
  email: "john@example.com",
  level: "Beginner",
  avatar: "https://ui-avatars.com/api/?name=John+Doe",
  totalPracticeTime: 120,  // minutes
  streak: 5,
  favoritePoses: [...]  // Array of asana objects
}
```

### Token Management

Tokens are automatically:
- Stored in localStorage on login/register
- Included in all authenticated requests
- Cleared on logout

---

## Usage Examples

### Example 1: User Registration Flow

```html
<form id="register-form">
  <input type="text" id="name" required>
  <input type="email" id="email" required>
  <input type="password" id="password" required minlength="6">
  <select id="level">
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
  </select>
  <button type="submit">Register</button>
</form>

<script src="assets/js/api.js"></script>
<script>
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      await yogaAPI.register({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        level: document.getElementById('level').value
      });
      
      // Registration successful, redirect
      window.location.href = '/dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
</script>
```

### Example 2: Loading Asanas in Gallery

```javascript
async function loadGallery() {
  try {
    const response = await yogaAPI.getAllAsanas();
    const asanas = response.data;
    
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = asanas.map(asana => `
      <div class="card">
        <h3>${asana.name}</h3>
        <p>${asana.sanskritName}</p>
        <span class="badge">${asana.difficulty}</span>
        <p>${asana.description}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading asanas:', error);
  }
}

loadGallery();
```

### Example 3: Practice Timer with Session Recording

```javascript
let currentAsana = null;
let timerSeconds = 0;
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

async function saveSession() {
  if (!yogaAPI.isAuthenticated()) {
    alert('Please login to save your session');
    return;
  }
  
  try {
    const response = await yogaAPI.recordPractice(currentAsana._id, {
      duration: timerSeconds,
      feedback: 'Practice completed'
    });
    
    alert(`Session saved! Streak: ${response.userStats.streak} days`);
    timerSeconds = 0;
    updateTimerDisplay();
  } catch (error) {
    alert('Failed to save session');
  }
}
```

### Example 4: Displaying User Dashboard

```javascript
async function loadDashboard() {
  if (!yogaAPI.isAuthenticated()) {
    window.location.href = '/login.html';
    return;
  }
  
  try {
    // Load user data
    const user = await yogaAPI.getMe();
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-avatar').src = user.avatar;
    
    // Load statistics
    const statsResponse = await yogaAPI.getUserStats();
    const stats = statsResponse.data;
    
    document.getElementById('streak').textContent = stats.streak;
    document.getElementById('total-time').textContent = stats.totalPracticeTime;
    document.getElementById('mastered').textContent = stats.masteredPoses;
    
    // Display achievements
    const achievementsDiv = document.getElementById('achievements');
    achievementsDiv.innerHTML = stats.achievements
      .map(ach => `<span class="badge">${ach}</span>`)
      .join('');
      
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

loadDashboard();
```

### Example 5: Favorite Toggle Button

```javascript
let currentAsana = null;

function updateFavoriteButton() {
  if (!yogaAPI.user || !currentAsana) return;
  
  const btn = document.getElementById('favorite-btn');
  const isFavorite = yogaAPI.user.favoritePoses.some(
    p => p._id === currentAsana._id || p === currentAsana._id
  );
  
  btn.textContent = isFavorite ? '❤️ Remove Favorite' : '♥️ Add Favorite';
}

async function toggleFavorite() {
  if (!yogaAPI.isAuthenticated()) {
    window.location.href = '/login.html';
    return;
  }
  
  try {
    await yogaAPI.toggleFavorite(currentAsana._id);
    updateFavoriteButton();
  } catch (error) {
    alert('Failed to update favorite');
  }
}
```

### Example 6: Protected Page Check

```javascript
// At the top of dashboard.html or other protected pages
if (!yogaAPI.isAuthenticated()) {
  alert('Please login to access this page');
  window.location.href = '/login.html';
}
```

### Example 7: Update Navigation Based on Auth State

```javascript
function updateAuthLink() {
  const authLink = document.getElementById('auth-link');
  
  if (yogaAPI.isAuthenticated()) {
    authLink.innerHTML = `
      <a href="/dashboard.html">👤 ${yogaAPI.user.name}</a>
    `;
  } else {
    authLink.innerHTML = '<a href="/login.html">🔐 Login</a>';
  }
}

// Call on page load
updateAuthLink();
```

---

## Best Practices

### 1. Error Handling

Always wrap API calls in try-catch blocks:

```javascript
try {
  const response = await yogaAPI.someMethod();
  // Handle success
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
  alert('Something went wrong. Please try again.');
}
```

### 2. Loading States

Show loading indicators during API calls:

```javascript
const btn = document.getElementById('submit-btn');
btn.disabled = true;
btn.textContent = 'Loading...';

try {
  await yogaAPI.someMethod();
} finally {
  btn.disabled = false;
  btn.textContent = 'Submit';
}
```

### 3. Check Authentication Before Protected Actions

```javascript
if (!yogaAPI.isAuthenticated()) {
  alert('Please login first');
  window.location.href = '/login.html';
  return;
}
```

### 4. Redirect After Login/Register

```javascript
// After successful login
setTimeout(() => {
  window.location.href = '/dashboard.html';
}, 1000);
```

### 5. Keep User Data Fresh

Refresh user data after actions that modify it:

```javascript
// After recording a practice session
const response = await yogaAPI.recordPractice(asanaId, sessionData);
// User stats are automatically updated in the response
console.log('New streak:', response.userStats.streak);
```

### 6. Handle Expired Tokens

If a request fails with 401, redirect to login:

```javascript
try {
  await yogaAPI.someProtectedMethod();
} catch (error) {
  if (error.message.includes('authorized')) {
    yogaAPI.logout();
  }
}
```

---

## Advanced Topics

### Custom API Calls

If you need to make a custom API call:

```javascript
const response = await yogaAPI.request('/api/custom-endpoint', {
  method: 'POST',
  body: JSON.stringify({ data: 'value' })
});
```

### Async/Await vs Promises

Both work:

```javascript
// Async/await (recommended)
const response = await yogaAPI.getAllAsanas();

// Promises
yogaAPI.getAllAsanas()
  .then(response => {
    // Handle response
  })
  .catch(error => {
    // Handle error
  });
```

---

## Common Issues

### Issue: "yogaAPI is not defined"
**Solution:** Make sure `api.js` is loaded before your script:
```html
<script src="assets/js/api.js"></script>
<script src="your-script.js"></script>
```

### Issue: Login successful but user still sees login page
**Solution:** Check that you're redirecting after successful login:
```javascript
await yogaAPI.login(credentials);
window.location.href = '/dashboard.html';
```

### Issue: 401 Unauthorized errors
**Solution:** Make sure the user is logged in:
```javascript
if (!yogaAPI.isAuthenticated()) {
  window.location.href = '/login.html';
}
```

---

**Questions?** Check the full API documentation at `/api-docs` or review the example pages in the project.

**Last Updated:** March 3, 2026