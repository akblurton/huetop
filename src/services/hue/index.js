export const NUPNP_ADDRESS = "https://www.meethue.com/api/nupnp";
export * from "./errors";

import fetch from "./fetch";

const IP_REGEX = /^\d{1,3}(\.\d{1,3}){3}$/;

class Hue {
  static _bridges = null;

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
    return new Promise((resolve, reject) => {
      // Potentially given an ID
      if (!IP_REGEX.test(ipOrId)) {
        Hue.bridges().then(results => {
          let bridge = results.find(bridge => bridge.id === ipOrId);
          if (bridge) {
            resolve(new Hue(bridge.internalipaddress));
          } else {
            throw Error("Invalid IP address/ID provided");
          }
        }).catch(reject);
      } else {
        resolve(new Hue(ipOrId));
      }
    });
  }

  constructor(ip) {
    if (!IP_REGEX.test(ip)) {
      throw Error("Invalid IP address provided");
    }

    this.ip = ip;
  }
}

export default Hue;
