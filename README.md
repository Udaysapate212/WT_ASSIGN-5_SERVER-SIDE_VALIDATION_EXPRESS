# User Registration System with Server-Side Validation

A web application demonstrating server-side validation using ExpressJS and React.

## Overview

This application provides a user registration system with server-side validation. All validation is implemented on the backend using express-validator, ensuring data integrity and security.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup

1. Install dependencies
```bash
npm install
```

2. Start the application
```bash
npm start
```

3. Access the application
```
http://localhost:3000
```

## Validation Rules

| Field | Rules |
|-------|-------|
| Username | 3-20 characters, alphanumeric and underscore only, cannot contain 'admin' or 'root' |
| Email | Valid email format, allowed domains: gmail.com, yahoo.com, outlook.com, hotmail.com |
| Password | Minimum 8 characters, must contain uppercase, lowercase, number, and special character |
| Confirm Password | Must match password field |
| Age | Between 18 and 120 |
| Phone | 10-digit Indian mobile number starting with 6-9 |

## API Endpoints

### POST /api/user/register

Register a new user with validation.

**Request:**
```json
{
  "username": "johndoe",
  "email": "john@gmail.com",
  "password": "Password@123",
  "confirmPassword": "Password@123",
  "age": "25",
  "phone": "9876543210"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@gmail.com",
    "age": 25,
    "phone": "9876543210"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field"
    }
  ]
}
```

### GET /api/user/all

Get all registered users.

## Project Structure

```
├── controllers/
│   └── user.controller.js      # Business logic
├── routes/
│   └── user.router.js          # API routes
├── validations/
│   └── user.validation.js      # Validation rules
├── public/
│   ├── src/                    # React source
│   └── dist/                   # Production build
├── index.js                    # Express server
└── package.json
```

## Technologies Used

**Backend:**
- Express.js
- express-validator
- cors

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Hook Form
- Zod
- Axios

## Testing

**Valid Test Data:**
```
Username: johndoe
Email: john@gmail.com
Password: Password@123
Confirm Password: Password@123
Age: 25
Phone: 9876543210
```

**Invalid Test Cases:**
- Username: "ab" (too short)
- Email: "test@example.com" (invalid domain)
- Password: "password" (weak)
- Age: 15 (underage)
- Phone: 1234567890 (invalid format)
