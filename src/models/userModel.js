const sequelize = require("../config/database");
const { DataTypes, where } = require("sequelize");
require("dotenv").config();

const Users = sequelize.define(
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

    phoneNoCountryCode1: {
      type: DataTypes.STRING(10),
    },
    phoneNumber1: {
      type: DataTypes.STRING(20),
    },
    phoneNoCountryCode2: {
      type: DataTypes.STRING(10),
    },
    phoneNumber2: {
      type: DataTypes.STRING(20),
    },

    position: {
      type: DataTypes.STRING(80),
    },
    department: {
      type: DataTypes.STRING(80),
    },

    countryId: {
      type: DataTypes.INTEGER,
    },
    countryName: {
      type: DataTypes.STRING(80),
    },
    stateId: {
      type: DataTypes.INTEGER,
    },
    stateName: {
      type: DataTypes.STRING(80),
    },
    cityId: {
      type: DataTypes.INTEGER,
    },
    cityName: {
      type: DataTypes.STRING(80),
    },

    profileImageName: {
      type: DataTypes.STRING(100),
    },
    profileImageUrl: {
      type: DataTypes.TEXT,
    },

    email: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.TEXT,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    interest: {
      type: DataTypes.TEXT,
    },
    address1: {
      type: DataTypes.TEXT,
    },
    address2: {
      type: DataTypes.TEXT,
    },

    companyName: {
      type: DataTypes.STRING(200),
    },

    pinCode: {
      type: DataTypes.STRING(20),
    },

    linkedIn: {
      type: DataTypes.TEXT,
    },
    website: {
      type: DataTypes.TEXT,
    },

    // flag for manual connection contact saved
    isManualConnectionUserFlag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0-no , 1-yes ",
    },

    totalConnectionCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "soft delete 1-delete",
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

module.exports = Users;
