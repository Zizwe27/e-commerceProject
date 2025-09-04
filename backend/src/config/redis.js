const Redis = require('ioredis');

// Redis configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: process.env.REDIS_DB || 0,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
  connectTimeout: 10000,
  commandTimeout: 5000,
};

// Create Redis client
const redis = new Redis(redisConfig);

// Handle Redis connection events
redis.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

redis.on('close', () => {
  console.log('🔌 Redis connection closed');
});

// Redis utility functions
const redisUtils = {
  // Cache with TTL
  async set(key, value, ttl = 3600) {
    try {
      const serializedValue = JSON.stringify(value);
      await redis.setex(key, ttl, serializedValue);
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      return false;
    }
  },

  // Get from cache
  async get(key) {
    try {
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  },

  // Delete from cache
  async del(key) {
    try {
      await redis.del(key);
      return true;
    } catch (error) {
      console.error('Redis delete error:', error);
      return false;
    }
  },

  // Check if key exists
  async exists(key) {
    try {
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis exists error:', error);
      return false;
    }
  },

  // Set multiple keys
  async mset(keyValuePairs) {
    try {
      const serializedPairs = {};
      for (const [key, value] of Object.entries(keyValuePairs)) {
        serializedPairs[key] = JSON.stringify(value);
      }
      await redis.mset(serializedPairs);
      return true;
    } catch (error) {
      console.error('Redis mset error:', error);
      return false;
    }
  },

  // Get multiple keys
  async mget(keys) {
    try {
      const values = await redis.mget(keys);
      return values.map(value => value ? JSON.parse(value) : null);
    } catch (error) {
      console.error('Redis mget error:', error);
      return [];
    }
  },

  // Increment counter
  async incr(key) {
    try {
      return await redis.incr(key);
    } catch (error) {
      console.error('Redis incr error:', error);
      return 0;
    }
  },

  // Set expiration
  async expire(key, seconds) {
    try {
      await redis.expire(key, seconds);
      return true;
    } catch (error) {
      console.error('Redis expire error:', error);
      return false;
    }
  },

  // Get TTL
  async ttl(key) {
    try {
      return await redis.ttl(key);
    } catch (error) {
      console.error('Redis ttl error:', error);
      return -1;
    }
  },

  // Flush all (use with caution)
  async flushall() {
    try {
      await redis.flushall();
      return true;
    } catch (error) {
      console.error('Redis flushall error:', error);
      return false;
    }
  }
};

module.exports = {
  redis,
  redisUtils
};