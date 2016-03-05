import { Bridge } from "services/hue";
import FetchMock from "fetch-mock";

describe("Bridge Class", () => {
  const TEST_USER = "testusername";
  const IP = "0.0.0.0";
  let bridge = null;
  beforeEach(() => {
    bridge = new Bridge(IP, TEST_USER);
  });

  it("should use the correct api endpoint", () => {
    const url = `http://${IP}/api/${TEST_USER}/`;
    FetchMock.mock(url, 200);
    bridge.api("");
    expect(FetchMock.calls(url).length).to.be.equal(1);
  });
});
