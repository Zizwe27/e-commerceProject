#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🗄️ Setting up database...');

try {
  // Check if .env file exists
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file from template...');
    const envExamplePath = path.join(__dirname, '..', 'env.example');
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created. Please update the values as needed.');
    } else {
      console.log('❌ env.example file not found. Please create .env file manually.');
      process.exit(1);
    }
  }

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push database schema
  console.log('📊 Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  // Seed database
  console.log('🌱 Seeding database...');
  execSync('node prisma/seed.js', { stdio: 'inherit' });

  console.log('🎉 Database setup completed successfully!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Update .env file with your database credentials');
  console.log('2. Run: npm run dev');
  console.log('3. Visit: http://localhost:3000/health');

} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  process.exit(1);
}