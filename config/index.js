const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");
const ApiError = require("../utils/ApiError");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    dataBase: Joi.string().required().description("sql db name"),
    user: Joi.string().required().description("sql user name"),
  })
  .unknown();

  const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: "key",
    },
  })
  .validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    dataBase: envVars.dataBase,
    user: envVars.user,
    port: envVars.PORT,
    password: envVars.password,
}