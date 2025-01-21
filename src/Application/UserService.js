const bcrypt = require('bcrypt');
const JwtService = require('./JWTservice/jwtService');
const User = require('../Domain/Entity/User');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userData) {
    if (!userData.name || !userData.email || !userData.age || !userData.password) {
      throw new Error('Missing required fields');
    }

    const existingUser = await this.userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // Create a domain user
    const newUser = new User(userData.name, userData.email, userData.age, hashedPassword);

    // Pass the raw data to the repository
    const createdUser = await this.userRepository.createUser({
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      password: newUser.password,
    });

    // Return a domain user
    return new User(createdUser.name, createdUser.email, createdUser.age, createdUser.password);
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    // Convert all user documents into domain entities
    return users.map(user => new User(user.name, user.email, user.age, user.password));
  }

  async loginUser(name, email, password, res) {
    const userDoc = await this.userRepository.getUserByEmail(email);
    if (!userDoc || !userDoc.password) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      throw new Error('Incorrect Password');
    }

    const token = JwtService.generateToken(email);
    res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return { message: 'Login successful' };
  }

  async getUserInfo(email) {
    const userDoc = await this.userRepository.getUserByEmail(email);
    if (!userDoc) throw new Error('User not found');
    // Convert database document to domain entity
    return new User(userDoc.name, userDoc.email, userDoc.age, userDoc.password);
  }
}

module.exports = UserService;
