const captainModel = require("../models/captain_model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vechileType
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vechileType
  ) {
    throw new Error("Missing required fields");
  }
  const isCaptain = await captainModel.findOne({ email });
  if (isCaptain) {
    throw new Error("Captain already exists");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vechile: {
      color,
      plate,
      capacity,
      vechileType,
    },
  });
  return captain;
};
