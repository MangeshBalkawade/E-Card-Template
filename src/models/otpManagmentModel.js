// state.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OtpManagment = sequelize.define(
  "OtpManagment",
  {
    otpId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(150),
    },
    otp: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0-registration 1-login 2-accountdeletion",
    },
    verifyStatus: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0-no 1-yes",
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "soft delete , 1-delete",
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    timestamps: true,
  }
);

module.exports = OtpManagment;
