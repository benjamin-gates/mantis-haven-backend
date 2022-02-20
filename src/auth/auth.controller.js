const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bcrypt = require("bcrypt");
const passport = require("passport");

// *** helpers *** //

function handleLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function handleResponse(res, code, statusMsg) {
  res.json({ status: code, message: statusMsg });
}

function loginRedirect(req, res, next) {
  if (req.user)
    return res.status(401).json({ status: "You are already logged in" });
  return next();
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: "Please log in" });
  return next();
}

function authenticateUser(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if(err){
      return next(err);
    }

    if(!user){
      return next({ status: 401, message: "Invalid credentials" });
    }
    return req.login(user, { session: true }, (error) => {
      if(error){
        return next(error);
      }
      return next();
    })
  })(req, res, next);
}

function setCookie(req, res, next) {
  // res.cookie('sessionID', req.session.id);
  next();
}

function login(req, res, next){
  // res.setHeader('Cookie', {sessionID: req.session.id});
  // console.log('req.user', req.user);
  res.cookie('user', 'req.user', {
    maxAge: 600000,
    httpOnly: true,
    sameSite: true
  });
  res.json({message: 'cookie created'});
}
function logout(req, res, next) {
  req.logout();
  res.render("/");
}

function getLogin(req, res, next) {
  res.render('login');
}

module.exports = {
  getLogin,
  postLogin: [loginRedirect, authenticateUser, setCookie, login],
  logout: [loginRequired, logout],
};
