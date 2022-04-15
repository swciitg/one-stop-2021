const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const controllers = require('./controllers');
const { routes } = require('./routes');
const User = require('./models/users');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since currently we do not
//   have a database of user records, the complete Microsoft graph profile is
//   serialized and deserialized.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Use the MicrosoftStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and 37signals
//   profile), and invoke a callback with a user object.
passport.use(
  new MicrosoftStrategy(
    {
	    clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      authorizationURL: `https://login.microsoftonline.com/${'850aa78d-94e1-4bc6-9cf3-8c11b530701c'}/oauth2/v2.0/authorize`,
      tokenURL: `https://login.microsoftonline.com/${'850aa78d-94e1-4bc6-9cf3-8c11b530701c'}/oauth2/v2.0/token`,
      callbackURL: `${process.env.OUTLOOK_CALLBACK}/api/v0${routes.microsoftCallback}`,
      scope: ['user.read'],
    },
    controllers.authController.microsoftLoginCallback,
  ),
);
