const Joi = require("joi");

exports.signup = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required(),
});

exports.login = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
});
