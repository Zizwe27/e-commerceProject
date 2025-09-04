# 🗄️ Database Setup Guide

This guide will help you set up the database infrastructure for the e-commerce platform.

## 📋 Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)
- Redis (or use Docker)

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

1. **Start the database services**
   ```bash
   # Start PostgreSQL and Redis
   docker-compose -f docker/docker-compose.dev.yml up postgres redis -d
   ```

2. **Set up the database**
   ```bash
   cd backend
   npm install
   npm run db:setup
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```

### Option 2: Manual Setup

1. **Install PostgreSQL and Redis locally**

2. **Create databases**
   ```sql
   CREATE DATABASE ecommerce_dev;
   CREATE DATABASE ecommerce_test;
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Install dependencies and set up database**
   ```bash
   npm install
   npm run db:setup
   ```

## 🏗️ Database Schema

### Core Entities

- **Users** - Customer and admin accounts
- **Products** - Product catalog with variants
- **Categories** - Product categorization
- **Orders** - Order management
- **Transactions** - Payment tracking
- **Inventory** - Stock management
- **Marketing** - Campaigns and banners

### Key Features

- **ACID Compliance** - Financial transaction safety
- **Full-text Search** - Product search capabilities
- **Audit Trails** - Complete change tracking
- **Soft Deletes** - Data preservation
- **Optimized Indexes** - Performance optimization

## 🔧 Database Commands

### Development
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Create and run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Reset database (WARNING: Deletes all data)
npm run db:reset
```

### Production
```bash
# Deploy migrations
npx prisma migrate deploy

# Generate production client
npx prisma generate
```

## 📊 Sample Data

The seed script creates:

- **3 Categories** - Electronics, Clothing, Home & Garden
- **3 Products** - MacBook Pro, T-Shirt, Garden Tools
- **1 Admin User** - admin@example.com
- **2 Sample Orders** - With different statuses
- **2 Transactions** - Payment records
- **2 Discount Campaigns** - Welcome and Free Shipping
- **2 Marketing Banners** - Hero and sidebar banners
- **Inventory Movements** - Stock tracking

## 🔐 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Role-based Access** - Admin, Manager, Staff, Customer
- **Input Validation** - Zod schema validation
- **SQL Injection Protection** - Prisma ORM
- **Rate Limiting** - API protection

## 📈 Performance Optimization

### Indexes
- Primary keys on all tables
- Foreign key indexes
- Composite indexes for common queries
- Partial indexes for active records
- Full-text search indexes

### Caching Strategy
- **Redis** for session storage
- **Query result caching** for expensive operations
- **CDN** for static assets
- **Database connection pooling**

## 🔍 Monitoring & Maintenance

### Health Checks
- Database connection status
- Redis connectivity
- API endpoint health
- Performance metrics

### Backup Strategy
- **Daily automated backups**
- **Point-in-time recovery**
- **Cross-region replication**
- **Encrypted backups**

## 🚨 Troubleshooting

### Common Issues

1. **Connection Refused**
   ```bash
   # Check if PostgreSQL is running
   docker ps | grep postgres
   
   # Check connection string
   echo $DATABASE_URL
   ```

2. **Migration Errors**
   ```bash
   # Reset and re-run migrations
   npm run db:reset
   npm run db:setup
   ```

3. **Prisma Client Issues**
   ```bash
   # Regenerate client
   npm run db:generate
   ```

### Logs
```bash
# View database logs
docker logs ecommerce-postgres-dev

# View Redis logs
docker logs ecommerce-redis-dev

# View backend logs
npm run dev
```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Database Design Best Practices](https://www.postgresql.org/docs/current/ddl.html)

## 🆘 Support

If you encounter issues:

1. Check the logs for error messages
2. Verify environment variables
3. Ensure all services are running
4. Check database connectivity
5. Create an issue in the repository

---

**Happy coding! 🚀**