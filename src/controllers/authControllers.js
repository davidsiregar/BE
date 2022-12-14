const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user } = require("../models");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 5);

    let insertUser = await user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).send({
      message: "register success",
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      status: false,
      message: error.message,
      data: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let getUser = await user.findOne({
      where: { email: req.body.email },
    });

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      getUser.dataValues.password
    );

    if (!isPasswordValid) {
      return res.status(400).send({
        message: "password invalid",
      });
    }

    const token = jwt.sign(
      {
        id: getUser.dataValues.id,
      },
      process.env.JWT_KEY,
      { expiresIn: 3600 }
    );

    return res.status(200).send({
      message: "login successfully",
      data: getUser.dataValues.email,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      status: false,
      message: error.message,
      data: null,
    });
  }
};
