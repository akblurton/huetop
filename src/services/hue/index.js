export * from "./errors";

import fetch from "./fetch";

export const NUPNP_ADDRESS = "https://www.meethue.com/api/nupnp";
export const DEFAULT_CONNECTION_INTERVAL = 3000;

const IP_REGEX = /^\d{1,3}(\.\d{1,3}){3}$/;
const APP_NAME = "HueTop";

const api = (hue, endpoint, ...args) => (
  fetch(`http://${hue.ip}/api${endpoint}`, ...args)
);

class Hue {
  static _bridges = null;

  error = null;
  ip = null;
  username = null;

  static reset() {
    Hue._bridges = null;
  }

  static bridges() {
    if (Hue._bridges !== null) {
      return Promise.resolve(Hue._bridges);
    }

    return fetch(NUPNP_ADDRESS)
      .then(result => {
        return Hue._bridges = result;
      })
      .catch(() => []);
  }

  static connect(ipOrId) {
    const createHue = ip => {
      return api({ip}, "", {
        "method": "POST",
        "body": {
          "devicetype": `${APP_NAME}#something`
        }
      })
      .then(result => {
        result = result[0];
        let {username} = result.success;
        return new Hue(ip, username);
      })
      .catch(e => {
        throw e;
      });
    };

    return new Promise((resolve, reject) => {
      // Potentially given an ID
      if (!IP_REGEX.test(ipOrId)) {
        Hue.bridges().then(results => {
          let bridge = results.find(bridge => bridge.id === ipOrId);
          if (bridge) {
            resolve(createHue(bridge.internalipaddress));
          } else {
            throw Error("Invalid IP address/ID provided");
          }
        }).catch(reject);
      } else {
        resolve(createHue(ipOrId));
      }
    });
  }

  static waitForConnection(
    ip,
    maxAttempts = 3,
    interval = DEFAULT_CONNECTION_INTERVAL
  ) {
    let attempts = 0;
    return new Promise((resolve, reject) => {
      const attempt = () => {
        Hue.connect(ip).then(resolve).catch(error => {
          attempts++;
          if (attempts >= maxAttempts) {
            reject(error);
          } else {
            setTimeout(attempt, interval);
          }
        });
      };
      attempt();
    });
  }

  constructor(ip, username) {
    if (!IP_REGEX.test(ip)) {
      throw Error("Invalid IP address provided");
    }

    this.ip = ip;
    this.username = username;
  }
}

export default Hue;
