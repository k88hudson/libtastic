# libtastic

![Travis status](https://travis-ci.org/k88hudson/libtastic.svg?branch=master)

This is an example of how to write and publish a JS library for node and the browser, including tests, publish scripts, and an example for use during development.

## What is supported by this library?

This library is designed to be usable in:

- node 6+, with `npm install` and `require`,
- a modern browser, with `npm install` and `require`, via a build system (e.g. Webpack or Browserify), or
- a modern browser via an optimized distributed build

Here are some examples for each use case:

### Node/Webpack/Browserify
```js
// Install
npm install libtastic --save

// Usage
const Libtastic = require("libtastic");
new Libtastic();
```

### Browser
```html
<!-- First, download the minified file from the dist/ directory -->
<script src="libtastic.min.js"></script>
<script>
// Libtastic will be available as a global
new Libtastic();
</script>
```

## The source files

All source files related to the project should be placed in the `src/` directory. Remember two things here:

- you **must** change the `main` property in `package.json` to point to the entry point file of the library (in this case, `src/libtastic.js`)
- you **must** point the webpack configuration in `webpack.config.js` to the entry point file as well

## Tests

There two kinds of tests included. Both use `mocha` and `chai` for test definitions/assertions.

1. Unit tests in `test/unit/`, which are run with `mocha` for node, and `karma` for the browser.
2. An integration test in `test/integration/browser.test.js` to make sure the minified browser distribution (i.e. `dist/libtastic.min.js`) was built correctly. This is also run with karma.

All the tests can be run with `npm test`, and are called from commands in `package.json`.
