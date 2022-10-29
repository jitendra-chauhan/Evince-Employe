const joi = require("joi");
const httpStatus = require("http-status");
const logger = require("../logger");
const employe = require("../model/employe");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");

const payload = {
  query: joi.object().keys({
    page: joi.number().min(1).optional(),
    limit: joi.number().min(1).optional(),
    filter: joi
      .string()
      .valid("name", "employeId", "email", "mobile", "age")
      .optional(),
    sorting: joi.boolean().optional(),
    sortingOrder: joi.string().valid("DESC", "ASC").optional(),
    search: joi.string().optional(),
  }),
};

async function handler({ query }) {
  const empModel = employe();
  const attributes = ["name", "employeId", "email", "mobile"];

  const { page, limit, sorting, search, filter, sortingOrder } = query;

  const whereQuery = {
    attributes,
  };



  if (page && limit) {
    const offset = (page - 1) * limit;
    whereQuery.offset = offset;
    whereQuery.limit = Number(limit);
  }
  if ((sorting || search) && !filter)
    new ApiError(httpStatus.BAD_REQUEST, "filter key is required");

  if (sorting) {
    if (!sortingOrder) sortingOrder = "DESC";

    whereQuery.order = [[filter, sortingOrder]];
  }

  if (search) {
    const where = {}
    where[`${filter}`] =
    {
      [Op.like]: `%${search}%`,
    };

    whereQuery.where = where;
  }

  logger.debug(whereQuery)
  const data = await empModel.findAll(whereQuery);
  logger.info(data);
  // if (data && data.dataValues) {
  //   sendObject = data.dataValues;
  // }
  data.msg = "employe list.";

  return data;
}

module.exports = {
  payload,
  handler,
};
