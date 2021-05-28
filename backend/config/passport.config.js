const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = require("./../model/user.model");

passport.use(
  new localStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Email is not registered!" });
        } else if (!user.verifyPassword(password)) {
          return done(null, false, { message: "Wrong password!" });
        } else {
          return done(null, user);
        }
      })
      .catch((err) => {
        return done(err);
      });
  })
);
