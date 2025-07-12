const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json(errorResponse('Access token required', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(403).json(errorResponse('Invalid or expired token', 403));
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
