// Middleware to check if user is authenticated
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.status(401).json({
    success: false,
    error: 'Unauthorized',
    message: 'You must be logged in to access this route'
  });
};

// Middleware to check if user is not authenticated (for login/register routes)
const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  
  res.status(400).json({
    success: false,
    error: 'Already authenticated',
    message: 'You are already logged in'
  });
};

// Middleware to check if user is admin
const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  
  res.status(403).json({
    success: false,
    error: 'Forbidden',
    message: 'You do not have permission to access this route'
  });
};

module.exports = {
  ensureAuth,
  ensureGuest,
  ensureAdmin
};