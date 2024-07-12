const sequelize = require("../config/database");
const { DataTypes, where } = require("sequelize");
require("dotenv").config();

const users = sequelize.define(
  "Users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(100),
    },
    // firstName
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // lastName
    lastName: {
      type: DataTypes.STRING(100),
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
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

users.sync({ alter: false });

module.exports = users;
