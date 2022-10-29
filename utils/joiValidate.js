const joi = require("joi");

function joiValidate(schema, object) {
  const result = joi
    .compile(schema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (result.error)
    result.errorMessage = result.error.details
      .map((details) => details.message)
      .join(", ");

  return result;
}

module.exports = joiValidate;
