const passport = require('passport');
const User = require('../models/users');
const { writeResponse } = require('../helpers/response');

const microsoftLogin = passport.authenticate('microsoft');

const microsoftLoginCallback = (accessToken, refreshToken, profile, done) => {
  User.findOne({ microsoftid: profile.id }).then((currenUser) => {
    if (currenUser) {
      return done(null, currenUser);
    }
    new User({
      name: profile.displayName,
      microsoftid: profile.id,
      emailid: profile.emails[0].value,
    }).save().then((newUser) => done(null, newUser));
  });
};

const postMicrosoftLogin = (req, res) => {
  writeResponse(res, req.user);
};

module.exports = { microsoftLogin, microsoftLoginCallback, postMicrosoftLogin };
