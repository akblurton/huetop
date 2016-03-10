import FetchMock from "fetch-mock";
import Hue, {
  Bridge,
  ErrorTypes,
  NUPNP_ADDRESS
} from "services/hue";

import store from "store";


const EXAMPLE_USER = "exampleusername";
const API_ENDPOINT = "http://0.0.0.0/api";



describe("Hue.connect", () => {
  beforeEach(() => {
    FetchMock.mock(API_ENDPOINT, "POST", [
      {
        "success": {
          "username": EXAMPLE_USER
        }
      }
    ]);
  });

  const KNOWN_ID = "known_id";
  const bridgeList = [
    {
      "id": KNOWN_ID,
      "internalipaddress": "0.0.0.0"
    }
  ];

  it("should fetch a username", () => {
    return Hue.connect("0.0.0.0").should.eventually.be.instanceof(Bridge)
      .then(bridge => {
        const last = FetchMock.lastCall(API_ENDPOINT);
        expect(last[1].body).to.be.ok;
        expect(JSON.parse(last[1].body)).to.include.keys([
          "devicetype"
        ]);
        expect(bridge.error).to.not.be.ok;
        expect(bridge.username).to.be.equal(EXAMPLE_USER);
      });
  });

  it("should generate a devicetype", () => {
    return Hue.connect("0.0.0.0").then(() => {
      const last = FetchMock.lastCall(API_ENDPOINT)[1];
      const body = JSON.parse(last.body);
      expect(body.devicetype).to.match(/^HueTop\#[a-f0-9]+$/);
    });
  });

  it("should reuse a devicetype from localstorage", () => {
    return Promise.all([
      Hue.connect("0.0.0.0"),
      Hue.connect("0.0.0.0")
    ]).then(() => {
      const calls = FetchMock.calls(API_ENDPOINT);
      const body = JSON.parse(calls[0][1].body);
      const body2 = JSON.parse(calls[1][1].body);
      expect(body.devicetype).to.equal(body2.devicetype);
    });
  });

  it("should only allow IPs or known IDs", () => {
    FetchMock.mock(NUPNP_ADDRESS, bridgeList);

    return Promise.all([
      Hue.connect("0.0.0.0").should.eventually.be.instanceof(Bridge),
      Hue.connect("randomstring").should.be.rejected,
      Hue.connect(KNOWN_ID).should.eventually.be.instanceof(Bridge)
    ]);
  });

  it("should fail when the link button is not pressed", () => {
    FetchMock.restore();
    FetchMock.mock(API_ENDPOINT, "POST", [{
      "error": {
        "type": ErrorTypes.LINK_BUTTON_NOT_PRESSED,
        "address": "",
        "description": ErrorTypes.describe(
          ErrorTypes.LINK_BUTTON_NOT_PRESSED
        ).summary
      }
    }]);

    return Hue.connect("0.0.0.0").should.be.rejected.then(e => {
      expect(e.type).to.be.equal(ErrorTypes.LINK_BUTTON_NOT_PRESSED);
    });
  });

  it("should allow returning of JSON only", () => {
    Hue.jsonOnly(true);
    return Hue.connect("0.0.0.0").should.eventually.eql({
      "ip": "0.0.0.0",
      "username": EXAMPLE_USER
    });
  });
});
