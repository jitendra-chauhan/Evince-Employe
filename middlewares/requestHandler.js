const httpStatus = require("http-status");
const pick = require("../utils/pick");
const joiValidate = require("../utils/joiValidate");
const ApiError = require("../utils/ApiError");
const logger = require("../logger");

const handleAPICall = (controller) => async (req, res, next) => {
  try {
    if (controller.payload) {
      const validSchema = pick(controller.payload, ["params", "query", "body"]);
      const object = pick(req, Object.keys(validSchema));

      const { value, error, errorMessage } = joiValidate(validSchema, object);
      let stack = "";
      
      if (error)
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage, stack));
    }
    if (controller.handler) {
      let response = await controller.handler(req, res);
      let sendData = {
        statusCode: 200,
        message: "success",
        data: response,
      };
      if (response.msg) {
        sendData.message = response.msg;
        delete sendData.data.msg;
        // delete response;
      }
      res.send(sendData);
    } else {
      next();
    }
  } catch (err) {
    logger.error("err.toString() : ", err);
    next(
      err instanceof ApiError
        ? err
        : new ApiError(httpStatus.BAD_REQUEST, err.toString())
    );
  }
};

module.exports = handleAPICall;
