const responseUtils = require("../utils/responseUtils");
const jwtUtils = require("../utils/jwtUtils");
const Messages = require("../utils/messages");
const CommonUtils = require("../utils/commonUtils");
const sequelize = require("../config/database");
const logService = require("../services/logService");
const UserService = require("../services/userService");
const ProjectConfig = require("../config/projectConfig");

exports.getDataById = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await UserService.getDataById(id);
    if (data) {
      return responseUtils.sendSuccess(res, { data });
    } else {
      return responseUtils.sendBadRequest(res, Messages.EntityNotAvailable);
    }
  } catch (error) {
    await logService.Insert(error, req.url);
    return responseUtils.sendServerError(res, Messages.CatchErrorMessage);
  }
};
