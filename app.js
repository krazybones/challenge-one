const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

// Setting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "./config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import all routes
const countries = require("./routes/countries");

app.use("/api/v1", countries);

// Middleware to handle errors
app.use(errorMiddleware);
app.use(cors());

module.exports = app;
