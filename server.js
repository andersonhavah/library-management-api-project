const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Passport config
require('./config/passport')(passport);

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Enable CORS with credentials
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Session middleware (must be before passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'));
app.use('/authors', require('./routes/authorRoutes'));

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Root endpoint
 *     description: Returns API information and available endpoints
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 authentication:
 *                   type: string
 *                 endpoints:
 *                   type: object
 *                 documentation:
 *                   type: string
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Library Management API',
    version: '1.0.0',
    authentication: 'OAuth 2.0 (Google) and Local Authentication',
    endpoints: {
      auth: '/auth',
      books: '/books',
      authors: '/authors'
    },
    documentation: '/api-docs',
    authenticated: req.isAuthenticated(),
    user: req.user ? {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role
    } : null
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});