const userModel = require("../models/user_model");
const userService = require("../services/user_services");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  const hashPassword = await userModel.hashPassword(password);
  try {
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = user.generateAuthToken();
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
