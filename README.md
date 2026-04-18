# Zappify Shoes 👟

<p align="center">
  <img src="assets/zappify_mockup.png" alt="Zappify Mockup" width="800">
</p>

Zappify is a full-stack premium shoe e-commerce platform available on both **Web** and **Mobile (Android)**. It offers a seamless shopping experience — from browsing curated shoe collections to placing orders and managing your account.

Built with a clean MERN stack on the backend and React + React Native on the frontend, Zappify is designed for performance, clean UI, and real-world usability.

## Live Demo

- **Website:** [zappify-sepia.vercel.app](https://zappify-sepia.vercel.app)
- **Download APK:** [Zappify Android App](https://expo.dev/accounts/devendra.mi/projects/zappify/builds/29e30585-c692-470b-b195-fd7af1822eb2)
- **Preview App:** [Preview App](https://drive.google.com/file/d/1IDo1ueM5tcDFiFk4r-4q5vFa-vUeZcyl/view)

---

## Architecture Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐        │
│  │             │      │             │      │             │        │
│  │  Front-end  │      │  Back-end   │      │  Database   │        │
│  │             │      │             │      │             │        │
│  │   ReactJS   │◄────►│   NodeJS    │◄────►│  MongoDB    │        │
│  │             │      │             │      │             │        │
│  │UI Components│      │  ExpressJS  │      │ Collections │        │
│  │             │      │             │      │             │        │
│  │ API calls   │      │API endpoints│      │  Documents  │        │
│  │             │      │             │      │             │        │
│  └─────────────┘      └─────────────┘      └─────────────┘        │
│                                                                   │
│  ┌─────────────┐                                                  │
│  │             │                                                  │
│  │   Mobile    │                                                  │
│  │             │                                                  │
│  │React Native │◄────────────────┐                                │
│  │             │                 │                                │
│  │   Expo      │                 │                                │
│  │             │                 │                                │
│  └─────────────┘                 │                                │
│                                  │                                │
└──────────────────────────────────┼────────────────────────────────┘
                                   │
                            Same Backend API
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
  DateTime createdAt
  DateTime updatedAt
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
  DateTime createdAt
  DateTime updatedAt
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
  DateTime createdAt
  DateTime updatedAt
}
```

---

## What This Project Does

This is a full-featured e-commerce platform where users can browse premium shoes, add them to cart or wishlist, and complete purchases with integrated payment gateway. The platform is available on both web and mobile (Android) with a unified backend API.

---

## Main Features

### For Customers (Web & Mobile)
- Create account with email/password or Google OAuth
- Browse 44+ premium shoe products
- Search and filter by brand, category, and price
- Add products to shopping cart
- Save favorite products to wishlist
- Multi-step checkout process (Cart → Address → Payment)
- Razorpay payment integration (Test mode)
- View order history and status
- Manage user profile
- Responsive design for all devices

### For Admins
- Manage product inventory
- View and process orders
- Update order status
- Monitor sales and analytics
- User management

---

## Technology Stack

### Frontend (Web)
- React 19 with Vite
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons
- Context API for state management
- Axios for API calls

### Frontend (Mobile)
- React Native with Expo
- React Navigation for routing
- Context API for state management
- Expo Vector Icons
- AsyncStorage for local data

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Razorpay for payments
- Helmet for security
- Morgan for logging
- CORS for cross-origin requests

### DevOps
- GitHub Actions for CI/CD
- ESLint for code quality
- Vercel for deployment
- Expo EAS for mobile builds
- OTA updates for mobile app

---

## Development

### Backend Development

```bash
cd backend
npm install
npm run dev
```

Server runs on http://localhost:5000

**Environment Variables (.env):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

App runs on http://localhost:5173

**Environment Variables (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Mobile Development

```bash
cd mobile
npm install
npx expo start
```

Scan QR code with Expo Go app

**Environment Variables:**
- Configured in `app.json`
- API URL points to backend server

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Mobile APK:**
```bash
cd mobile
npx eas build --platform android --profile production
```

**OTA Update (Mobile):**
```bash
cd mobile
npx eas update --branch production --message "Update description"
```

---

## Project Structure

```
Zappify/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── frontend/                   # React Web Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── data/               # Static product data
│   │   └── App.jsx             # Main app component
│   ├── public/                 # Static assets
│   └── package.json
├── backend/                    # Node.js/Express API
│   ├── config/                 # Database configuration
│   ├── controllers/            # Request handlers
│   ├── middlewares/            # Auth and validation
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   ├── utils/                  # Helper functions
│   └── server.js               # Entry point
└── mobile/                     # React Native Mobile App
    ├── src/
    │   ├── components/         # Mobile UI components
    │   ├── screens/            # App screens
    │   ├── context/            # State management
    │   └── data/               # Product data
    └── App.js                  # Main app component
```

---

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/google` - Google OAuth login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/user/:userId` - Get user's orders

### Payments
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

---

## Technology Stack

### Frontend (Web)
- **React 19** - Modern UI library with functional components
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Frontend (Mobile)
- **React Native** - Cross-platform mobile development
- **Expo** - Development and build platform
- **React Navigation** - Mobile navigation

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Razorpay** - Payment gateway integration

### DevOps
- **GitHub Actions** - CI/CD pipeline for automated linting
- **Vercel** - Frontend and backend deployment
- **ESLint** - Code quality and consistency

---

## System Architecture

The application follows a three-tier architecture:

1. **Frontend Layer** - React web app and React Native mobile app
2. **Backend Layer** - Express.js REST API server
3. **Database Layer** - MongoDB for data persistence

**Data Flow:**
```
User → Frontend (React/React Native) → API Calls → Backend (Express) → Database (MongoDB)
```

---

## Database Models

### User Model
- Stores user credentials (email, hashed password)
- Supports both email/password and Google OAuth login
- Tracks user role (admin/customer)

### Product Model
- Contains shoe details (name, brand, price, image, stock)
- Categorized by type (Running, Casual, Sports, etc.)
- Linked to user who created it

### Order Model
- Stores order details and items
- Tracks shipping address and payment info
- Maintains order status (paid, delivered)

---

## Key Features

### User Features
- **Product Browsing:** View 44+ premium shoe listings with images and details
- **Search & Filter:** Find shoes by brand, category, and price range
- **Shopping Cart:** Add/remove items, update quantities
- **Wishlist:** Save favorite products for later
- **User Authentication:** 
  - Email/Password registration and login
  - Google OAuth 2.0 integration
- **Checkout Process:** 
  - Multi-step checkout (Cart → Address → Payment)
  - Razorpay payment integration (Test mode)
- **Order Management:** View order history and status

### Technical Features
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile
- **RESTful API:** Clean API endpoints for all operations
- **JWT Authentication:** Secure token-based auth
- **Password Security:** Bcrypt hashing for user passwords
- **Code Quality:** ESLint for consistent code style
- **CI/CD Pipeline:** Automated linting on every push/PR via GitHub Actions

---

## CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration:

**Workflow Triggers:**
- On push to `main` branch
- On pull requests to `main` branch

**Pipeline Steps:**
1. **Install Dependencies** - Installs npm packages for frontend and backend
2. **Run Linter** - Checks code quality using ESLint

This ensures code quality is maintained before merging any changes.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mishra-coder/Zappify.git
cd Zappify
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start the backend server:
```bash
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend:
```bash
npm run dev
```

4. **Mobile Setup**
```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go app on your Android device.

---

## Project Structure

```
Zappify/
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI pipeline
├── frontend/                # React Web Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── data/            # Static product data
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js/Express API
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Auth and validation middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── utils/               # Helper functions
│   └── server.js            # Entry point
└── mobile/                  # React Native Mobile App
    ├── src/
    │   ├── components/      # Mobile UI components
    │   ├── screens/         # App screens
    │   ├── context/         # State management
    │   └── data/            # Product data
    └── App.js               # Main app component
```

---

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/google` - Google OAuth login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/user/:userId` - Get user's orders

---

## Design Decisions

### Why MERN Stack?
- **MongoDB:** Flexible schema for product variations
- **Express:** Lightweight and fast API development
- **React:** Component reusability across web and mobile
- **Node.js:** JavaScript everywhere, easy to maintain

### Why React Native?
- Code sharing between web and mobile
- Faster development with Expo
- Native performance with JavaScript

### Why Vite?
- Lightning-fast HMR (Hot Module Replacement)
- Optimized production builds
- Better developer experience than CRA

### Authentication Strategy
- JWT for stateless authentication
- Google OAuth for better user experience
- Bcrypt for secure password storage

---

## Challenges Faced

1. **State Management Across Platforms**
   - Solution: Used React Context API for simple, shared state management

2. **Payment Integration**
   - Solution: Integrated Razorpay with proper error handling and test mode

3. **Image Optimization**
   - Solution: Compressed images and used lazy loading for better performance

4. **Mobile Responsiveness**
   - Solution: Used Flexbox and responsive units for consistent UI

5. **API Security**
   - Solution: Implemented JWT middleware and input validation

---

## Future Enhancements

- Add product reviews and ratings
- Implement real-time order tracking
- Add admin dashboard for inventory management
- Integrate more payment gateways
- Add push notifications for mobile app
- Implement advanced search with filters

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is open source and available under the MIT License.

---

## Author

**Devendra Mishra**
- GitHub: [@Mishra-coder](https://github.com/Mishra-coder)
- Project Link: [https://github.com/Mishra-coder/Zappify](https://github.com/Mishra-coder/Zappify)

---

<p align="center">Built with ❤️ for Zappify Shoes</p>
