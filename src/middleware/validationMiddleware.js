const { body, param, check, validationResult } = require("express-validator");
const Messages = require("../utils/messages");

const ValidateFieldsCommon = (...fields) => {
  return async (req, res, next) => {
    //  console.log(req.body, fields);
    const validationRules = fields.map((field) =>
      body(field).notEmpty().withMessage(`Please provide ${field}`)
    );
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      res
        .status(422)
        .json({ errors: errors.array(), message: Messages.BadResponse });
    }
  };
};

module.exports = {
  ValidateFieldsCommon,
};
