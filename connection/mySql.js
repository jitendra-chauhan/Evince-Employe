const sequelize = require("sequelize");
const employe = require("../model/employe");
const logger = require("../logger");
const config = require("../config");


const mySql = new sequelize(config.dataBase, config.user, config.password, {
  host: "localhost",
  dialect: "mysql",
});

mySql
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully! ");
  })
  .catch((error) => {
    logger.error("unble to connect", error);
  });

employe(mySql);
mySql
  .sync()
  .then(() => {
    logger.info("table created successfully!");
  })
  .catch((error) => {
    logger.error("Unable to create table : ", error);
  });
