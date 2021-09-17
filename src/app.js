const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();
const imagesRouter = require("./images/images.router");

app.use("/images", imagesRouter);

module.exports = app;