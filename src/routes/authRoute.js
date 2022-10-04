const path = require("path");

const express = require("express");
const authControllers = require("../controllers/authControllers");
const useValidator = require("../middleware/validators");
const router = express.Router();
const User = require("../models/user");

router.post(
  "/register",
  useValidator.registerValidator,
  authControllers.register
);
router.post("/login", authControllers.login);

module.exports = router;
