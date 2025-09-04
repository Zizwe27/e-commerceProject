# 🛒 E-commerce Platform

A full-stack, enterprise-grade e-commerce platform built with modern technologies for scalability, performance, and maintainability.

## 🏗️ Architecture

This project is organized into three main components:

- **📊 Admin Dashboard** - Management interface for store owners
- **🛍️ Frontend** - Customer-facing e-commerce website  
- **⚡ Backend** - Scalable API server with database

## 📁 Project Structure

```
e-commerceProject/
├── 📁 admin/                    # Admin Dashboard (Next.js)
├── 📁 frontend/                 # Customer Frontend (Next.js)
├── 📁 backend/                  # API Server (Express.js)
├── 📁 shared/                   # Shared utilities & types
├── 📁 docker/                   # Docker configurations
└── 📁 docs/                     # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL (or use Docker)
- Redis (or use Docker)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerceProject
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development environment**
   ```bash
   # Using Docker (Recommended)
   npm run docker:dev
   
   # Or manually
   npm run dev
   ```

4. **Access the applications**
   - Admin Dashboard: http://localhost:3002
   - Customer Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 🛠️ Technology Stack

### Frontend (Admin & Customer)
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations
- **Recharts** - Data visualization

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Redis** - Caching & sessions
- **Prisma** - Database ORM
- **JWT** - Authentication
- **Zod** - Data validation

### Infrastructure
- **Docker** - Containerization
- **Nginx** - Load balancing & reverse proxy
- **AWS/DigitalOcean** - Cloud deployment

## 📋 Available Scripts

### Root Level
```bash
npm run dev              # Start all services in development
npm run build            # Build all services
npm run start            # Start all services in production
npm run install:all      # Install dependencies for all services
npm run docker:dev       # Start development with Docker
npm run docker:prod      # Start production with Docker
```

### Individual Services
```bash
# Admin Dashboard
npm run dev:admin        # Start admin dashboard
npm run build:admin      # Build admin dashboard

# Customer Frontend  
npm run dev:frontend     # Start customer frontend
npm run build:frontend   # Build customer frontend

# Backend API
npm run dev:backend      # Start backend API
npm run build:backend    # Build backend API
```

## 🗄️ Database Setup

### Using Docker (Recommended)
```bash
npm run docker:dev
```

### Manual Setup
```bash
# Start PostgreSQL and Redis
docker-compose -f docker/docker-compose.dev.yml up postgres redis

# Run database migrations
cd backend
npm run db:migrate

# Seed the database
npm run db:seed
```

## 🔐 Environment Variables

Create `.env` files in each service directory:

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce_dev"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-jwt-secret-key"
NODE_ENV="development"
PORT=3000
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3002"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## 🚀 Deployment

### Production with Docker
```bash
# Set environment variables
export POSTGRES_DB="ecommerce_prod"
export POSTGRES_USER="postgres"
export POSTGRES_PASSWORD="secure-password"
export JWT_SECRET="your-production-jwt-secret"

# Start production environment
npm run docker:prod
```

### Cloud Deployment
- **Vercel** - For frontend applications
- **AWS ECS** - For containerized backend
- **AWS RDS** - For managed PostgreSQL
- **AWS ElastiCache** - For managed Redis

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific service
npm run test:admin
npm run test:frontend
npm run test:backend

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

- [API Documentation](docs/api/)
- [Deployment Guide](docs/deployment/)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Built with ❤️ for scalable e-commerce solutions**