const {
  body,
  param,
  check,
  query,
  validationResult,
} = require("express-validator");
const responseUtils = require("../utils/responseUtils");
module.exports = {
  async GetStateValidationKeys(req, res, next) {
    const allowedKeys = ["countryId"];
    // Check for unexpected keys in the request body
    const unexpectedKeys = Object.keys(req.query).filter(
      (key) => !allowedKeys.includes(key)
    );
    if (unexpectedKeys.length > 0) {
      return responseUtils.sendValidationError(
        res,
        {
          errors: [{ msg: `keys not Required: ${unexpectedKeys.join(", ")}` }],
        },
        "Invalid Data"
      );
    }
    const validationRules = [
      query("countryId").notEmpty().withMessage("countryId is Required"),
    ];
    Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        next();
      } else {
        return responseUtils.sendValidationError(
          res,
          { errors: errors.array() },
          "Invalid Data"
        );
      }
    });
  },

  async GetCityValidationKeys(req, res, next) {
    const allowedKeys = ["countryId", "stateId"];

    // Check for unexpected keys in the request body
    const unexpectedKeys = Object.keys(req.query).filter(
      (key) => !allowedKeys.includes(key)
    );
    if (unexpectedKeys.length > 0) {
      return responseUtils.sendValidationError(
        res,
        {
          errors: [{ msg: `keys not Required: ${unexpectedKeys.join(", ")}` }],
        },
        "Invalid Data"
      );
    }
    const validationRules = [
      query("countryId").notEmpty().withMessage("countryId is Required"),
      query("stateId").notEmpty().withMessage("stateId is Required"),
    ];
    Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        next();
      } else {
        return responseUtils.sendValidationError(
          res,
          { errors: errors.array() },
          "Invalid Data"
        );
      }
    });
  },
};
