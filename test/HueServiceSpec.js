require("es6-promise").polyfill();
import "isomorphic-fetch";
import "babel-polyfill";

import FetchMock from "fetch-mock";
import Hue from "services/hue";

afterEach(() => {
  FetchMock.restore();
  Hue.reset();
});

describe("Hue Service", () => {
  require("./hue/fetch");
  require("./hue/bridges");
  require("./hue/connect");
  require("./hue/waitForConnection");
  require("./hue/bridge");
});
