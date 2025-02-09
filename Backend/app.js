const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./db/db");
const app = express();

const userRoutes = require("./routes/user_routes");
const captainRoutes = require("./routes/captain_routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to Backend!");
});
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
