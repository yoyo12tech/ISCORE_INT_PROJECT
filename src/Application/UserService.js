const bcrypt = require('bcrypt');
const UserRepository = require('../Infrastructure/DbContext/userRepository');
const JwtService = require('./JWTservice/jwtService');

class UserService {

  // Register a new user
  static async RegisterUser(userData) {
    try {
      // Check if required fields are present
      if (!userData.name || !userData.email || !userData.age || !userData.password) {
        throw new Error('Missing required fields');
      }

      // Check if email already exists
      const existingUser = await UserRepository.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email is already in use');
      }

      // Hash password before saving to the database
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Proceed to create the user if email doesn't exist
      const user = await UserRepository.createUser({
        ...userData,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Get all users
  static async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  // Login user using name, email, and password
  static async loginUser(name, email, password, res) {
    try {
      // Only use email to find the user (name is ignored)
      const user = await UserRepository.getUserByEmail(email);
      if (!user || !user.name) {
        throw new Error('Invalid credentials'); // If user is not found by email, throw error
      }

      // Check if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Incorrect Passowrd'); // If password does not match, throw error
      }

      // Generate JWT token using the user's ID
      const token = JwtService.generateToken(user.email);

      // Set the token in an HTTP-only cookie
      res.cookie('auth_token', token, {
        httpOnly: true, // Makes the cookie inaccessible to JavaScript (for security reasons)
        secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
        expiresIn: '1d', // 1 day expiry
      });

      return { message: 'Login successful' }; // Return success message
    } catch (error) {
      throw new Error('Error logging in: ' + error.message); // Return error message if something goes wrong
    }
  }
}

module.exports = UserService;
