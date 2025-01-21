class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  registerUser = async (req, res) => {
    const { name, email, age, password } = req.body;
    try {
      const user = await this.userService.registerUser({ name, email, age, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  loginUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await this.userService.loginUser(name, email, password, res);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getUserInfo = async (req, res) => {
    try {
      const user = await this.userService.getUserInfo(req.user.email);
      res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = UserController;
