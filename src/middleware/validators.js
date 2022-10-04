const validator = require("validator");
const {} = require("../models");

exports.registerValidator = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && email && password === "") {
    return res.status(400).send({
      message: "field should not empty",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send({
      message: "invalid email address",
    });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).send({
      message: 'password not strong. Password must be minimum 8 Character and include lowercase, uppercase, numbers, symbols'
    });
  }
  next();
};
