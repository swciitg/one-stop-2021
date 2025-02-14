// Global
const HOME = '/';

// Users

const GREETINGS = '/hello/:name';
const USERS = '/users';

// Microsoft

const MICROSOFT = '/auth/microsoft';
const MICROSOFT_CALLBACK = '/auth/microsoft/callback';

const routes = {
  home: HOME,
  users: USERS,
  greeting: GREETINGS,
  microsoft: MICROSOFT,
  microsoftCallback: MICROSOFT_CALLBACK,
};

module.exports = { routes };