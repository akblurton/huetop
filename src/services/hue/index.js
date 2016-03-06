import uuid from "uuid";

import fetch from "./fetch";
import * as err from "./errors";

import Bridge, { IP_REGEX } from "./Bridge";

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
 * Prefix to send to "devicetype" argument when connecting to a bridge
 * @type {String}
 */
const APP_NAME = "HueTop";

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
   * Reset bridge list cache
   */
  static reset() {
    Hue._bridges = null;
  }

  /**
   * Retrieve a list of bridges from the UNPNP endpoint
   * @return {Promise}
   */
  static async bridges() {
    // Return cached list if available
    if (Hue._bridges !== null) {
      return Hue._bridges;
    }

    try {
      let result = await fetch(NUPNP_ADDRESS);
      return Hue._bridges = result;
    } catch (e) {
      return [];
    }
  }

  /**
   * Connect to a bridge with given IP address or ID
   * @param  {String} ipOrId IP address or ID of bridge to connect to
   * @return {Promise} Resolves to a Hue instance on success
   */
  static async connect(ipOrId) {
    /** Helper to create the Hue instance */
    const createHue = async function(ip) {
      let id = uuid.v4().split("-").join("");
      let result = await fetch(`http://${ip}/api`, {
        "method": "POST",
        "body": {
          "devicetype": `${APP_NAME}#${id}`
        }
      });
      // Grab username from result payload
      result = result[0];
      let {username} = result.success;
      return new Bridge(ip, username);
    };

    // Potentially given an ID
    if (!IP_REGEX.test(ipOrId)) {
      // Load up known bridges and then searcj for given ID
      let results = await Hue.bridges();
      let bridge = results.find(bridge => bridge.id === ipOrId);
      if (bridge) {
        // Create a hue instance using this hub's ip address
        return createHue(bridge.internalipaddress);
      } else {
        throw Error("Invalid IP address/ID provided");
      }
    } else {
      // Immediately try to connect when given an IP address
      return createHue(ipOrId);
    }
  }

  /**
   * Attempt to connect to a bridge over time, wait for the link button
   * @param  {String} ipOrId      IP address or ID of bridge to connect to
   * @param  {Number} maxAttempts Maximum number of tries before failing
   * @param  {Number} interval    Time (in MS) between attempts
   * @return {Promise}            Resolves to Hue instance on success
   */
  static async waitForConnection(
    ipOrId,
    maxAttempts = 3,
    interval = DEFAULT_CONNECTION_INTERVAL
  ) {
    const sleep = (ms = 0) => {
      return new Promise(r => setTimeout(r, ms));
    };

    for (let i = 1; i <= maxAttempts; i++) {
      try {
        return await Hue.connect(ipOrId);
      } catch (error) {
        if (
          error.type !== err.LINK_BUTTON_NOT_PRESSED ||
          i >= maxAttempts
        ) {
          throw error;
        } else {
          // Re-try after given interval
          await sleep(interval);
        }
      }
    }
  }
}

export default Hue;
export * from "./errors";
export {Bridge};
