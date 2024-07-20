// please add all the relationships here in this file
const sequelize = require("../config/database");
require("dotenv").config();

const Users = require("./userModel");
const OtpManagment = require("./otpManagmentModel");

OtpManagment.belongsTo(Users, {
  foreignKey: "userId",
  as: "userData",
});

// user belong to organization

Users.sync({ alter: false });
OtpManagment.sync({ alter: false });
