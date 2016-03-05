import FetchMock from "fetch-mock";
import Hue, {
  errorDescriptor,
  LINK_BUTTON_NOT_PRESSED,
  INTERNAL_ERROR
} from "services/hue";


const EXAMPLE_USER = "exampleusername";
const API_ENDPOINT = "http://0.0.0.0/api";

let responses = [];

const mockSuccess = () => {
  responses.push([
    {
      "success": {
        "username": EXAMPLE_USER
      }
    }
  ]);
};

const mockError = () => {
  responses.push([{
    "error": {
      "type": LINK_BUTTON_NOT_PRESSED,
      "address": "",
      "description": errorDescriptor(LINK_BUTTON_NOT_PRESSED).summary
    }
  }]);
};

const mockFatalError = () => {
  responses.push([{
    "error": {
      "type": INTERNAL_ERROR,
      "address": "",
      "description": errorDescriptor(INTERNAL_ERROR).summary
    }
  }]);
};

describe("Hue.waitForConnection", () => {
  beforeEach(() => {
    responses = [];
    FetchMock.mock(API_ENDPOINT, () => {
      return responses.shift();
    });
  });

  it("should return a hue instance after a failed connection", () => {
    mockError();
    mockSuccess();
    let promise = Hue.waitForConnection("0.0.0.0", 3, 10)
      .should.eventually.be.instanceof(Hue);
    return promise;
  });

  it("should fail after maximum attempts", () => {
    mockError();
    mockError();
    return Hue.waitForConnection("0.0.0.0", 2, 10).should.be.rejected;
  });

  it("should fail immediately when not receiving a link button error", () => {
    mockFatalError();
    mockSuccess();
    return Hue.waitForConnection("0.0.0.0", 2, 10).should.be.rejected;
  });
});
