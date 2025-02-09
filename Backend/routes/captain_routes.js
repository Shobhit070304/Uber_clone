const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain-controller");
const { authCaptain } = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firstname must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("vechile.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters"),
    body("vechile.plate")
      .isLength({ min: 3 })
      .withMessage("CoPLatelor must be at least 3 characters"),
    body("vechile.capacity")
      .isLength({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vechile.vechileType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vechile type"),
  ],
  captainController.registerCaptain
);

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

router.get("/profile", authCaptain, captainController.getCaptainProfile);

router.get("/logout", authCaptain, captainController.logoutCaptain);

module.exports = router;
