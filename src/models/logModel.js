const sequelize = require("../config/database");
const { DataTypes, where } = require("sequelize");
require("dotenv").config();

const log = sequelize.define(
  "log",
  {
    // Organization identification
    logId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bodyData: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    timestamps: true,
  }
);

log.sync({ alter: false });
module.exports = log;
