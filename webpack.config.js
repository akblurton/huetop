const AVAILABLE_ENV = ["dev", "stage", "prod"];
const DEFAULT_ENV = "dev";

module.exports = function(env) {
  const BASE = {
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
    }
  };

  env = AVAILABLE_ENV.indexOf(env) > -1 ? env : DEFAULT_ENV;
  var envSettings = {}, file = `./webpack.${env}.config.js`;
  try {
    envSettings = require(file);
  } catch(e) {
    console.warn(`Could not load "${file}"`);
  }

  return Object.assign({}, BASE, envSettings);
};
