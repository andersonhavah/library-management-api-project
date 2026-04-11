# Library Management API

A comprehensive RESTful API for managing a digital library system, built with Node.js, Express, and MongoDB. This application provides full CRUD operations for books and authors, alongside robust user authentication and authorization features.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Books Endpoints](#books-endpoints)
  - [Authors Endpoints](#authors-endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Security Features](#security-features)
- [Development](#development)
- [License](#license)

## Overview

The Library Management API is a full-featured backend service designed to manage library operations efficiently. It enables users to browse books and authors, while authenticated users can contribute to the library by adding new books and authors. Administrators have elevated privileges for content management and moderation.

**Deployment:** https://library-management-api-project.onrender.com/

## ✨ Features

### Core Functionality
- **Book Management**: Create, read, update, and delete books with comprehensive metadata
- **Author Management**: Maintain author information with validation
- **User Authentication**: Secure registration and login with support for multiple authentication methods
- **Role-Based Access Control**: Distinguish between regular users and administrators
- **Input Validation**: Comprehensive server-side validation for all endpoints
- **API Documentation**: Interactive Swagger UI for exploring and testing endpoints

### Authentication & Security
- **Local Authentication**: Email and password-based registration and login
- **OAuth 2.0**: Google OAuth integration for seamless third-party authentication
- **Session Management**: Server-side session storage with secure cookies
- **Password Security**: Industry-standard bcrypt hashing with salt rounds
- **CORS Protection**: Configured cross-origin request handling
- **Authorization Middleware**: Protected endpoints requiring authentication

### Data Management
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Data Validation**: Schema-level and middleware validation
- **Timestamps**: Automatic tracking of creation and modification times
- **References**: Proper relationship management between books and authors

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js with CommonJS
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.5
- **Authentication**: 
  - Passport.js 0.7.0
  - passport-local 1.0.0
  - passport-google-oauth20 2.0.0
  - JWT (jsonwebtoken 9.0.3)
- **Security**: bcrypt 6.0.0
- **API Documentation**: Swagger (swagger-jsdoc, swagger-ui-express, swagger-autogen)
- **Utilities**:
  - CORS 2.8.6
  - Express Session 1.19.0
  - Express Validator 7.3.1
  - Cookie Parser 1.4.7
  - dotenv 17.2.3

### Development
- **Process Manager**: Nodemon 3.1.11
- **Module Format**: CommonJS

## System Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│      HTTP/REST API (Express)        │
│  ┌─────────────────────────────────┐│
│  │  Routes (Auth, Books, Authors) ││
│  └──────────────┬──────────────────┘│
│                 │                    │
│  ┌──────────────▼──────────────────┐│
│  │ Middleware (Auth, Validation)  ││
│  └──────────────┬──────────────────┘│
│                 │                    │
│  ┌──────────────▼──────────────────┐│
│  │  Controllers (Business Logic)  ││
│  └──────────────┬──────────────────┘│
└─────────────────┼───────────────────┘
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
  ┌─────────┐          ┌─────────────┐
  │ Models  │          │  Passport   │
  │(Mongo)  │          │   Config    │
  └─────────┘          └─────────────┘
       │                     │
       └──────────────┬──────┘
                      ▼
              ┌──────────────┐
              │  MongoDB     │
              │  Database    │
              └──────────────┘
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local instance or MongoDB Atlas cloud account)
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

1. **Create a `.env` file** in the root directory with the following variables:

   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=3000

   # Database Configuration
   MONGODB_URL=your_mongodb_url_here

   # Authentication & Security
   SESSION_SECRET=your_session_secret_key_here
   JWT_SECRET=your_jwt_secret_key_here

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Obtain Google OAuth Credentials** (optional for local development):
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new OAuth 2.0 credential for a Web application
   - Add authorized redirect URIs
   - Copy Client ID and Client Secret to `.env`

### Running the Application

#### Development Mode (with hot reloading)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

### Accessing the API

- **API Root**: `http://localhost:3000`
- **API Documentation**: `http://localhost:3000/api-docs`
- **Swagger UI**: Interactive interface for testing all endpoints

## API Documentation

### Interactive Documentation

The API includes comprehensive Swagger documentation accessible at `/api-docs`. The Swagger UI provides:
- Complete endpoint specifications
- Request/response schemas
- Authorization requirements
- Try-it-out features for testing
- Code generation tools

Visit `http://localhost:3000/api-docs` after starting the server.

## Project Structure

```
library-management-project/
├── config/                      # Configuration files
│   ├── database.js             # MongoDB connection setup
│   ├── passport.js             # Passport authentication strategies
│   └── swagger.js              # Swagger documentation configuration
├── controllers/                 # Business logic controllers
│   ├── authController.js       # Authentication operations
│   ├── authorController.js     # Author CRUD operations
│   └── bookController.js       # Book CRUD operations
├── middleware/                  # Express middleware
│   ├── auth.js                 # Authentication & authorization
│   ├── authValidation.js       # Auth endpoint validation
│   ├── authorValidation.js     # Author endpoint validation
│   └── bookValidation.js       # Book endpoint validation
├── models/                      # MongoDB Mongoose schemas
│   ├── User.js                 # User schema & authentication logic
│   ├── Author.js               # Author schema
│   └── Book.js                 # Book schema
├── routes/                      # API route definitions
│   ├── authRoutes.js           # Authentication endpoints
│   ├── authorRoutes.js         # Author management endpoints
│   └── bookRoutes.js           # Book management endpoints
├── .env                        # Environment variables (not in repo)
├── .gitignore                  # Git ignore file
├── package.json                # Project metadata & dependencies
├── server.js                   # Application entry point
└── README.md                   # This file
```

## Authentication

### Authentication Methods

#### 1. Local Authentication
Users can register and login using email and password credentials.

**Registration Flow:**
- User provides email, password, first name, and last name
- Password is hashed using bcrypt before storage
- User is created with 'user' role

**Login Flow:**
- User credentials are validated against stored hash
- Session is created upon successful authentication
- Session cookie is returned to client

#### 2. Google OAuth 2.0
Social authentication for seamless user experience without password management.

**OAuth Flow:**
- User initiates Google login
- Redirected to Google authentication
- User approves scope permissions
- Returned to application with authentication token
- User profile is created or authenticated

### Session Management
- Server-side sessions stored in memory (production should use session store)
- Secure cookies with HTTPOnly, SameSite, and Secure flags
- 24-hour session expiration
- CSRF protection through session validation

### Authorization
- **Public Endpoints**: Available without authentication
- **Authenticated Endpoints**: Requires valid session
- **Admin Endpoints**: Requires admin role

## API Endpoints

### Authentication Endpoints

#### Register New User
```
POST /auth/register
```
**Description:** Create a new user account with email and password

**Required Fields:**
- `email` (string, email format)
- `password` (string, minimum 8 characters)
- `firstName` (string)
- `lastName` (string)

**Response:** User object with created account details

---

#### Login User
```
POST /auth/login
```
**Description:** Authenticate user with email and password

**Required Fields:**
- `email` (string)
- `password` (string)

**Response:** Session created, cookie returned

---

#### Get Current User
```
GET /auth/user
```
**Description:** Retrieve authenticated user's profile

**Authentication:** Required

**Response:** Current user object

---

#### Logout User
```
POST /auth/logout
```
**Description:** Terminate user session

**Authentication:** Required

**Response:** Logout confirmation

---

#### Google OAuth Callback
```
GET /auth/google/callback
```
**Description:** OAuth callback endpoint

**Authentication:** Google

**Response:** Redirect with session

---

### Books Endpoints

#### Get All Books
```
GET /books
```
**Description:** Retrieve all books in the library

**Access:** Public

**Query Parameters:**
- `skip` (number, default: 0)
- `limit` (number, default: 10)

**Response:** Array of book objects with count

---

#### Get Single Book
```
GET /books/:id
```
**Description:** Retrieve specific book by ID

**Access:** Public

**Parameters:**
- `id` (MongoDB ObjectId)

**Response:** Book object with populated author reference

---

#### Create New Book
```
POST /books
Content-Type: application/json
```
**Description:** Add new book to library

**Authentication:** Required

**Required Fields:**
- `title` (string, max 200 characters)
- `author` (ObjectId of Author)
- `isbn` (string, unique, 10 or 13 digits)
- `publishedDate` (Date)
- `genre` (enum: Fiction, Non-Fiction, Science Fiction, Fantasy, Mystery, Thriller, Romance, Biography, History, Science, Technology, Self-Help, Other)
- `pages` (number, minimum 1)
- `language` (string)
- `publisher` (string)
- `price` (number)
- `quantity` (number)

**Response:** Created book object

---

#### Update Book
```
PUT /books/:id
Content-Type: application/json
```
**Description:** Modify existing book information

**Authentication:** Required

**Parameters:**
- `id` (MongoDB ObjectId)

**Body:** Any updatable book fields

**Response:** Updated book object

---

#### Delete Book
```
DELETE /books/:id
```
**Description:** Remove book from library

**Authentication:** Required (Admin only)

**Parameters:**
- `id` (MongoDB ObjectId)

**Response:** Deletion confirmation

---

### Authors Endpoints

#### Get All Authors
```
GET /authors
```
**Description:** Retrieve all authors in the system

**Access:** Public

**Query Parameters:**
- `skip` (number, default: 0)
- `limit` (number, default: 10)

**Response:** Array of author objects with count

---

#### Get Single Author
```
GET /authors/:id
```
**Description:** Retrieve specific author by ID

**Access:** Public

**Parameters:**
- `id` (MongoDB ObjectId)

**Response:** Author object with all details

---

#### Create New Author
```
POST /authors
Content-Type: application/json
```
**Description:** Add new author to database

**Authentication:** Required

**Required Fields:**
- `firstName` (string, max 50 characters)
- `lastName` (string, max 50 characters)
- `email` (string, unique, valid email format)

**Optional Fields:**
- `bio` (string, max 1000 characters)
- `birthDate` (Date)
- `nationality` (string)
- `website` (URL with HTTP/HTTPS)

**Response:** Created author object

---

#### Update Author
```
PUT /authors/:id
Content-Type: application/json
```
**Description:** Modify existing author information

**Authentication:** Required

**Parameters:**
- `id` (MongoDB ObjectId)

**Body:** Any updatable author fields

**Response:** Updated author object

---

#### Delete Author
```
DELETE /authors/:id
```
**Description:** Remove author from database

**Authentication:** Required (Admin only)

**Parameters:**
- `id` (MongoDB ObjectId)

**Response:** Deletion confirmation

---

## Data Models

### User Schema
```javascript
{
  googleId: String (unique, sparse),
  email: String (required, unique, lowercase),
  password: String (hashed, not returned by default),
  firstName: String (required),
  lastName: String (required),
  profilePicture: String,
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Author Schema
```javascript
{
  firstName: String (required, max 50),
  lastName: String (required, max 50),
  email: String (required, unique),
  bio: String (max 1000),
  birthDate: Date,
  nationality: String,
  website: String (valid URL format),
  createdAt: Date,
  updatedAt: Date
}
```

### Book Schema
```javascript
{
  title: String (required, max 200),
  author: ObjectId (ref: 'Author', required),
  isbn: String (required, unique, 10 or 13 digits),
  publishedDate: Date (required),
  genre: String (enum: ['Fiction', 'Non-Fiction', ...]),
  pages: Number (required, minimum 1),
  language: String,
  publisher: String,
  price: Number,
  quantity: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API follows RESTful error response conventions with appropriate HTTP status codes and descriptive error messages.

### Common HTTP Status Codes
- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST (resource created)
- `400 Bad Request` - Invalid input or validation error
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource does not exist
- `500 Internal Server Error` - Server-side error

### Error Response Format
```json
{
  "success": false,
  "error": "Descriptive error message",
  "details": "Additional error information if available"
}
```

## Security Features

### Implementation Details

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Passwords never returned in responses
   - Passwords selected from database only when needed

2. **Session Security**
   - HTTPOnly cookies prevent XSS attacks
   - Secure flag for HTTPS enforcement in production
   - SameSite attribute prevents CSRF
   - Session expiration after 24 hours

3. **Data Validation**
   - Server-side validation for all inputs
   - Email format validation
   - ISBN format validation (10 or 13 digits)
   - URL format validation for websites
   - Field length restrictions

4. **CORS Protection**
   - Configured allowed origins
   - Credentials support enabled
   - Prevents unauthorized cross-origin requests

5. **Authorization**
   - Role-based access control (RBAC)
   - Admin-only destructive operations
   - User-level read access for most resources

6. **Best Practices**
   - Environment variables for sensitive data
   - No sensitive data in error messages
   - SQL/NoSQL injection prevention through Mongoose
   - HTTPS recommended for production

## Development

### npm Scripts

```bash
# Start development server with hot reloading
npm run dev

# Start production server
npm start

# Run tests (to be implemented)
npm test
```

### Code Organization

- **Separation of Concerns**: Controllers, models, routes, and middleware are separated
- **Validation Middleware**: Centralized validation logic
- **Error Handling**: Consistent error responses
- **Documentation**: JSDoc comments and Swagger annotations

### Future Enhancements

- Comprehensive unit and integration tests
- Advanced search and filtering capabilities
- Book borrowing/lending system
- User reviews and ratings
- Notification system
- Rate limiting and throttling
- Advanced logging and monitoring

## License

This project is licensed under the ISC License - see the package.json file for details.

---

**Author:** Anderson Havah  
**Version:** 1.0.0  
**Last Updated:** 2026

For issues, questions, or contributions, please reach out to the project maintainer.
