# Zappify shoes

A high-end, single-product focused backend for the modern shoe enthusiast. Designed for performance, security, and scalability.

## Key Features

- **Authentication**: Secure user login & registration with JWT (JSON Web Tokens).
- **Product Management**: Clean API for managing premium shoe listings.
- **Order System**: Seamless order processing and shipping details.
- **Database**: Robust MongoDB integration using Mongoose.
- **Infrastructure**: Ready for production with Docker and GitHub Actions (CI/CD).

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Security**: JWT & Bcrypt.js
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## Getting Started

### 1. Installation
Inside the backend/ folder:
```bash
cd backend
npm install
```

### 2. Configuration
Create a .env file from the provided .env.example and add your database URI:
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 3. Run Locally
```bash
npm run dev
```

## Docker Deployment

To build and run the backend using Docker:
```bash
docker build -t zappify-backend ./backend
docker run -p 5001:5001 zappify-backend
```

## Repository Structure
```text
Zappify/
├── .github/workflows/   # CI/CD Pipeline
└── backend/             # Core Backend Logic
    ├── config/          # Database configuration
    ├── controllers/     # Route logic
    ├── models/          # Database schemas (Mongoose)
    ├── routes/          # API endpoints
    └── server.js        # Main entry point
```

---
Built for Zappify shoes.
