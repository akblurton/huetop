export const NUPNP_ADDRESS = "https://www.meethue.com/api/nupnp";
export * from "./errors";

import fetch from "./fetch";

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
}

export default Hue;
