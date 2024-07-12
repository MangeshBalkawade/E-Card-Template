const { Sequelize } = require("sequelize");
const { getDBConfig } = require("./dbconfig");
const dbConfig = getDBConfig();

const sequelize = new Sequelize(dbConfig);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  throw error; // Rethrow the error to handle it at a higher level if needed
}

module.exports = sequelize;
