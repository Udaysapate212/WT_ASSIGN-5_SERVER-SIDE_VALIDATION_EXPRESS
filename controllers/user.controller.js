const { validationResult } = require("express-validator");

// In-memory storage for demo (replace with database in production)
const users = [];

const registerUser = (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Validation failed"
    });
  }

  const { username, email, password, age, phone } = req.body;

  // Check if user already exists
  const existingUser = users.find(u => u.email === email || u.username === username);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User with this email or username already exists"
    });
  }

  // Create new user (in production, hash password before storing)
  const newUser = {
    id: users.length + 1,
    username,
    email,
    age: parseInt(age),
    phone,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      age: newUser.age,
      phone: newUser.phone
    }
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users.map(({ password, ...user }) => user)
  });
};

module.exports = {
  registerUser,
  getAllUsers
};
