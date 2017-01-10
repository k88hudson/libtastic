module.exports = function(config) {
  config.set({
    singleRun: true,
    browsers: ["Firefox"],
    frameworks: ["mocha", "chai"],
    files: [
      "../dist/libtastic.min.js",
      "./integration/browser.test.js"
    ]
  });
};
