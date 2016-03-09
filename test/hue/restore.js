import FetchMock from "fetch-mock";
import Hue, {
  Bridge,
  ErrorTypes
} from "services/hue";

const BRIDGE_IP = "0.0.0.0";
const USERNAME = "testusername";

describe("Hue.restore", () => {
  it("should create a new bridge instance on success", () => {
    FetchMock.mock(`http://${BRIDGE_IP}/api/${USERNAME}`, {

    });

    return Hue.restore(BRIDGE_IP, USERNAME).should.eventually.be.instanceOf(Bridge)
      .then(bridge => {
        expect(bridge.ip).to.equal(BRIDGE_IP);
        expect(bridge.username).to.equal(USERNAME);
      });
  });

  it("should fail on invalid username", () => {
    FetchMock.mock(`http://${BRIDGE_IP}/api/${USERNAME}`, [{
      "error": {
        "type": ErrorTypes.UNAUTHORIZED_USER,
        "description": ErrorTypes.describe(ErrorTypes.UNAUTHORIZED_USER)
      }
    }]);

    return Hue.restore(BRIDGE_IP, USERNAME).should.be.rejected;
  });
});
