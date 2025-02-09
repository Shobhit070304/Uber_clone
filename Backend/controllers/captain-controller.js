const captainModel = require("../models/captain_model");
const captainService = require("../services/captain_services");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vechile } = req.body;
  const isCaptain = await captainModel.findOne({ email });
  if (isCaptain) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);
  try {
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vechile.color,
      plate: vechile.plate,
      capacity: vechile.capacity,
      vechileType: vechile.vechileType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ message: "Captain not found" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  try {
    const token = await captain.generateAuthToken();
    res.cookie("token", token);
    res.json({ token, captain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  const captain = await captainModel.findById(req.captain._id);
  res.json(captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token");
    console.log(token);

    await blackListTokenModel.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
