import FetchMock from "fetch-mock";
import Hue, {NUPNP_ADDRESS} from "services/hue";



describe("Hue.connect", () => {
  const KNOWN_ID = "known_id";
  const bridgeList = [
    {
      "id": KNOWN_ID,
      "internalipaddress": "0.0.0.0"
    }
  ];

  it("should create an instance of Hue", () => {
    return Hue.connect("0.0.0.0").should.eventually.be.instanceof(Hue);
  });

  it("should only allow IPs or known IDs", () => {
    FetchMock.mock(NUPNP_ADDRESS, bridgeList);

    return Promise.all([
      Hue.connect("0.0.0.0").should.eventually.be.instanceof(Hue),
      Hue.connect("randomstring").should.be.rejected,
      Hue.connect(KNOWN_ID).should.not.be.rejected
    ]);
  });
});
