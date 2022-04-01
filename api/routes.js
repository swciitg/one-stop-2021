// Global
const HOME = '/';

// Users

const GREETINGS = '/hello/:name';
const USERS = '/users';

// Microsoft

const MICROSOFT = '/auth/microsoft';
const MICROSOFT_CALLBACK = '/auth/microsoft/callback';

//Email

const EMAIL = '/email/send'

//CRUD

const CREATE_CONTACT = '/contact/create'
const UPDATE_CONTACT = '/contact/update/:id'
const DELETE_CONTACT = '/contact/delete/:id'

const routes = {
  home             : HOME,
  users            : USERS,
  greeting         : GREETINGS,
  microsoft        : MICROSOFT,
  microsoftCallback: MICROSOFT_CALLBACK,
  email            : EMAIL,
  createContact    : CREATE_CONTACT,
  updateContact    : UPDATE_CONTACT,
  deleteContact    : DELETE_CONTACT
};

module.exports = { routes };
