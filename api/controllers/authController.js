const passport = require('passport');
const { writeResponse } = require('../helpers/response');
const User = require('../models/user')

const microsoftLogin = passport.authenticate('microsoft');

const microsoftLoginCallback = (accessToken, refreshToken, profile, done) => {
  // asynchronous verification, for effect...
  // To keep the things simple, the user's Microsoft Graph profile is returned to
  // represent the logged-in user. In a typical application, you would want
  // to associate the Microsoft account with a user record in your database,
  // and return that user instead.
  User.findOne({ microsoftid: profile.id }).then((currenUser) => {
    if (currenUser) {
      return done(null, currenUser);  //if user is alrady registered return user info
    }
    //else make a new entry in db
    else {
      new User({
        name: profile.displayName,
        microsoftid: profile.id,
        emailid: profile.emails[0].value
      }).save().then((newUser) => {
        return done(null, newUser);
      })  
    }
  })
};

const postMicrosoftLogin = (req, res) => {
  writeResponse(res, req.user);
};

module.exports = { microsoftLogin, microsoftLoginCallback, postMicrosoftLogin };
