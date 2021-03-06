// Simple route middleware to ensure user is authenticated.

/**
 * @description
 * Simple route middleware to ensure user is authenticated.
 * Use this route middleware on any resource that needs to be protected.
 * If the request is authenticated (typically via a persistent login session),
 * the request will proceed.
 * Otherwise, the user will be redirected to the login page.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect('/login');
};

module.exports = { ensureAuthenticated };
