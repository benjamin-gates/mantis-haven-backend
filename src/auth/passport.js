const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const knex = require("../db/connection.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  knex("users")
    .where({ id })
    .first()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    // check to see if the username exists
    knex("users")
      .where({ username: username, password: password })
      .first()
      .then((user) => {
        if (!user) return done(null, false);
        return done(null, user);
      })
      .catch((err) => {
        return done(null, false, { message: err.message });
      });
  })
);

module.exports = passport;
