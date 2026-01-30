const { body } = require('express-validator');

const authorValidationRules = () => {
  return [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ max: 50 })
      .withMessage('First name cannot exceed 50 characters'),
    
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required')
      .isLength({ max: 50 })
      .withMessage('Last name cannot exceed 50 characters'),
    
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email'),
    
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Bio cannot exceed 1000 characters'),
    
    body('birthDate')
      .optional()
      .isISO8601()
      .withMessage('Birth date must be a valid date'),
    
    body('nationality')
      .optional()
      .trim(),
    
    body('website')
      .optional()
      .trim()
      .isURL()
      .withMessage('Please provide a valid URL')
  ];
};

const authorUpdateValidationRules = () => {
  return [
    body('firstName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('First name cannot be empty')
      .isLength({ max: 50 })
      .withMessage('First name cannot exceed 50 characters'),
    
    body('lastName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Last name cannot be empty')
      .isLength({ max: 50 })
      .withMessage('Last name cannot exceed 50 characters'),
    
    body('email')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Please provide a valid email'),
    
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Bio cannot exceed 1000 characters'),
    
    body('birthDate')
      .optional()
      .isISO8601()
      .withMessage('Birth date must be a valid date'),
    
    body('nationality')
      .optional()
      .trim(),
    
    body('website')
      .optional()
      .trim()
      .isURL()
      .withMessage('Please provide a valid URL')
  ];
};

module.exports = {
  authorValidationRules,
  authorUpdateValidationRules
};