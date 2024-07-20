const OtpManagmentServices = require("../services/otpManagmentServices");
const responseUtils = require("../utils/responseUtils");
const jwtUtils = require("../utils/jwtUtils");
const Messages = require("../utils/messages");
const commonUtils = require("../utils/commonUtils");
const emailerUtils = require("../utils/emailerUtils");
const logService = require("../services/logService");
const UserService = require("../services/userService");
const ProjectConfig = require("../config/projectConfig");
const userService = require("../services/userService");

exports.sendOtp = async (req, res) => {
  try {
    let data = req.body;

    let filer = {
      isManualConnectionUserFlag: 0,
      deleteFlag: 0,
      email: data.email,
    };

    let type = +data.type;
    let flag = await UserService.existData(filer);
    //0-registration 1-login 2-account deletion
    switch (type) {
      case 0:
        if (flag) {
          return responseUtils.sendBadRequest(res, Messages.EmailExists);
        }
        break;
      case 1:
      case 2:
        if (!flag) {
          return responseUtils.sendBadRequest(res, Messages.UserNotExists);
        }
        break;
      default:
        return responseUtils.sendBadRequest(res, Messages.BadResponse);
    }

    let otp = await commonUtils.generateRandomNumber(4);
    data.otp = otp;

    let savedData = await OtpManagmentServices.saveData(data);

    let loginInfo = {
      email: data.email,
      type: data.type,
      otpId: savedData.otpId,
    };

    let token = await jwtUtils.generateToken(loginInfo, res, "1d");

    let emailerData = {
      VERIFICATION_CODE: otp,
    };

    let fileUrl = "./emailTemplate/emailOtp.html";
    let subject = Messages.emailSubjects.OtpSendEmailSubject;
    await emailerUtils.sendEmail(fileUrl, subject, data.email, emailerData);

    return responseUtils.sendSuccess(res, { token }, Messages.SendOtpSuccess);
  } catch (error) {
    await commonUtils.log(error, "Error");
    await logService.Insert(error, req.url);
    return responseUtils.sendServerError(res, Messages.CatchErrorMessage);
  }
};

exports.resendOtp = async (req, res) => {
  try {
    let { email, type, otpId } = req.loginInfo;

    let filter = {
      otpId,
      deleteFlag: 0,
      verifyStatus: 0,
    };

    let otpData = await OtpManagmentServices.getSingleDataWithFilterAndAttributes(
      filter,
      ["otpId"],
      "DESC"
    );

    if (!otpData) {
      return responseUtils.sendBadRequest(res, Messages.ResendOtpFailed);
    }

    let otp = await commonUtils.generateRandomNumber(4);

    await OtpManagmentServices.updateData(otpId, { otp });

    let emailerData = {
      VERIFICATION_CODE: otp,
    };

    let fileUrl = "./emailTemplate/emailOtp.html";
    let subject = Messages.emailSubjects.OtpSendEmailSubject;
    await emailerUtils.sendEmail(fileUrl, subject, email, emailerData);

    return responseUtils.sendSuccess(res, {}, Messages.SendOtpSuccess);
  } catch (error) {
    await commonUtils.log(error, "Error");
    await logService.Insert(error, req.url);
    return responseUtils.sendServerError(res, Messages.CatchErrorMessage);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let { type, otpId, email } = req.loginInfo;

    if (type == null || otpId == null || email == null) {
      return responseUtils.sendBadRequest(res, Messages.BadResponse);
    }
    let { otp } = req.body;

    let filter = {
      otpId,
      deleteFlag: 0,
    };

    // need to test
    let otpData = await OtpManagmentServices.getSingleDataWithFilterAndAttributes(
      filter,
      ["otpId", "verifyStatus", "otp"],
      "DESC"
    );

    if (!otpData) {
      return responseUtils.sendBadRequest(res, Messages.EntityNotAvailable);
    }

    if (otpData.otp != otp) {
      return responseUtils.sendBadRequest(res, Messages.InvalidOtp);
    }

    if (otpData.verifyStatus == 1) {
      return responseUtils.sendSuccess(res, {}, Messages.OtpAlreadyVerify);
    }

    await OtpManagmentServices.updateData(otpId, { verifyStatus: 1 });

    type = +type;
    let userData = null;

    let userFilter = {
      email,
      deleteFlag: 0,
      isManualConnectionUserFlag: 0,
    };

    switch (type) {
      case 0:
        responseUtils.sendSuccess(res, {}, Messages.OtpVerify);
        break;
      case 1:
        userData = await UserService.getSingleDataWithFilterAndAttributes(
          userFilter,
          {
            exclude: ["deleteFlag", "status", "isManualConnectionUserFlag"],
          },
          "DESC"
        );
        if (!userData) {
          return responseUtils.sendBadRequest(res, Messages.UserNotExists);
        }
        let loginInfo = {
          email,
          userId: userData?.userId,
          organizationId: userData?.organizationId,
        };
        let token = await jwtUtils.generateToken(loginInfo, res);
        responseUtils.sendSuccess(
          res,
          { token, userData },
          Messages.LoginSuccessful
        );
        break;
      case 2:
        userData = await UserService.getSingleDataWithFilterAndAttributes(
          userFilter,
          ["userId"],
          "DESC"
        );
        if (!userData) {
          return responseUtils.sendBadRequest(res, Messages.UserNotExists);
        }
        await userService.deleteData(userData?.userId);
        responseUtils.sendSuccess(res, {}, Messages.EntityDeleted);
        break;
      default:
        return responseUtils.sendBadRequest(res, Messages.BadResponse);
    }
  } catch (error) {
    await commonUtils.log(error, "Error");
    await logService.Insert(error, req.url);
    return responseUtils.sendServerError(res, Messages.CatchErrorMessage);
  }
};
