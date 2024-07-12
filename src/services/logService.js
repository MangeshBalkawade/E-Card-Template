const DbModel = require("../models/logModel");
const logService = require("./logService");
const tableName = DbModel.tableName;
const PrimaryKeyID = "logId";
const Messages = require("../utils/messages");
const { Op, JSON } = require("sequelize");
const commonUtils = require("../utils/commonUtils");
const { json } = require("body-parser");
const util = require("util");

module.exports = {
  // Function to save data
  async Insert(data, Messages) {
    try {
      let InsertData = {
        bodyData: util.inspect(data),
        message: util.inspect(Messages),
      };
      let savedData = await DbModel.create(InsertData);
      return savedData;
    } catch (error) {
      await commonUtils.log(error, "Error");
      return false;
    }
  },
  // Function to save data
  async saveData(data) {
    try {
      let savedData = await DbModel.create(data);
      return savedData;
    } catch (error) {
      await commonUtils.log(error, "Error");
      return false;
    }
  },
};
