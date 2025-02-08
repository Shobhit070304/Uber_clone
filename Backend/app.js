const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/db");
const app = express();

const userRoutes = require("./routes/user_routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to Backend!");
});
app.use("/users", userRoutes);

module.exports = app;
