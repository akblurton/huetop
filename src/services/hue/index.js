export * from "./errors";

import fetch from "./fetch";
import * as err from "./errors";

/**
 * Official Hue NUPNP url to fetch connected bridges
 * @type {String}
 */
export const NUPNP_ADDRESS = "https://www.meethue.com/api/nupnp";
/**
 * Default time (in ms) between connection attempts in waitForConnection
 * @type {Number}
 */
export const DEFAULT_CONNECTION_INTERVAL = 3000;

/**
 * Regular expression to check for valid IP address
 * @type {RegExp}
 */
const IP_REGEX = /^\d{1,3}(\.\d{1,3}){3}$/;
/**
 * Prefix to send to "devicetype" argument when connecting to a bridge
 * @type {String}
 */
const APP_NAME = "HueTop";

/**
 * Helper method to make api calls to a local bridge
 * @param  {Object}    hue      Hue instance or object containing IP address
 * @param  {String}    endpoint Endpoint to communicate to
 * @param  {Array}     ...args  remaining arguments
 * @return {Promise}
 */
const api = (hue, endpoint, ...args) => (
  fetch(`http://${hue.ip}/api${endpoint}`, ...args)
);

/**
 * Represents a connected bridge
 * Provides helper methods for bridge scanning and connecting
 */
class Hue {
  /**
   * Cached list of bridges
   * @type {Array}
   */
  static _bridges = null;

  /**
   * IP address of this bridge
   * @type {String}
   */
  ip = null;
  /**
   * Username to use for api calls
   * @type {[type]}
   */
  username = null;

  /**
   * Reset bridge list cache
   */
  static reset() {
    Hue._bridges = null;
  }

  /**
   * Retrieve a list of bridges from the UNPNP endpoint
   * @return {Promise}
   */
  static bridges() {
    // Return cached list if available
    if (Hue._bridges !== null) {
      return Promise.resolve(Hue._bridges);
    }

    // Otherwise fire off a fetch request
    return fetch(NUPNP_ADDRESS)
      .then(result => {
        // Assign cache as we return the result
        return Hue._bridges = result;
      })
      .catch(() => []);
  }

  /**
   * Connect to a bridge with given IP address or ID
   * @param  {String} ipOrId IP address or ID of bridge to connect to
   * @return {Promise} Resolves to a Hue instance on success
   */
  static connect(ipOrId) {
    /** Helper to create the Hue instance */
    const createHue = ip => {
      return api({ip}, "", {
        "method": "POST",
        "body": {
          "devicetype": `${APP_NAME}#something`
        }
      })
      .then(result => {
        // Grab username from result payload
        result = result[0];
        let {username} = result.success;
        return new Hue(ip, username);
      })
      .catch(e => {
        // Throw any errors given to us
        throw e;
      });
    };

    return new Promise((resolve, reject) => {
      // Potentially given an ID
      if (!IP_REGEX.test(ipOrId)) {
        // Load up known bridges and then searcj for given ID
        Hue.bridges().then(results => {
          let bridge = results.find(bridge => bridge.id === ipOrId);
          if (bridge) {
            // Create a hue instance using this hub's ip address
            resolve(createHue(bridge.internalipaddress));
          } else {
            throw Error("Invalid IP address/ID provided");
          }
        }).catch(reject);
      } else {
        // Immediately try to connect when given an IP address
        resolve(createHue(ipOrId));
      }
    });
  }

  static waitForConnection(
    ipOrId,
    maxAttempts = 3,
    interval = DEFAULT_CONNECTION_INTERVAL
  ) {
    let attempts = 0;
    return new Promise((resolve, reject) => {
      const attempt = () => {
        // Attempt connection to given ip or ID, instantly resolve on success
        Hue.connect(ipOrId).then(resolve).catch(error => {
          // On failure, increment our attempts and check if we have
          // exceeded them, or are receiving an unknown error
          attempts++;
          if (
            error.type !== err.LINK_BUTTON_NOT_PRESSED ||
            attempts >= maxAttempts
          ) {
            reject(error);
          } else {
            // Re-try after given interval
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
