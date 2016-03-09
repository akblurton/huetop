require("es6-promise").polyfill();
require("isomorphic-fetch");

import React from "react";
import { render } from "react-dom";
import App from "App";

import { Provider } from "react-redux";
import store from "data/store";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("App")
);
