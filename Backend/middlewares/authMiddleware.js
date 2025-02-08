const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistToken = require("../models/blacklistToken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const isblacklisted = await blacklistToken.findOne({ token });

  if (isblacklisted) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
