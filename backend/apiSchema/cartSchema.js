const Joi = require('@hapi/joi');

// the required value the user must pass in the required field
module.exports.createCartSchema = Joi.object().keys({
   userCreds:Joi.object()

});
module.exports.createCartOrderSchema = Joi.object().keys({
    userCreds:Joi.object()
 
 });
module.exports.getCartByUserIdSchema = Joi.object().keys({
    id:Joi.string()
 });
 module.exports.getUserAddressSchema = Joi.object().keys({
    params:Joi.object()
 });
 
module.exports.getAllCartsSchema = Joi.object().keys({
    skip:Joi.string(),
    limit:Joi.string()
});

//fields are not set to required so user can update the fields they need too
module.exports.updateCartSchema = Joi.object().keys({
    products:Joi.array(),
})