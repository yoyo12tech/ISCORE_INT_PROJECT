const express = require('express');
const UserService = require('../Application/UserService'); // Import UserService
const checkAuth = require('./Middleware/authMiddleware'); // Import checkAuth middleware
// Create an instance of the router
const router = express.Router();

// Create user
router.post('/register', async (req, res) => {
  const { name, email, age, password } = req.body;
  try {
    const user = await UserService.RegisterUser({ name, email, age, password });
    res.status(201).json(user); // Return the created user
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserService.loginUser(name, email, password, res);
    res.status(200).json(user); // Return success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

//Get user email and Name
router.get('/userInfo', checkAuth,async (req, res) => {
  try {
    console.log(req.user.email);
    const user = await UserService.getUserInfo(req.user.email);
    res.status(200).json({name:user.name,email:user.email}); // Return the user
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// Get all users
router.get('/users',checkAuth, async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users); // Return all users
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

module.exports = router; // Export the router
