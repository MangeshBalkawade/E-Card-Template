const responseUtils = require("../utils/responseUtils");

module.exports = {
  async validateRole(...allowedRoles) {
    return function (req, res, next) {
      // Extract user's role from the request object (stored during token validation)
      const userRole = req.loginInfo.role;
      // Check if the user's role matches any of the allowed roles
      if (!allowedRoles.includes(userRole)) {
        return responseUtils.sendUnauthorized(res); // Or handle unauthorized access as needed
      }
      // If the user's role matches any of the allowed roles, proceed to the next middleware/route handler
      next();
    };
  },

  async validateloginType(...loginType) {
    return function (req, res, next) {
      // Extract user's role from the request object (stored during token validation)
      const loginType = req.loginInfo.loginType;
      // Check if the user's role matches any of the allowed roles
      if (!loginType.includes(loginType)) {
        return responseUtils.sendUnauthorized(res); // Or handle unauthorized access as needed
      }
      // If the user's role matches any of the allowed roles, proceed to the next middleware/route handler
      next();
    };
  },
};
