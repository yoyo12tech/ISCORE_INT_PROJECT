const JwtService = require('../../Application/JWTservice/jwtService'); // Adjust the path as needed

const checkAuth = (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.auth_token;

  // If there is no token, send an unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    // Verify the token using JwtService
    const payload = JwtService.verifyToken(token);

    // Attach the decoded email from the token to the request object
    req.user = {
      email: payload.email, // Extracting email from token payload
    };
    console.log('User authenticated: ', req.user.email);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails (invalid or expired token)
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = checkAuth;
