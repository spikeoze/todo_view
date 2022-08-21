const Joi = require("joi");

// validator
const registerValidator = Joi.object().keys({
  username: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const loginValidator = Joi.object().keys({
  username: Joi.string().max(30).required(),
  password: Joi.string().min(4).required(),
});

// use it for any route by passing any validator you defined as argument
const validatorMiddleware = (schemaValidator) => {
  return (req, res, next) => {
    const { error } = schemaValidator.validate(req.body);
    const valid = error == null; // false
    if (!valid) {
      res.status(422).json({
        message: `invalid request,${error.details.map((i) => i.message)} `, // mapping over the errors to get the messages only
        data: req.body,
      });
    } else {
      next();
    }
  };
};

module.exports = { registerValidator, validatorMiddleware, loginValidator };
