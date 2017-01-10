/* Note: This is used to generate a pre-built file
   that exports a global for consumers of the library
   not using a bundler such as Webpack or browserify.

   If there is anything specific required here, such as
   node shims, externals, or loaders, you should definitely
   document this in a prominent place on your README. */

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
