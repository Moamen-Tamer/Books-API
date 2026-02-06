# 📚 Books API - TypeScript REST API

A RESTful API built with Express.js and TypeScript for managing a book collection with role-based authentication and authorization.

## 🚀 Features

- **JWT Authentication** - Secure login/logout with access and refresh tokens
- **Role-Based Authorization** - Different permissions for clients and employees
- **Input Validation** - Using express-validator for data sanitization
- **Rate Limiting** - Protection against brute force attacks
- **Error Handling** - Centralized error handling middleware
- **Type Safety** - Full TypeScript implementation with strict mode

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** express-validator
- **Security:** helmet, express-rate-limit
- **Development:** nodemon, ts-node-dev

## 📁 Project Structure

```
src/
├── server.ts                 # App entry point
├── types.ts                  # TypeScript interfaces
├── routes/
│   ├── auth.ts               # Authentication routes
│   └── books.ts              # Books CRUD routes
├── controllers/
│   ├── authControllers.ts    # Auth logic
│   └── booksController.ts    # Books logic
├── middlewares/
│   ├── authentication.ts     # JWT verification
│   ├── authorization.ts      # Role checking
│   ├── error.ts              # Error handler
│   ├── logger.ts             # Request logger
│   ├── notFound.ts           # 404 handler
│   └── rateLimiters.ts       # Rate limiting
└── database/
    └── db.ts                 # In-memory data store
```

## 🔐 Authentication Flow

1. **Register** - Create new client account
2. **Login** - Receive JWT access token (15min) and refresh token (1h)
3. **Access Protected Routes** - Use access token in cookies
4. **Refresh Token** - Get new access token when expired
5. **Logout** - Clear tokens and invalidate refresh token

### User Roles

- **Clients** (any email domain) - Can view books
- **Employees** (`@company.com`) - Can view and manage books (CRUD operations)

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register     # Register new client
POST   /api/auth/login        # Login user
POST   /api/auth/logout       # Logout user
GET    /api/auth/me           # Get current user
POST   /api/auth/refresh      # Refresh access token
```

### Books (Protected Routes)
```
GET    /api/books             # Get all books (authenticated)
GET    /api/books/:id         # Get book by ID (authenticated)
POST   /api/books             # Create book (employees only)
PUT    /api/books/:id         # Update book (employees only)
PATCH  /api/books/:id         # Partial update (employees only)
DELETE /api/books/:id         # Delete book (employees only)
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## 📝 Example Usage

### Register a new client
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "john_doe",
  "gender": "male",
  "age": 25,
  "email": "john@gmail.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@gmail.com",
  "password": "password123"
}
```

### Login as employee (to create/edit books)
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "mohamed.adel@company.com",  # ← Must be @company.com for admin access
  "password": "password123"
}
```

### Get all books (requires authentication)
```bash
GET /api/books
Cookie: accessToken=<your-jwt-token>
```

### Create a book (requires employee role)
```bash
POST /api/books
Cookie: accessToken=<employee-jwt-token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
```

## 🔒 Security Features

- **Helmet** - Sets secure HTTP headers
- **Rate Limiting** - 100 requests/15min general, 15 requests/5min for auth
- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - HttpOnly cookies with expiration
- **Input Validation** - Sanitization and validation of all inputs
- **Role-Based Access Control** - Email domain-based authorization

## ⚠️ Note
```
This is a **learning project** using in-memory data storage (arrays).
```

## 📚 What I Learned

- Building RESTful APIs with TypeScript
- JWT authentication and refresh token flow
- Role-based authorization patterns
- Express middleware architecture
- Input validation and sanitization
- Security best practices for Node.js APIs
- Error handling patterns
- Rate limiting strategies

## 📄 License

MIT

## 👤 Author

**Your Name**
- LinkedIn: [Mo'men Tamer](https://www.linkedin.com/in/mo-men-tamer-2005mt)
- GitHub: [Moamen-Tamer](https://github.com/Moamen-Tamer)
