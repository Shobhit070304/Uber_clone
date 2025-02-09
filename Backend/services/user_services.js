const userModel = require("../models/user_model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("Missing required fields");
  }
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    throw new Error("User already exists");
  }

  const user = userModel.create({
    fullname: { firstname, lastname },
    email,
    password,
  });

  return user;
};
