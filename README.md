# libtastic

![Travis status](https://travis-ci.org/k88hudson/libtastic.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/k88hudson/libtastic/badge.svg)](https://coveralls.io/github/k88hudson/libtastic)

This is an example of how to write and publish a JS library for node and the browser, including tests, publish scripts, and other stuff.

## Things you will need as a library author

- node 6+, npm 3+
- a Travis CI account
- the Travis cli (for encrypting your npm auth token)
- an npm account
- Coveralls account linked to your Github (if you want coverage reporting with Coveralls)

## What is supported?

This repo shows you how publish a library to npm that is usable in:

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

## How to publish a new version

### tdlr;

Just run `npm version [patch/minor/major]`. That's it.

### How this works

Use [npm version](https://docs.npmjs.com/cli/version). Enter `npm version patch` in your terminal for a new patch version, `npm version minor` for a minor version, etc. This will trigger the following:

1. Your tests will run (because of the `preversion` script defined in `package.json`)
2. Your `package.json` will be updated with the new version number and a git tag will be created.
3. Your code/tag will be pushed to `origin master`.  Note that if you normally push code to somewhere other than `origin master`, or if you don't want to automatically push, you should update the `postversion` script.
4. Your code/tag will be published to npm from Travis CI after the build is finished. Note that although they are gitignored, built assets in `dist/` WILL be published to npm because they are re-included in `.npmignore`.

## Travis CI

The Travis configuration in `.travis.yml` sets up a few things for CI:

- installs Firefox and runs the mocha and karma tests
- if a new tag was pushed, it will publish the new version to npm

In order to get this to work, you must do two things.

1. Turn on building for your repo on https://travis-ci.org, by signing in and flipping the switch, or by using the travis cli: `travis enable -r yourgithub/yourrepo`
2. Add a new email and encrypted api key to the `deploy` section of `.travis.yml` for npm publishing. You can find instructions for finding your key and encrypting it [here](https://docs.travis-ci.com/user/deployment/npm/). I usually create and authenticate a new single-purpose npm account (such as libtastic-publisher) for this publishing, but you can also just use your personal account.

## TODO
- A sample README with good basic documentation?
- explain limitations for es6 / webpack optimization
- es5 transpilation?
- coverage reporting
- linting
