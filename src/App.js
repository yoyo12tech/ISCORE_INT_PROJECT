const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./Infrastructure/database/connection');
const UserModel = require('./Infrastructure/Models/UserSchema');
const UserRepository = require('./Infrastructure/DbContext/UserRepository');
const UserService = require('./Application/UserService');
const UserController = require('./Presentation/Controllers/userController');
const userRoutes = require('./Presentation/Routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

//Dependency Injection
const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));

app.use('/api', userRoutes(userController));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
