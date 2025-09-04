# Firebase Authentication Setup Guide

## 🔥 **Step 1: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `e-commerce-platform`
4. Enable Google Analytics (optional)
5. Click "Create project"

## 🔥 **Step 2: Enable Authentication**

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click "Email/Password" → Enable → Save
   - **Google**: Click "Google" → Enable → Add project support email → Save

## 🔥 **Step 3: Get Firebase Configuration**

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" icon (`</>`)
4. Register app name: `e-commerce-frontend`
5. Copy the Firebase configuration object

## 🔥 **Step 4: Set Up Environment Variables**

### Frontend Environment Variables

Create `frontend/.env.local` with your Firebase config:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Backend Environment Variables

Create `backend/.env` with Firebase Admin SDK:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
```

## 🔥 **Step 5: Generate Service Account Key**

1. In Firebase Console, go to Project Settings
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Extract the following values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

## 🔥 **Step 6: Configure Authorized Domains**

1. In Firebase Console, go to Authentication
2. Go to "Settings" tab
3. Add authorized domains:
   - `localhost` (for development)
   - Your production domain (when deploying)

## 🔥 **Step 7: Test the Setup**

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Visit `http://localhost:3002/auth/register`
4. Try creating an account with email/password
5. Try signing in with Google

## 🔥 **Step 8: Verify Backend Integration**

Test the Firebase token verification:

```bash
# Get a token from the frontend (check browser dev tools)
curl -X POST http://localhost:3000/api/firebase-auth/verify \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json"
```

## 🔥 **Troubleshooting**

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This is normal in development with hot reloading
   - The app handles this gracefully

2. **"Invalid API key"**
   - Check your environment variables
   - Make sure `NEXT_PUBLIC_` prefix is used for frontend

3. **"Google sign-in not working"**
   - Check Google OAuth configuration in Firebase Console
   - Verify authorized domains include `localhost`

4. **"Token verification failed"**
   - Check Firebase Admin SDK configuration
   - Verify service account key is correct

## 🔥 **Production Deployment**

When deploying to production:

1. Update authorized domains in Firebase Console
2. Set production environment variables
3. Use Firebase Hosting (optional) for frontend
4. Update CORS settings in backend

## 🔥 **Security Best Practices**

1. **Never commit `.env` files** to version control
2. **Use environment-specific Firebase projects** (dev, staging, prod)
3. **Enable App Check** for additional security
4. **Set up Firebase Security Rules** for Firestore (if using)
5. **Monitor authentication logs** in Firebase Console

## 🔥 **Next Steps**

After Firebase Auth is working:

1. Set up user profiles in your database
2. Implement role-based access control
3. Add password reset functionality
4. Set up email verification
5. Implement user management features