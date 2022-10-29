const sequelize = require("sequelize");
const employe = require("../model/employe");

const mySql = new sequelize("company", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

mySql
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully! ");
  })
  .catch((error) => {
    console.error("unble to connect", error);
  });

employe(mySql);
mySql
  .sync()
  .then(() => {
    console.log("table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
