const joi = require("joi");
const logger = require("../logger");
const employe = require("../model/employe");

const payload = {
  body: joi.object().keys({
    id: joi.string().required(),
    name: joi.string().min(3).max(5).optional(),
    email: joi.string().email().optional(),
    mobile: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional(),
    gender: joi.string().valid("male", "female", "other").optional(),
    age: joi.number().min(18).max(60).optional(),
    anotherMobile: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional(),
  }),
};

async function handler({ body }) {
  const empModel = employe();
  const update = {};
  const {name, age, mobile, gender, anotherMobile, email, id} = body;

  if(name) update.name = name;
  if(age) update.age = age;
  if(mobile) update.mobile = mobile;
  if(gender) update.gender = gender;
  if(anotherMobile) update.anotherMobile = anotherMobile;
  if(email) update.email = email;
  let sendObject = {};
  await empModel.update(update,{
    where: { id }
  });
 
  sendObject.msg = "employe info update successfully.";

  return sendObject;
}

module.exports = {
  payload,
  handler,
};
