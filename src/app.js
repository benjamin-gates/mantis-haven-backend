const path = require("path");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const { v4: uuidv4 } = require('uuid');


require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
app.use(cors());
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    genid: function(req) {
        return uuidv4()
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay}
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const imagesRouter = require("./images/images.router");
const updatesRouter = require("./updates/updates.router");
const productsRouter = require("./products/products.router");
const usersRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
app.use("/auth", authRouter);
app.use("/images", imagesRouter);
app.use("/updates", updatesRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;