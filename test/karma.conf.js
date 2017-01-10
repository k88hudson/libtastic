module.exports = function(config) {
  config.set({
    singleRun: true,
    browsers: ["Firefox"],
    frameworks: ["mocha"],
    files: ["./unit/**/*.test.js"],

    // Applies webpack to the test files, so they can use "require"
    preprocessors: {"./unit/**/*.test.js": ["webpack"]},

    // This hides some overly verbose output from the console
    webpackMiddleware: {noInfo: true}
  });
};
