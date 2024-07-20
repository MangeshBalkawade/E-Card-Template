function getDBConfig() {
  const isProduction = process.env.NODE_ENV == "production";
  console.log(isProduction, process.env.NODE_ENV, "production value check");
  const isServerP = process.env.SERVER === "P";
  console.log(isServerP, process.env.SERVER, "production value check");

  const dbConfig = {
    host: process.env.DB_HOST,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    charset: process.env.CHARSET,
    dialect: "mysql",
  };

  if (isProduction) {
    dbConfig.database = isServerP ? process.env.DB : process.env.DEV_DB;
  } else {
    dbConfig.host = "localhost";
    dbConfig.username = "root";
    dbConfig.port = 3306;
    dbConfig.password = "";
    dbConfig.database = "ebusiness_dev";
  }

  return dbConfig;
}

module.exports = { getDBConfig };
