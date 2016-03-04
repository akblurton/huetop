import FetchMock from "fetch-mock";
import Hue, {NUPNP_ADDRESS} from "services/hue";

describe("Bridge Listing", () => {
  const bridgeList = [
    {
      "id": "0",
      "internalipaddress": "0.0.0.0"
    }
  ];

  it("should retrieve the bridges from the NUPNP url", () => {
    FetchMock.mock(NUPNP_ADDRESS, bridgeList);

    return Hue.bridges().should.become(bridgeList).then(() => {
      expect(FetchMock.called(NUPNP_ADDRESS)).to.be.true;
    });
  });

  it("should return an empty list of bridges on failure", () => {
    FetchMock.mock(NUPNP_ADDRESS, {
      "status": 500,
      "body": "{}"
    });
    return Hue.bridges().should.become([]);
  });

  it("should cache the list of bridges", () => {
    FetchMock.mock(NUPNP_ADDRESS, bridgeList);

    return Hue.bridges().should.become(bridgeList).then(() => {
      return Hue.bridges().should.become(bridgeList);
    })
    .then(() => {
      expect(FetchMock.calls(NUPNP_ADDRESS).length).to.equal(1);
    });
  });

  it("should only cache on success", () => {
    FetchMock.mock(NUPNP_ADDRESS, 500);
    return Hue.bridges().then(() => Hue.bridges()).then(() => {
      expect(FetchMock.calls(NUPNP_ADDRESS).length).to.be.equal(2);
    });
  });

});
