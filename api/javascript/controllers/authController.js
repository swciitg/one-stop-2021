const passport = require('passport');
const { writeResponse } = require('../helpers/response');

const microsoftLogin = passport.authenticate('microsoft');

const microsoftLoginCallback = (accessToken, refreshToken, profile, done) => {
  // asynchronous verification, for effect...
  // To keep the things simple, the user's Microsoft Graph profile is returned to
  // represent the logged-in user. In a typical application, you would want
  // to associate the Microsoft account with a user record in your database,
  // and return that user instead.
  process.nextTick(() => done(null, profile));
};

const postMicrosoftLogin = (req, res) => {
  writeResponse(res, req.user);
};

module.exports = { microsoftLogin, microsoftLoginCallback, postMicrosoftLogin };
