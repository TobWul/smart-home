// Example connect code
import {
  getAuth,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
  HassEntities,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";

type CallbackFunction = (state: HassEntities) => void;

export async function connect(callback: CallbackFunction) {
  const hassUrl = "http://homeassistant.local:8123";
  let auth;
  try {
    // Try to pick up authentication after user logs in
    if (process.env.NODE_ENV === "development") {
      auth = createLongLivedTokenAuth(
        hassUrl,
        process.env.NEXT_PUBLIC_HOME_ASSISTANT_TOKEN,
      );
    } else {
      auth = await getAuth();
    }
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
}
