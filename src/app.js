const path = require("path");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const imagesRouter = require("./images/images.router");
const updatesRouter = require("./updates/updates.router");
const productsRouter = require("./products/products.router");
const usersRouter = require("./users/users.router");
app.use("/images", imagesRouter);
app.use("/updates", updatesRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;