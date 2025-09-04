-- Create databases
CREATE DATABASE ecommerce_dev;
CREATE DATABASE ecommerce_test;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better performance
-- These will be created by Prisma migrations, but we can add custom ones here

-- Full-text search indexes
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_search 
-- ON products USING gin(to_tsvector('english', name || ' ' || description));

-- Partial indexes for active records
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_active 
-- ON products (id) WHERE "isActive" = true;

-- Composite indexes for common queries
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_status_date 
-- ON orders (status, "createdAt" DESC);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_category_active 
-- ON products ("categoryId", "isActive") WHERE "isActive" = true;