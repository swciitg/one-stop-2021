const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic',
};

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send('Not allowed');
    }
    next();
  };
}

module.exports = {
  authRole,
  ROLE,
};
