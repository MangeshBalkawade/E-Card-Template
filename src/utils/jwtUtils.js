const jwt = require("jsonwebtoken");
const responseUtils = require("../utils/responseUtils");
const Messages = require("../utils/messages");

module.exports = {
  async generateToken(data, res, expiresIn = "30d") {
    const secret = process.env.JWT_SECRET;
    return new Promise((resolve, reject) => {
      jwt.sign({ loginInfo: data }, secret, { expiresIn }, (err, token) => {
        if (err) {
          resolve(
            responseUtils.sendUnauthorized(res, Messages.TokenNotGenerated)
          );
        }
        return resolve(token);
      });
    });
  },

  async validateToken(req, res, next) {
    try {
      const secret = process.env.JWT_SECRET;
      const { authorization } = req.headers;
      const tokenArray = authorization.split(" ");
      jwt.verify(tokenArray[1], secret, (err, decoded) => {
        if (err) {
          responseUtils.sendUnauthorized(res);
        } else {
          if (!decoded.loginInfo) {
            // Send unauthorized response if required keys are not present
            responseUtils.sendUnauthorized(
              res,
              "Required keys missing in token payload"
            );
          } else {
            // loginInfo Key word is finally add in the request part.
            req.loginInfo = decoded.loginInfo;
            next();
          }
        }
      });
    } catch (error) {
      responseUtils.sendUnauthorized(res);
    }
  },
};
