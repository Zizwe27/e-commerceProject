const { auth } = require('../config/firebase');

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  try {
    if (!auth) {
      return res.status(503).json({
        success: false,
        error: 'Firebase authentication is not configured'
      });
    }

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided or invalid format'
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Add user info to request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      email_verified: decodedToken.email_verified
    };
    
    next();
  } catch (error) {
    console.error('Firebase token verification error:', error);
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

// Middleware to make authentication optional
const optionalFirebaseAuth = async (req, res, next) => {
  try {
    if (!auth) {
      // Firebase not configured, continue without auth
      return next();
    }

    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(idToken);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        email_verified: decodedToken.email_verified
      };
    }
    
    next();
  } catch (error) {
    // If token verification fails, continue without user info
    next();
  }
};

module.exports = {
  verifyFirebaseToken,
  optionalFirebaseAuth
};