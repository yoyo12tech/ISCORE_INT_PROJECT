const express = require('express');
const userController = require('./Presentation/userController'); // Import userController
const connectDB = require('./Infrastructure/database/connection'); // Import connectDB function
require('dotenv').config();
const cookieParser = require('cookie-parser');  
const app = express();
const port = process.env.PORT || 8000;

// MongoDB connection
connectDB();
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies in the request headers

// Use the routes from userController
app.use('/api', userController); // Prefix routes with /api

