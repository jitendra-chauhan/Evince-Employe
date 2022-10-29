const { DataTypes } = require("sequelize");
let employe = "";

function model(sequelize) {
  employe = sequelize.define("employes", {
    name: {
      type: DataTypes.STRING,
      validate: { len: [2, 10] },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING,
      validate: { isAlphanumeric: true, len: [10] },
      allowNull: false,
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      validate: { isIn: [["male", "female", "other"]] },
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: { max: 18, min: 60 },
      allowNull: false,
    },
    anotherMobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return employe;
}

module.exports = (s) => (employe !== "" ? employe : model(s));
