const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authCaptain } = require("../middlewares/authMiddleware");
const captainController = require("../controllers/captain-controller");

// Register Captain
router.post(
  "/register",
  [
    body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("Firstname must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vechile.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vechile.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vechile.capacity")
      .isLength({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vechile.vechileType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vechile type"),
  ],
  captainController.registerCaptain
);

// Login Captain
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  captainController.loginCaptain
);

// Get Captain Profile
router.get("/profile", authCaptain, captainController.getCaptainProfile);

// Update Captain Profile
router.get("/logout", authCaptain, captainController.logoutCaptain);

module.exports = router;
