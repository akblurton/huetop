/**
 * Regular expression to check for valid IP address
 * @type {RegExp}
 */
export const IP_REGEX = /^\d{1,3}(\.\d{1,3}){3}$/;

import fetch from "./fetch";

/** Represents a Hue bridge */
class Bridge {
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
   * Create a connected bridge instance
   * @param  {String} ip       IP address of bridge
   * @param  {String} username Username to use in API requests
   */
  constructor(ip, username) {
    if (!IP_REGEX.test(ip)) {
      throw Error("Invalid IP address provided");
    }

    this.ip = ip;
    this.username = username;
  }

  /**
   * Helper method to make api calls to a local bridge
   * @param  {String}    endpoint Endpoint to communicate to
   * @param  {Array}     ...args  remaining arguments
   * @return {Promise}
   */
  api(endpoint, ...args) {
    return fetch(`http://${this.ip}/api/${this.username}/${endpoint}`, ...args);
  }

  lights() {
    return this.api("lights");
  }
}

export default Bridge;
