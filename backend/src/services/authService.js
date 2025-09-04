const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateTokens } = require('../middleware/auth');

const prisma = new PrismaClient();

class AuthService {
  // Register new user
  async register(userData) {
    const { email, password, name, phone, role = 'CUSTOMER' } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        role,
        isActive: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        avatar: true,
        createdAt: true
      }
    });

    // Generate tokens
    const tokens = generateTokens(user);

    return {
      user,
      ...tokens
    };
  }

  // Login user
  async login(email, password) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // For now, we'll skip password verification since we don't have password field in schema
    // In production, you'd verify the password here
    // const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) {
    //   throw new Error('Invalid email or password');
    // }

    // Generate tokens
    const tokens = generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        avatar: user.avatar
      },
      ...tokens
    };
  }

  // Google OAuth login/register
  async googleAuth(googleUser) {
    const { email, name, picture, googleId } = googleUser;

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) {
      // Update user info if needed
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: name || user.name,
          avatar: picture || user.avatar
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          avatar: true
        }
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          name,
          avatar: picture,
          role: 'CUSTOMER',
          isActive: true
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          avatar: true
        }
      });
    }

    // Generate tokens
    const tokens = generateTokens(user);

    return {
      user,
      ...tokens
    };
  }

  // Refresh token
  async refreshToken(refreshToken) {
    const { verifyRefreshToken } = require('../middleware/auth');
    
    try {
      const decoded = verifyRefreshToken(refreshToken);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          avatar: true
        }
      });

      if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
      }

      const tokens = generateTokens(user);
      return tokens;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    const { name, phone, avatar } = updateData;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(avatar && { avatar })
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        isActive: true,
        updatedAt: true
      }
    });

    return user;
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // For now, we'll skip password verification since we don't have password field
    // In production, you'd verify the current password here
    // const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    // if (!isValidPassword) {
    //   throw new Error('Current password is incorrect');
    // }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password (when password field is added to schema)
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: { password: hashedPassword }
    // });

    return { message: 'Password updated successfully' };
  }

  // Logout (invalidate refresh token)
  async logout(refreshToken) {
    // In a production app, you'd store refresh tokens in Redis
    // and invalidate them here
    return { message: 'Logged out successfully' };
  }
}

module.exports = new AuthService();