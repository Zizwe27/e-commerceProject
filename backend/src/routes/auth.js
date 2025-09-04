const express = require('express');
const { body, validationResult } = require('express-validator');
const authService = require('../services/authService');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phone').optional().isMobilePhone(),
  body('role').optional().isIn(['CUSTOMER', 'ADMIN', 'MANAGER', 'STAFF'])
], validateRequest, async (req, res) => {
  try {
    const result = await authService.register(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
], validateRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
});

// Google OAuth callback
router.post('/google', [
  body('email').isEmail().normalizeEmail(),
  body('name').trim().isLength({ min: 2 }),
  body('googleId').notEmpty(),
  body('picture').optional().isURL()
], validateRequest, async (req, res) => {
  try {
    const result = await authService.googleAuth(req.body);
    
    res.json({
      success: true,
      message: 'Google authentication successful',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Refresh token
router.post('/refresh', [
  body('refreshToken').notEmpty().withMessage('Refresh token is required')
], validateRequest, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: tokens
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('phone').optional().isMobilePhone(),
  body('avatar').optional().isURL()
], validateRequest, async (req, res) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Change password
router.put('/password', authenticateToken, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], validateRequest, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user.id, currentPassword, newPassword);
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Verify token endpoint
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    data: {
      user: req.user
    }
  });
});

module.exports = router;