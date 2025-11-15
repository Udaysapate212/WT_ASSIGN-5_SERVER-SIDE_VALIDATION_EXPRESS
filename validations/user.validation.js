const { body } = require("express-validator");

const userRegistrationValidation = [
  // Username validation
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .custom((value) => {
      if (value.toLowerCase().includes('admin') || value.toLowerCase().includes('root')) {
        throw new Error('Username cannot contain reserved words');
      }
      return true;
    }),

  // Email validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .custom((value) => {
      const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
      const domain = value.split('@')[1];
      if (!allowedDomains.includes(domain)) {
        throw new Error(`Email domain must be one of: ${allowedDomains.join(', ')}`);
      }
      return true;
    }),

  // Password validation
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-zA-Z\d@$!%*?&]/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"),

  // Confirm Password validation
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  // Age validation
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be between 18 and 120")
    .toInt(),

  // Phone validation
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please provide a valid 10-digit Indian mobile number starting with 6-9")
];

module.exports = {
  userRegistrationValidation
};
