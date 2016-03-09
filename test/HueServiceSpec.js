require("es6-promise").polyfill();
import "isomorphic-fetch";
import "babel-polyfill";
import store from "store";

import FetchMock from "fetch-mock";
import Hue from "services/hue";

afterEach(() => {
  store.clear();
  FetchMock.restore();
  Hue.reset();
});

describe("Hue Service", () => {
  require("./hue/fetch");
  require("./hue/bridges");
  require("./hue/connect");
  require("./hue/restore");
  require("./hue/waitForConnection");
  require("./hue/bridge");
});
