var Joi = require('joi');
 
var schema = {
    firstName: Joi.string().required().min(1),
    lastName: Joi.string().required().min(1),
    email: Joi.email().required()
};

var joiModel = require('joi-model');
 
export default joiModel(schema);