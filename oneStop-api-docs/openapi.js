const server = require('./servers.js');
const info = require('./info.json');

//paths
const user_guest_login = require('./paths/user/guest_login.json');
const user_access_token = require('./paths/user/access_token.json');
const user_get_user_info = require('./paths/user/get_user_info.json');
const user_device_token = require('./paths/user/device_token.json');
const user_get_user_by_email = require('./paths/user/get_user_by_email.json');
const user_personal_notifs = require('./paths/user/personal_notifs.json');
const user_update_notif_prefs = require('./paths/user/update_notif_prefs.json');
const user_get_user_id = require('./paths/user/get_user_id.json');
const user_bug_fix = require('./paths/user/bug_fix.json');

//schemas
const user_schema = require('./paths/schemas/user_schema.json');
const device_token_schema = require('./paths/schemas/device_token_schema.json');
const notification_prefs_schema = require('./paths/schemas/notification_prefs_schema.json');
const security_header_auth_schema = require('./paths/schemas/securityHeaderAuthSchema.json');
const security_header_key_schema = require('./paths/schemas/securityHeaderKeySchema.json');

const openAPI = {
  "openapi": "3.0.3",
  "info": info,
  "servers": server,
  "paths": {
    "/user/guest/login": user_guest_login,
    "/user/accesstoken": user_access_token,
    "/user": user_get_user_info,
    "/user/device-tokens": user_device_token,
    "/user/email/{email}": user_get_user_by_email,
    "/user/notifs": user_personal_notifs,
    "/user/notifs/prefs": user_update_notif_prefs,
    "/user/getUserId": user_get_user_id,
    "/user/bug-fix": user_bug_fix
  },
  "components": {
    "schemas": {
      "User": user_schema,
      "DeviceToken": device_token_schema,
      "NotificationPrefs": notification_prefs_schema,
      "SecurityHeaderAuth": security_header_auth_schema,
      "SecurityHeaderKey": security_header_key_schema
    }
  }
}

module.exports = openAPI;