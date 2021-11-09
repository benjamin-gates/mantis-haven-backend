const service = require("./auth.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bcrypt = require("bcrypt");

function propertiesExist(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: "A data property is required for this request",
    });
  } else if (!req.body.data.user_name) {
    next({ status: 400, message: "A user name is required for this request" });
  } else if (!req.body.data.password) {
    next({ status: 400, message: "A password is required for this request" });
  } else {
    next();
  }
}

async function userExists(req, res, next) {
  const { user_name } = req.body.data;
  const user = await service.readUser(user_name);
  if (!user) {
    next({
      status: 400,
      message: `The user name, ${user_name}, does not exist`,
    });
  } else {
    res.locals.user = user;
    next();
  }
}

async function correctPassword(req, res, next) {
  const { password } = req.body.data;
  const user = res.locals.user;
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    next();
  } else {
    next({ status: 400, message: `Incorrect password.` });
  }
}

function createSession(req, res, next) {
  const { user_name, password } = req.body.data;
  req.session.loggedin = true;
  req.session.username = user_name;
  res.sendStatus(200);
}

module.exports = {
  validateUser: [
    propertiesExist,
    asyncErrorBoundary(userExists),
    asyncErrorBoundary(correctPassword),
    createSession,
  ],
};
