const { check, validationResult } = require("express-validator");

// validation register
exports.registerRules = () => [
  check("name", "name is required").notEmpty(),
  check("lastName", "lastName is required").notEmpty(),
  check("email", "email is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters").isLength({
    min: 6,
  }),
];

// validation login
exports.loginRules = () => [
  check("email", "email is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6,
  }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};
