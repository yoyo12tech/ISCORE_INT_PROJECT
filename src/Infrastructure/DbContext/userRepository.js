class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(userData) {
    // Directly save the data into the database
    return await this.userModel.create(userData);
  }

  async getUserById(id) {
    // Fetch the user document from the database
    return await this.userModel.findById(id);
  }

  async getUserByEmail(email) {
    // Fetch the user document by email
    return await this.userModel.findOne({ email });
  }

  async getAllUsers() {
    // Fetch all user documents
    return await this.userModel.find();
  }
}

module.exports = UserRepository;
