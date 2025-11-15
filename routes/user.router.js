const express = require("express");
const router = express.Router();
const { registerUser, getAllUsers } = require("../controllers/user.controller");
const { userRegistrationValidation } = require("../validations/user.validation");

// POST /api/user/register - Register a new user with validation
router.post("/register", userRegistrationValidation, registerUser);

// GET /api/user/all - Get all registered users
router.get("/all", getAllUsers);

module.exports = router;
