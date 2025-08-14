import server from './servers.js';
import info from './info.json' with { type: 'json' };

// paths
import user_guest_login from './paths/user/guest_login.json' with { type: 'json' };
import user_access_token from './paths/user/access_token.json' with { type: 'json' };
import user_get_user_info from './paths/user/get_user_info.json' with { type: 'json' };
import user_device_token from './paths/user/device_token.json' with { type: 'json' };
import user_get_user_by_email from './paths/user/get_user_by_email.json' with { type: 'json' };
import user_personal_notifs from './paths/user/personal_notifs.json' with { type: 'json' };
import user_update_notif_prefs from './paths/user/update_notif_prefs.json' with { type: 'json' };
import user_get_user_id from './paths/user/get_user_id.json' with { type: 'json' };
import user_bug_fix from './paths/user/bug_fix.json' with { type: 'json' };

// schemas
import user_schema from './paths/schemas/user_schema.json' with { type: 'json' };
import device_token_schema from './paths/schemas/device_token_schema.json' with { type: 'json' };
import notification_prefs_schema from './paths/schemas/notification_prefs_schema.json' with { type: 'json' };
import security_header_auth_schema from './paths/schemas/securityHeaderAuthSchema.json' with { type: 'json' };
import security_header_key_schema from './paths/schemas/securityHeaderKeySchema.json' with { type: 'json' };

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
};

export default openAPI;