const express = require("express");
const route = express.Router();
const { validateFieldsCommon } = require("../middleware/validationMiddleware");
const otpManagmentController = require("../controllers/otpManagmentController");
const jwtUtils = require("../utils/jwtUtils");

route.post(
  "/Otp-Send",
  validateFieldsCommon("email", "type"),
  otpManagmentController.sendOtp
);

route.post(
  "/Otp-Resend",
  jwtUtils.validateToken,
  otpManagmentController.resendOtp
);

route.post(
  "/Otp-Verify",
  jwtUtils.validateToken,
  validateFieldsCommon("otp"),
  otpManagmentController.verifyOtp
);

module.exports = route;
