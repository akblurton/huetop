// Karma configuration
// Generated on Sun Feb 14 2016 13:35:16 GMT+0000 (GMT)

var webpack = require("./webpack.config.js")("test");

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    "basePath": "",


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    "frameworks": ["mocha", "chai", "chai-as-promised"],


    // list of files / patterns to load in the browser
    "files": [
      "test/**/*Spec.js"
    ],


    // list of files to exclude
    "exclude": [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    "preprocessors": {
      "test/**/*Spec.js": ["webpack", "sourcemap"]
    },

    "plugins": [
      require("karma-webpack"),
      require("karma-sourcemap-loader"),
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-chai-plugins"),
      require("karma-phantomjs-launcher"),
      require("karma-mocha-reporter"),
      require("karma-notify-reporter")
    ],

    "webpack": {
      "devtool" : "inline-source-map",
      "module": {
        "loaders": webpack.module.loaders
      },
      "resolve": webpack.resolve
    },

    webpackMiddleware: {
      "noInfo": true
    },


    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    "reporters": ["mocha", "notify"],

    "notifyReporter": {
      "reportEachFailure": false,
      "reportSuccess": true
    },


    // web server port
    "port": 9876,


    // enable / disable colors in the output (reporters and logs)
    "colors": true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    "logLevel": config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    "autoWatch": true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    "browsers": ["PhantomJS"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    "singleRun": false,

    // Concurrency level
    // how many browser should be started simultaneous
    "concurrency": Infinity
  });
};
