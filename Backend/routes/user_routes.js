const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authUser } = require("../middlewares/authMiddleware");
const userController = require("../controllers/user-controller");

// Register User
router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

// Login User
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

// Get User Profile
router.get("/profile", authUser, userController.getUserProfile);

// Logout User
router.get("/logout", authUser, userController.logoutUser);

module.exports = router;
