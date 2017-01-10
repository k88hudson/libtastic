module.exports = {
  entry: "./src/libtastic.js",
  output: {
    path: "./dist",
    filename: "libtastic.min.js",
    // exports entry file to a glboal variable
    libraryTarget: "var",
    // name of the global variable
    library: "Libtastic"
  }
};
