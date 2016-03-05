import FetchMock from "fetch-mock";
import Hue, {
  Bridge,
  errorDescriptor,
  NUPNP_ADDRESS,
  LINK_BUTTON_NOT_PRESSED
} from "services/hue";


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
      .then(hue => {
        const last = FetchMock.lastCall(API_ENDPOINT);
        expect(last[1].body).to.be.ok;
        expect(JSON.parse(last[1].body)).to.include.keys([
          "devicetype"
        ]);
        expect(hue.error).to.not.be.ok;
        expect(hue.username).to.be.equal(EXAMPLE_USER);
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
        "type": LINK_BUTTON_NOT_PRESSED,
        "address": "",
        "description": errorDescriptor(LINK_BUTTON_NOT_PRESSED).summary
      }
    }]);

    return Hue.connect("0.0.0.0").should.be.rejected.then(e => {
      expect(e.type).to.be.equal(LINK_BUTTON_NOT_PRESSED);
    });
  });
});
