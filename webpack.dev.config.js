var webpack = require("webpack");

module.exports = function(base) {
  return {
    "devtool": "inline-source-map",
    "plugins": [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
