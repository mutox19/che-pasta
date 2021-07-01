const Joi = require("@hapi/joi");
const constants = require("../constants");
//validate the schema
const validateObjectSchema = (data, schema) => {
  const result = Joi.validate(data, schema, { convert: false });
  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      return {
        error: value.message,
        path: value.path,
      };
    });
    return errorDetails;
  }
  return null;
  //console.log("error details ====", errorDetails);
};

//validate the body of the request that is sent
module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.body, schema);

    //if the validation fails
    if (error) {
      response.body = error;
      response.message = constants.requestValidationMessage.BAD_REQUEST;
      response.status = 400;
      //send response right from middleware without hitting controller
      return res.status(response.status).send(response);
    }
    return next();
  };
};

//validate the body of the request that is sent
module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.query, schema);

    //if the validation fails
    if (error) {
      response.body = error;
      response.message = constants.requestValidationMessage.BAD_REQUEST;
      //send response right from middleware without hitting controller
      return response.status(response.status).send(response);
    }
    return next();
  };
};
