const { errorResponse } = require('../utils/response');

const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return errorResponse(res, 'Unauthorized: Missing user role', [], 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'Forbidden: You do not have permission for this action', [], 403);
    }

    next();
  };
};

module.exports = authorizeRoles;
