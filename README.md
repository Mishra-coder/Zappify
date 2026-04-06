# Zappify Shoes 👟

Zappify is a full-stack premium shoe e-commerce platform available on both **Web** and **Mobile (Android)**. It offers a seamless shopping experience — from browsing 44+ curated shoe collections to placing orders, tracking deliveries, and managing your account — all in one place.

Built with a modern MERN stack on the backend and React + React Native on the frontend, Zappify is designed for performance, clean UI, and real-world usability.

## Live Demo

- **Website:** [zappify-sepia.vercel.app](https://zappify-sepia.vercel.app)
- **Download APK:** [Zappify Android App](https://expo.dev/accounts/devendra.mi/projects/zappify/builds/24237286-1ff7-4219-ac7a-6c103ff28d00)

---

## Technology Stack

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![EAS Build](https://img.shields.io/badge/EAS_Build-4630EB?style=for-the-badge&logo=expo&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-FF6B35?style=for-the-badge&logo=react&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-6B52AE?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt.js-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Helmet](https://img.shields.io/badge/Helmet-FF6B35?style=for-the-badge&logo=helmet&logoColor=white)
![Morgan](https://img.shields.io/badge/Morgan-000000?style=for-the-badge&logo=npm&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

---

## Architecture Diagram

```
+-------------------------------------------------------------------+
|                                                                   |
|  +-------------+      +-------------+      +-------------+        |
|  |  Front-end  |      |  Back-end   |      |  Database   |        |
|  |   ReactJS   |<---->|   NodeJS    |<---->|  MongoDB    |        |
|  |UI Components|      |  ExpressJS  |      | Collections |        |
|  | API calls   |      |API endpoints|      |  Documents  |        |
|  +-------------+      +-------------+      +-------------+        |
|                                                                   |
+-------------------------------------------------------------------+
```

---

## Database Schema

```mermaid
erDiagram
Users ||--o{ Orders : places
Products ||--o{ Orders : included_in

Users {
  ObjectId _id PK
  String name
  String email UK
  String password
  Boolean isAdmin
  Date createdAt
  Date updatedAt
}

Products {
  ObjectId _id PK
  ObjectId user FK
  String name
  String image
  String brand
  String category
  String description
  Number price
  Number countInStock
  Date createdAt
  Date updatedAt
}

Orders {
  ObjectId _id PK
  ObjectId user FK
  Array orderItems
  Object shippingAddress
  String paymentMethod
  Object paymentResult
  Number taxPrice
  Number shippingPrice
  Number totalPrice
  Boolean isPaid
  Date paidAt
  Boolean isDelivered
  Date deliveredAt
  Date createdAt
  Date updatedAt
}
```

---

## Payment Testing

Razorpay is integrated in test mode. Use these credentials to test payments:

| Method | Details |
|---|---|
| Card | 5267 3181 8797 5449 / Expiry: 08/26 / CVV: 123 / OTP: 1234 |
| UPI | success@razorpay |

---

## What This Project Does

Zappify is built as a real-world e-commerce application that covers the complete shopping journey:

- A user lands on the site, browses 44+ premium shoe listings
- Filters by category, theme, or searches by name
- Views product details with size chart and adds to cart
- Logs in via email/password or Google OAuth
- Goes through a 3-step checkout (Bag → Address → Payment)
- Tracks their order with a live timeline
- Can cancel an order with a reason

---

## Main Features

### For Users
- Browse 44+ premium shoe listings
- Filter by category and theme
- Sort by price and new arrivals
- Search products by name, brand or category
- Product detail page with size selection and UK Size Chart
- Add to cart with size validation
- Wishlist toggle on product cards and detail page
- 3-step checkout - Bag to Address to Payment (COD / UPI / Card)
- Razorpay payment gateway integration (UPI, Card, Netbanking, Wallet)
- Payment signature verification on backend
- Order history with tracking timeline
- Order cancellation with reason selection form
- Google OAuth 2.0 login
- Normal email/password sign up and sign in
- User-specific order history per account
- Persistent login via localStorage
- Progressive Web App (PWA) ready

### For Admins
- Secure JWT-protected API routes
- Admin middleware for role-based access
- Create and manage product listings via REST API

---

## Getting Started

### What You Need
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Clone the repo
```bash
git clone https://github.com/Mishra-coder/Zappify.git
cd Zappify
```

2. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

```bash
npm run dev
```

3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

4. Mobile setup
```bash
cd mobile
npm install
npx expo start
```

App opens at http://localhost:5173

---

## Project Structure

```
Zappify/
├── .github/workflows/
├── frontend/
│   ├── public/shoes/
│   └── src/
│       ├── components/
│       ├── data/products.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── screens/
│   │   └── theme/
│   └── App.js
└── backend/
    ├── config/db.js
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── server.js
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/users | Register user | No |
| POST | /api/users/login | Login user | No |
| GET | /api/products | Get all products | No |
| GET | /api/products/:id | Get product by ID | No |
| POST | /api/products | Create product | Admin |
| POST | /api/payment/create-order | Create Razorpay order | No |
| POST | /api/payment/verify | Verify payment signature | No |

---

## Frontend Environment Variables

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## CI/CD & Testing

- GitHub Actions pipeline runs on every push and pull request
- Linting with ESLint on both frontend and backend
- Unit tests with Jest for email validation logic
- Integration tests with Jest + Supertest for API routes
- E2E tests with Cypress simulating real user flows (homepage, search, cart, login)
- Automated deployment to AWS EC2 via SSH on every push to main
- Dependabot configured for weekly dependency updates

Run backend tests:
```bash
cd backend
npm test
```

Run E2E tests:
```bash
cd frontend
npm run cy:open
```

---

## AWS EC2 Deployment

Backend is also deployed on AWS EC2 with PM2 process manager.

- EC2 instance: `13.218.101.177:5001`
- PM2 keeps the server alive and auto-restarts on crash
- GitHub Actions auto-deploys on every push to main

---

## Docker

```bash
docker build -t zappify-backend ./backend
docker run -p 5001:5001 zappify-backend
```

---

## Author

Devendra Mishra - [@Mishra-coder](https://github.com/Mishra-coder)

---

Built with love for Zappify Shoes
