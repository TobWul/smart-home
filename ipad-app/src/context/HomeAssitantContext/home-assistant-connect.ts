import {
  createConnection,
  subscribeEntities,
  HassEntities,
  ERR_HASS_HOST_REQUIRED,
  getAuth,
} from "home-assistant-js-websocket";

type CallbackFunction = (state: HassEntities) => void;

export async function connect(callback: CallbackFunction) {
  const hassUrl = "http://homeassistant.local:8123";
  let auth;
  try {
    // Try to pick up authentication after user logs in
    auth = await getAuth();
  } catch (err) {
    if (err === ERR_HASS_HOST_REQUIRED) {
      // Redirect user to log in on their instance
      auth = await getAuth({ hassUrl });
    } else {
      alert(`Unknown error: ${err}`);
      return;
    }
  }

  const connection = await createConnection({ auth });
  subscribeEntities(connection, callback);
  return auth.accessToken;
}
