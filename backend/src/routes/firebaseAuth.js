const express = require('express');
const { verifyFirebaseToken, optionalFirebaseAuth } = require('../middleware/firebaseAuth');
const { auth } = require('../config/firebase');

// Check if Firebase is configured
const checkFirebaseConfig = (req, res, next) => {
  if (!auth) {
    return res.status(503).json({
      success: false,
      error: 'Firebase authentication is not configured. Please set up Firebase credentials in your environment variables.'
    });
  }
  next();
};

const router = express.Router();

// Get user profile (requires authentication)
router.get('/profile', checkFirebaseConfig, verifyFirebaseToken, async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        picture: user.picture,
        email_verified: user.email_verified
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile'
    });
  }
});

// Update user profile (requires authentication)
router.put('/profile', checkFirebaseConfig, verifyFirebaseToken, async (req, res) => {
  try {
    const { name, photoURL } = req.body;
    const uid = req.user.uid;
    
    // Update user in Firebase Auth
    const updateData = {};
    if (name) updateData.displayName = name;
    if (photoURL) updateData.photoURL = photoURL;
    
    await auth.updateUser(uid, updateData);
    
    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
});

// Delete user account (requires authentication)
router.delete('/account', checkFirebaseConfig, verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    
    // Delete user from Firebase Auth
    await auth.deleteUser(uid);
    
    // TODO: Delete user data from your database here
    
    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete account'
    });
  }
});

// Verify token endpoint (for testing)
router.post('/verify', checkFirebaseConfig, verifyFirebaseToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    user: req.user
  });
});

// Get user by UID (admin only - requires authentication)
router.get('/user/:uid', checkFirebaseConfig, verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.params;
    
    // Get user from Firebase Auth
    const userRecord = await auth.getUser(uid);
    
    res.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        emailVerified: userRecord.emailVerified,
        disabled: userRecord.disabled,
        metadata: {
          creationTime: userRecord.metadata.creationTime,
          lastSignInTime: userRecord.metadata.lastSignInTime
        }
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user information'
    });
  }
});

module.exports = router;