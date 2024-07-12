// please add all the relationships here in this file

const sequelize = require("../config/database");
const { DataTypes, where } = require("sequelize");
require("dotenv").config();
const users = require("./userModel");

// users.hasOne(userAddress, { foreignKey: "userId" });
// users.hasMany(userInterests, { foreignKey: "userId" });

users.sync({ alter: false });
