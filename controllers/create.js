const joi = require("joi");
const logger = require("../logger");
const employe = require("../model/employe");
const alphanumeric = require("../utils/alphanumeric");

const payload = {
  body: joi.object().keys({
    name: joi.string().min(2).max(128).required(),
    email: joi.string().email().required(),
    // employeeId: joi.string().min(10).max(10).required(),
    mobile: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    gender: joi.string().valid("male", "female", "other").required(),
    age: joi.number().min(18).max(60).required(),
    anotherMobile: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional(),
  }),
};

async function handler({ body }) {
  const empModel = employe();
//   console.log(body);
  let sendObject = {};
  
  body.employeId = alphanumeric(10);

  logger.info( "employeId :: ", body.employeId)
  const data = await empModel.create(body);
//   console.log(data.dataValues);
  if (data && data.dataValues) {
    sendObject = data.dataValues;
  }
  sendObject.msg = "employe add successfully.";

  return sendObject;
}

module.exports = {
  payload,
  handler,
};
