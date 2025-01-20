const express = require('express');
const cors = require('cors');
const userController = require('./Presentation/userController'); // Import userController
const connectDB = require('./Infrastructure/database/connection'); // Import connectDB function
require('dotenv').config();
const cookieParser = require('cookie-parser');  
const port = process.env.PORT || 8000;

//Initialize express
const app = express();


// MongoDB connection
connectDB();
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',        // Allow requests from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'], // Add PATCH method
  credentials: true,                      // Allow cookies if needed (for example, for session management)
}));// This will allow all domains to make requests to your backend




// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies in the request headers

// Use the routes from userController
app.use('/api', userController); // Prefix routes with /api

