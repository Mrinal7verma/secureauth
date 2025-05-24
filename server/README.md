# Authentication System API

A complete RESTful API for user authentication and management built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**

  - Registration with email verification
  - Login with JWT tokens
  - Password reset via email

- **User Management**

  - User profile management
  - Admin-only user operations
  - Role-based access control

- **Security**
  - Password hashing with bcrypt
  - JWT token authentication
  - Password history tracking
  - Password strength validation
  - Protection against common security vulnerabilities

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email services

## Project Structure

```
server/
│
├── controllers/      # Request handlers
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
│
├── middleware/       # Express middleware
│   ├── authMiddleware.js    # Authentication middleware
│   └── errorHandler.js      # Error handling middleware
│
├── models/           # Database models
│   └── User.js              # User schema and model
│
├── routes/           # API routes
│   ├── authRoutes.js        # Authentication routes
│   └── userRoutes.js        # User management routes
│
├── utils/            # Utility functions
│   ├── database.js          # Database connection
│   ├── email.js             # Email functionality
│   ├── jwt.js               # JWT utilities
│   └── validation.js        # Input validation functions
│
├── .env              # Environment variables (not in git)
├── .env.example      # Example environment variables
├── package.json      # Project dependencies
└── server.js         # Application entry point
```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and get token
- **POST /api/auth/forgot-password** - Request password reset
- **POST /api/auth/reset-password** - Reset password with token

### User Management

- **GET /api/users** - Get all users (authenticated)
- **GET /api/users/profile** - Get current user profile (authenticated)
- **PUT /api/users/:id** - Update user (admin only)
- **DELETE /api/users/:id** - Delete user (admin only)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd MERN/server
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Configure environment variables

   ```
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration.

4. Start the development server

   ```
   npm run dev
   ```

5. For production
   ```
   npm start
   ```

## Environment Variables

| Variable       | Description            | Example                               |
| -------------- | ---------------------- | ------------------------------------- |
| PORT           | Server port number     | 5000                                  |
| NODE_ENV       | Environment mode       | development                           |
| MONGO_URI      | MongoDB connection URL | mongodb://localhost:27017/auth_system |
| JWT_SECRET     | Secret key for JWT     | your_secret_key                       |
| JWT_EXPIRES_IN | JWT expiration time    | 7d                                    |
| CLIENT_URL     | Frontend client URL    | http://localhost:3000                 |
| EMAIL_HOST     | SMTP host for email    | smtp.example.com                      |
| EMAIL_PORT     | SMTP port              | 587                                   |
| EMAIL_USER     | Email username         | your_email@example.com                |
| EMAIL_PASS     | Email password         | your_password                         |
| EMAIL_FROM     | Sender email address   | support@yourapp.com                   |

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Password history tracking prevents password reuse
- Email verification for account operations
- Role-based access control for admin functions
- Input validation on all endpoints

## Error Handling

The API uses a centralized error handling mechanism with appropriate HTTP status codes and descriptive messages.
