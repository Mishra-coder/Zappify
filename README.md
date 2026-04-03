# Zappify Shoes

## About The Project

**Zappify Shoes** is an online shoe store built to sell just *one* premium pair of shoes. Instead of a messy website with hundreds of products, Zappify gives the user a super clean and focused shopping experience for that single product.

### Simple Breakdown of What It Does:
- **Beautiful Design (Frontend):** It shows off the shoe with smooth animations and a modern look so customers get a high-quality, premium feel while browsing.
- **User Accounts:** Anyone can easily and safely create an account, log in, and keep their personal details secure.
- **Buying Process:** It carefully handles the entire process of adding the shoe to the cart, collecting shipping details, and placing an order.
- **Powerful Engine (Backend):** Behind the scenes, it uses a real database to safely store user data and orders. It's built on popular, modern technologies (React for what you see, Node.js and MongoDB for what happens behind the scenes).

In simple words, Zappify is a complete, real-world example of an e-commerce website designed to look great and work perfectly from start to checkout.

## Key Features

- **Storefront UI**: Beautiful, interactive React frontend built with Vite and Framer Motion.
- **Authentication**: Secure user login & registration with JWT (JSON Web Tokens).
- **Product Management**: Clean API for managing premium shoe listings.
- **Order System**: Seamless order processing and shipping details.
- **Database**: Robust MongoDB integration using Mongoose.
- **Infrastructure**: Ready for production with Docker and GitHub Actions (CI/CD).

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling/Animations**: CSS, Framer Motion, Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Security**: JWT, Bcrypt.js, Helmet, CORS
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## Getting Started

### 1. Backend Setup
Navigate to the `backend/` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file from the provided `.env.example` and add your configuration:
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run the backend locally:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the `frontend/` folder and install dependencies:
```bash
cd frontend
npm install
```

Run the frontend locally:
```bash
npm run dev
```

## Docker Deployment (Backend)

To build and run the backend using Docker:
```bash
cd backend
docker build -t zappify-backend .
docker run -p 5001:5001 zappify-backend
```

## Repository Structure
```text
Zappify/
├── .github/workflows/   # CI/CD Pipeline
├── backend/             # Core Backend Logic
│   ├── config/          # Database configuration
│   ├── controllers/     # Route logic
│   ├── models/          # Database schemas (Mongoose)
│   ├── routes/          # API endpoints
│   └── server.js        # Main entry point
└── frontend/            # React Frontend Application
    ├── public/          # Static assets
    ├── src/             # Frontend source code
    │   ├── components/  # React components
    │   ├── App.jsx      # Main App component
    │   └── index.css    # Global styles
    └── vite.config.js   # Vite configuration
```

---
Built for Zappify shoes.
