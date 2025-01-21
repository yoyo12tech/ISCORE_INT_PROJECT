const express = require('express');
const checkAuth = require('../Middleware/authMiddleware');

const userRoutes = (userController) => {
  const router = express.Router();

  router.post('/register', userController.registerUser);
  router.post('/login', userController.loginUser);
  router.get('/userInfo', checkAuth, userController.getUserInfo);
  router.get('/users', checkAuth, userController.getAllUsers);

  return router;
};

module.exports = userRoutes;
