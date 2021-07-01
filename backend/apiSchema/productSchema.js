const Joi = require('@hapi/joi');

// the required value the user must pass in the required field
module.exports.createProductSchema = Joi.object().keys({
    name:Joi.string().required(),
    price:Joi.string().required(),
    description:Joi.string().required(),
});


module.exports.getAllProductsSchema = Joi.object().keys({
    skip:Joi.string(),
    limit:Joi.string()
});

//fields are not set to required so user can update the fields they need too
module.exports.updateProductSchema = Joi.object().keys({
    name:Joi.string()
})