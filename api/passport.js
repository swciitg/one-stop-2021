const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const controllers = require('./controllers');
const { routes } = require('./routes');
const User = require('./models/user')

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since currently we do not
//   have a database of user records, the complete Microsoft graph profile is
//   serialized and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user.id);
  //console.log(user.id)
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

// Use the MicrosoftStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and 37signals
//   profile), and invoke a callback with a user object.
passport.use(
  new MicrosoftStrategy(
    {
      clientID: '67fccaed-9bdc-4258-b340-b1ca2fe87922',
      clientSecret: '2pI7Q~UAF8nC_1v3SldyVT3-L_l5I6fW2RvBF',
      authorizationURL: `https://login.microsoftonline.com/${'850aa78d-94e1-4bc6-9cf3-8c11b530701c'}/oauth2/v2.0/authorize`,
      tokenURL: `https://login.microsoftonline.com/${'850aa78d-94e1-4bc6-9cf3-8c11b530701c'}/oauth2/v2.0/token`,
      callbackURL: `http://localhost:3000/api/v0${routes.microsoftCallback}`,
      scope: ['user.read'],
    },
    controllers.authController.microsoftLoginCallback,
  ),
);
