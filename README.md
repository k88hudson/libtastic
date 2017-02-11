# libtastic

[![Build Status](https://travis-ci.org/k88hudson/libtastic.svg?branch=master)](https://travis-ci.org/k88hudson/libtastic)
[![Coverage Status](https://coveralls.io/repos/github/k88hudson/libtastic/badge.svg)](https://coveralls.io/github/k88hudson/libtastic)

## What is this?

This is an example repository that demonstrates **how to to write and publish a JS library for Node and browsers**. You might find it useful as a scaffold or an example to work from if you are writing such a library and have questions about testing, automation, code quality, or how to distribute cross-compatible builds.

> Feedback: I feel like some of this stuff in this README can be helpful in CONTRIBUTING.md and other is good to know info. I imagine not a lot of people will read all of this right away.

I wrote this based on my my experience writing/maintaining a lot of small Javascript libraries for Mozilla, many of which are internal.

If you're a colleague (hi!) building something that doesn't need to be published to npm, requires more intensive functional testing, and/or you want to use Task Cluster for CI, you might consider taking a look at Standard8's [example-addon-repo](https://github.com/mozilla/example-addon-repo). It shares a lot of the same principles but is more specifically focused on add-on development, rather than cross-compatible JS libraries.

## What is supported?

This repo shows you how publish a library to npm that is usable in:

- node 6+, with `npm install` and `require`,
- a modern browser, with `npm install` and `require`, via a build system (e.g. Webpack or Browserify), or
- a modern browser via an optimized distributed build

> Maybe http://rollupjs.org/ will also be helpful for this

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

> Feedback: related for "Browser" usage / consumption. If the lib is installed via `npm` how do you add it to your project's static files? It would be good to clarify that.

## Some opinions, and where they are implemented in this repo

When you are publishing a library for Node and the browser, you should always consider the specific needs of your consumers. What version(s) should you support? How do you maintain backwards compatibility? What build systems are they likely to use? However, there are some things which I find are true most of the time:

### You should have unit tests.

You know this.

In this project, the unit tests are in the `test/unit/` directory. You run them with `npm test`.

### You should have CI for your unit tests that runs them in both node and the browser

Don't rely on your own memory of the differences between Node and the browser – running your tests in both environments makes sure they really do run in both environments.

In this project, `npm test` triggers a mocha test task AND a karma test task, which run in node and Firefox respectively. You should have a look at the `test/karma.conf.js` file for how test-running is set up for Firefox.

> Nit: anything to add about different versions of Node?

### Whenever possible, you should avoid requiring globally installed dependencies

> Yesss!!

Sometimes this isn't possible, but if you can, install dependencies AND dev dependencies (like mocha, karma, etc.) via npm with `--save`/`--save-dev` and use the npm scripts section of `package.json` to run tasks like test running, linting, etc. This makes it easier to use and work on your library and prevents unexpected version mismatches.

In this project, all tasks are defined as scripts in `package.json` and can be run by invoking `npm run [taskname]`.

> I hope devs know that deps with bins are in `node_modules/.bin`

### You should automate your publish process as much as possible

There are a few reasons for this. One, it helps prevent human error, like forgetting to publish a tag. Two, if helps decouple the publishing process from your own environment/authentication, which is especially helpful if you're working with a team.

You know this, of course – the trade off is that automating deploys is often time-consuming and complicated. For most JS libraries however, if you are using Travis CI and publishing to npm, it is really quite *simple*, and you should do it now.

In this project, you can publish by running the `npm version` task, which triggers an automated process of pushing a tag to Github and Travis publishing that tag to npm. See the `.travis.yml` file and the "More about publishing" section below for more details.

> This might be mentioned somewhere, but CHANGELOG.md or just CHANGELOG (especially automated) is really useful :)

### You should (probably) include coverage reporting

> Yeap!

There are a lot of (valid) opinions about how much test coverage matters, but regardless of what percentage you're targeting, test coverage reporting can actually reveal accidental bugs and help automatically remind new contributors to include tests with patches.

In this project, code is instrumented with instanbul, which generates local coverage reports in `coverage/` every time the mocha tests are run. On Travis, these coverage reports are sent to Coveralls, and reported back to Github. You should look at the `test:node` task for how istanbul is set up, and [this page](https://coveralls.io/github/k88hudson/libtastic) for an example of what Coveralls looks like.

> Also https://codecov.io/

### You should lint your code

Linting helps new contributors, catches some bugs, and makes code easier to read.

This project uses `eslint` for linting. You should take a look at the `.eslintignore` and `.eslintrc` files and the `test:lint` task in `package.json` if you want to learn more.


### You should include a pre-built file for browser JS users without module loaders or build tools

Not everyone uses a build tool or module loader for browser JS, such as Webpack, Browserify, etc. In addition, having a pre-built version available also makes it easy for someone to quickly prototype or create a test case in an online code sharing tool. For this reason, I like to distribute a pre-built, production-optimized version of my library, that exports the library as a global.

This project uses Webpack to generate a pre-built version, which is configured in `webpack.config.js` and triggered by the `npm run package` command defined in `package.json`. The actual asset is called `libtastic.min.js`, and is added to the `dist/` folder.

### You should not commit compiled dependencies

Not everyone agrees with this, but I'm personally not a fan of committing compiled dependencies – they make git histories harder to read and add a lot of noise. However, npm presents a solution for this – you can still include your built files in the published package even if they are in `.gitignore`, by explicitly excluding them in `.npmignore` with the `!` operator.

In this project, the `dist/` folder is gitignored (it gets generated if you run `npm run package`). I don't like to use the task name `build`, because `npm run build` can be easily confused with `npm build`, which already exists in the npm cli. Take a look at the `.npmignore` to see how it is excluded from ignoring, and don't forget to actually run your `npm run package` command before publishing in `.travis.yml`!

### You might want to consider integration tests

This project also includes an integration test, which can be found in `test/integration/`. It is configured in `karma.integration.config.js` and run with karma. What it does is load the pre-built file from the `dist/` directory into the browser, and ensures that the global variable `Libtastic` exists. This test ensures:

- The pre-built version of the browser actually exports a global variable
- We forget to run `npm run package` before publishing (the test fails if `npm run package` wasn't run first)

Overkill? Maybe. But it helps reassure me I didn't mess up by wepback export config or publishing flow.

## Things you will need as a library author

- node 6+, npm 3+
- a Travis CI account

> Circle CI can also be useful


- the Travis cli (for encrypting your npm auth token)
- an npm account
- Coveralls account linked to your Github (if you want coverage reporting with Coveralls)

## The source files

All source files related to the project should be placed in the `src/` directory. Remember two things here:

- you **must** change the `main` property in `package.json` to point to the entry point file of the library (in this case, `src/libtastic.js`)
- you **must** point the webpack configuration in `webpack.config.js` to the entry point file as well

## More about publishing

> Feedback: I use this sometimes: https://github.com/sindresorhus/np

### tdlr;

If you want to publish a new version, just run `npm version [patch/minor/major]`. That's it.


### How this works

Run `npm version patch` in your terminal for a new patch version, `npm version minor` for a minor version, etc. (see [npm version](https://docs.npmjs.com/cli/version)) This will trigger the following:

1. Your tests will run (because of the `preversion` script defined in `package.json`)
2. Your `package.json` will be updated with the new version number and a git tag will be created.
3. Your code/tag will be pushed to `origin master`.  Note that if you normally push code to somewhere other than `origin master`, or if you don't want to automatically push, you should update the `postversion` script.
4. Your code/tag will be published to npm from Travis CI after the build is finished. Note that although they are gitignored, built assets in `dist/` WILL be published to npm because they are re-included in `.npmignore`.

## How to set up all the required services for CI

The Travis configuration in `.travis.yml` sets up a few things for CI:

- installs Firefox and runs the mocha and karma tests
- reports coverage to Coveralls
- if a new tag was pushed, it will publish the new version to npm

In order to get this to work, you must do three things.

1. Turn on building for your repo on https://travis-ci.org, by signing in and flipping the switch, or by using the travis cli: `travis enable -r yourgithub/yourrepo`
2. Add a new email and encrypted api key to the `deploy` section of `.travis.yml` for npm publishing. You can find instructions for finding your key and encrypting it [here](https://docs.travis-ci.com/user/deployment/npm/). I usually create and authenticate a new single-purpose npm account (such as libtastic-publisher) for this publishing, but you can also just use your personal account.
3. If you want coverage reporting with Coveralls, you need to turn on reporting for your repo https://coveralls.io.


>>> This is a great start, it would be awesome to have this work similar to Yeoman generators!
>>> I think the main thing I would like to see from my feedback is the CHANGELOG automation.
