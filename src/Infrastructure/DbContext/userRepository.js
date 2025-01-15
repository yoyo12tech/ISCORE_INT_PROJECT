const UserModel = require('../Models/UserSchema');
const User = require('../../Domain/Entity/user');

class UserRepository {

  // Create a new user
  static async createUser(userData) {
    // Ensure the password is passed as well
    const user = new User(userData.name, userData.email, userData.age, userData.password);

    // Save the user to the database
    const userDoc = new UserModel({
      name: user.name,
      email: user.email,
      age: user.age,
      password: user.password,  // Ensure password is included here
    });

    // Save the document
    await userDoc.save();

    // Return the created User instance, including password (you can choose not to return password if you don't want to expose it)
    return new User(userDoc.name, userDoc.email, userDoc.age, userDoc.password);
  }

  // Get a user by ID
  static async getUserById(id) {
    try {
      // Use findById() to return a single user by its ID
      const userDoc = await UserModel.findById(id);
      if (!userDoc) {
        throw new Error('User not found');
      }
      // Return a new User instance with the user data
      return new User(userDoc.name, userDoc.email, userDoc.age, userDoc.password);
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message);
    }
  }

  // Get a user by Email
  static async getUserByEmail(email) {
    try {
      // Use findOne() to return a single user by its email
      const userDoc = await UserModel.findOne({ email });
      if (!userDoc) {
        return null; // Return null if user is not found
      }
      // Return a new User instance with the user data
      return new User(userDoc.name, userDoc.email, userDoc.age, userDoc.password);
    } catch (error) {
      throw new Error('Error fetching user by email: ' + error.message);
    }
  }

  // Get all users
  static async getAllUsers() {
    const userDocs = await UserModel.find();
    return userDocs.map(doc => new User(doc.name, doc.email, doc.age, doc.password));
  }
}

module.exports = UserRepository;
