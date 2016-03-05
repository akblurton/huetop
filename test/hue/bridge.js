import { Bridge } from "services/hue";
import FetchMock from "fetch-mock";

import {
  LIGHTS
} from "./responses.js";

describe("Bridge Class", () => {
  const TEST_USER = "testusername";
  const IP = "0.0.0.0";
  let bridge = null;
  beforeEach(() => {
    bridge = new Bridge(IP, TEST_USER);
  });

  it("should use the correct api endpoint", () => {
    const url = `http://${IP}/api/${TEST_USER}/`;
    FetchMock.mock(url, {});
    bridge.api("");
    expect(FetchMock.calls(url).length).to.be.equal(1);
  });

  it("should fetch a list of lights", () => {
    const url = `http://${IP}/api/${TEST_USER}/lights`;
    FetchMock.mock(url, "GET", LIGHTS);
    return bridge.lights().should.eventually.be.eql(LIGHTS).then(() => {
      expect(FetchMock.calls(url).length).to.be.equal(1);
    });
  });
});
