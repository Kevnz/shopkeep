var Joi = require('joi');
 
var schema = {
    name: Joi.string().required().min(1),
    category: Joi.string().required().min(1),
    key: Joi.string().required()
};

var joiModel = require('joi-model');
 
export default joiModel(schema);