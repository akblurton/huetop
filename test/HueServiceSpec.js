require("es6-promise").polyfill();
import "isomorphic-fetch";

import FetchMock from "fetch-mock";
import Hue from "services/hue";

beforeEach(() => {
  FetchMock.restore();
  Hue.reset();
});

describe("Hue Service", () => {
  require("./hue/bridges");
});
