# Recruitment App

Built on top of the awesome isomorphic [Este.js](https://github.com/steida/este) dev stack.

## Prerequisites

Install [node.js](http://nodejs.org).
Then install [gulp.js](http://gulpjs.com/).
```shell
npm install -g gulp
```

#### Windows

- Install Python - Install version 2.7 of Python and add it to your path or/and create a PYTHONPATH environment variable.
- Install Visual Studio (Express Edition is fine) - We will need this for some of modules that are compiled when we are installing Este. [Download VS Express](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx), get one of the versions that has C++ - Express 2013 for Windows Desktop for example.
- Set Visual Studio Version Flags - We need to tell node-gyp (something that is used for compiling addons) what version of Visual Studio we want to compile with. You can do this either through an environment variable GYP_MSVS_VERSION. If you are using Express, you have to say GYP_MSVS_VERSION=2013e.

## Start Development

- run `gulp`
- point your browser to [localhost:8000](http://localhost:8000)

## Dev Tasks

- `gulp` run app in development mode
- `gulp -p` run app in production mode
- `gulp test`

## CI Tasks

- `npm start` just run app, remember to set NODE_ENV=production and other environment variables.
- `gulp build -p` builds for production.
- `npm test` just alias for `gulp test`

### Note on production builds

Currently Este.js doesn't support [part-of-framework deployment](https://gist.github.com/mareksuscak/49626aeee0363b5ab77d) and although I've done some changes so that it's possible to build & deploy to a server subfolder (by injecting baseUri env. variable when running `npm start`) [index.html is not being generated](https://github.com/ScalaConsultants/recru-app/issues/20) as part of the build therefore in order to perform a successfull deploy, three steps are required:

- `gulp build -p` builds assets for production.
- copy `build` and `assets` folders to the target location.
- `NODE_ENV=production app__baseUri="/join_us/" app__apiEndpoint="https://recru-app-backend.scalac.io:20080" npm start` runs the app in production mode in a subfolder so you can copy&paste the contents of served index.html to a target location.

## FAQ

### Why can't we hook this up to the CI server?

Because este.js which was chosen as an underlying framework doesn't support this kind of deployment. Este application are usually deployed as node.js server side apps. We could add this kind of deployment to the build pipeline but it would take some time.

### How to change the API endpoint?

Open `index.html` file and look for the `script` section where `_appState` is stored. It should contain `apiEndpoint` property - this is what you need to modify.
