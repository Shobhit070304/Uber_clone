const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/db");
const app = express();

app.use(cors());
connectToDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to Backend!");
});

module.exports = app;
