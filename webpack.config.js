var webpack = require("webpack");

module.exports = {
  "devtool": "inline-source-map",
  "entry": [
    "webpack-dev-server/client?http://0.0.0.0:8000",
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ],
  "output": {
    path: __dirname + "/dist/",
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  "module": {
    "preLoaders": [
      {
        "test": /\.js$/,
        "loader": "eslint-loader",
        "exclude": /node_modules/
      }
    ],
    "loaders": [
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "loaders": [
          "react-hot",
          "babel-loader"
        ]
      }
    ]
  },
  "resolve": {
    root: [
      __dirname + "/src/"
    ]
  },
  "server": {
    "stats": {
      "colors": true
    },
    "hot": true,
    "publicPath": "/dist/"
  },
  "plugins": [
    new webpack.HotModuleReplacementPlugin()
  ]
};
