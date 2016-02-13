var CONFIG = require("./webpack.config.js");

var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");

var compiler = webpack(CONFIG);
var server = new webpackDevServer(compiler, CONFIG.server);

server.listen(8000);

