const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtService {
  static generateToken(email) {
    const payload = {
      email
    };
    // Use a secret key to sign the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
  }

  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = JwtService;
