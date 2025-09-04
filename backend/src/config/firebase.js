const admin = require('firebase-admin');

// Initialize Firebase Admin SDK only if credentials are provided
let auth = null;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  auth = admin.auth();
} else {
  console.log('⚠️  Firebase credentials not configured. Firebase features will be disabled.');
}

module.exports = { admin, auth };