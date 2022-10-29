const joi = require("joi");
const employe = require("../model/employe");

const payload = {
  body: joi.object().keys({
    name: joi.string().min(3).max(5).required(),
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
  body.employeId = "ffg8546982";
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
