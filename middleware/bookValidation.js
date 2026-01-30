const { body } = require('express-validator');

const bookValidationRules = () => {
  return [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    
    body('author')
      .notEmpty()
      .withMessage('Author is required')
      .isMongoId()
      .withMessage('Invalid author ID'),
    
    body('isbn')
      .trim()
      .notEmpty()
      .withMessage('ISBN is required')
      .matches(/^(?:\d{10}|\d{13})$/)
      .withMessage('ISBN must be 10 or 13 digits'),
    
    body('publishedDate')
      .notEmpty()
      .withMessage('Published date is required')
      .isISO8601()
      .withMessage('Published date must be a valid date'),
    
    body('genre')
      .notEmpty()
      .withMessage('Genre is required')
      .isIn([
        'Fiction',
        'Non-Fiction',
        'Science Fiction',
        'Fantasy',
        'Mystery',
        'Thriller',
        'Romance',
        'Biography',
        'History',
        'Science',
        'Technology',
        'Self-Help',
        'Other'
      ])
      .withMessage('Invalid genre'),
    
    body('pages')
      .notEmpty()
      .withMessage('Number of pages is required')
      .isInt({ min: 1 })
      .withMessage('Pages must be at least 1'),
    
    body('language')
      .trim()
      .notEmpty()
      .withMessage('Language is required'),
    
    body('publisher')
      .trim()
      .notEmpty()
      .withMessage('Publisher is required'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Description cannot exceed 2000 characters'),
    
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    
    body('inStock')
      .optional()
      .isBoolean()
      .withMessage('inStock must be a boolean'),
    
    body('quantity')
      .notEmpty()
      .withMessage('Quantity is required')
      .isInt({ min: 0 })
      .withMessage('Quantity must be a non-negative integer')
  ];
};

const bookUpdateValidationRules = () => {
  return [
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Title cannot be empty')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    
    body('author')
      .optional()
      .notEmpty()
      .withMessage('Author cannot be empty')
      .isMongoId()
      .withMessage('Invalid author ID'),
    
    body('isbn')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('ISBN cannot be empty')
      .matches(/^(?:\d{10}|\d{13})$/)
      .withMessage('ISBN must be 10 or 13 digits'),
    
    body('publishedDate')
      .optional()
      .notEmpty()
      .withMessage('Published date cannot be empty')
      .isISO8601()
      .withMessage('Published date must be a valid date'),
    
    body('genre')
      .optional()
      .notEmpty()
      .withMessage('Genre cannot be empty')
      .isIn([
        'Fiction',
        'Non-Fiction',
        'Science Fiction',
        'Fantasy',
        'Mystery',
        'Thriller',
        'Romance',
        'Biography',
        'History',
        'Science',
        'Technology',
        'Self-Help',
        'Other'
      ])
      .withMessage('Invalid genre'),
    
    body('pages')
      .optional()
      .notEmpty()
      .withMessage('Pages cannot be empty')
      .isInt({ min: 1 })
      .withMessage('Pages must be at least 1'),
    
    body('language')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Language cannot be empty'),
    
    body('publisher')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Publisher cannot be empty'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Description cannot exceed 2000 characters'),
    
    body('price')
      .optional()
      .notEmpty()
      .withMessage('Price cannot be empty')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    
    body('inStock')
      .optional()
      .isBoolean()
      .withMessage('inStock must be a boolean'),
    
    body('quantity')
      .optional()
      .notEmpty()
      .withMessage('Quantity cannot be empty')
      .isInt({ min: 0 })
      .withMessage('Quantity must be a non-negative integer')
  ];
};

module.exports = {
  bookValidationRules,
  bookUpdateValidationRules
};