import FetchMock from "fetch-mock";
import fetch from "services/hue/fetch";

import { ErrorTypes } from "services/hue";

describe("Hue fetch", () => {
  it("should handle HTTP status codes", () => {
    FetchMock.mock("test1", {});
    FetchMock.mock("test2", 500);
    FetchMock.mock("test3", 400);

    return Promise.all([
      fetch("test1").should.not.be.rejected,
      fetch("test2").should.be.rejected,
      fetch("test3").should.be.rejected
    ]);
  });

  it("should handle Hue API error responses", () => {
    FetchMock.mock("/api/", [{
      "error": {
        "type": ErrorTypes.UNAUTHORIZED_USER,
        "address": "</resource/parameteraddress>",
        "description": "<description>"
      }
    }]);

    return fetch("/api/").should.be.rejected;
  });
});
