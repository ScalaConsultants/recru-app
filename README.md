# Recruitment App

Built on top of the awesome isomorphic [Este.js](https://github.com/steida/este) dev stack.
The app is used for recruitment of talented developers here at [Scalac](https://scalac.io).

We are currently [hiring](https://www.scalac.io/join_us) all kinds of talented remote developers.

## Prerequisites

Install [node.js](http://nodejs.org) and npm.

## Start Development


- run `npm run start`
- point your browser to [localhost:8000](http://localhost:8000)

## Dev Tasks

- `npm run start` run app in development mode
- `npm run start:production` run app in production mode
- `npm test` run lint and test if build generates correctly
- `npm run lint` run eslint

## CI Tasks

- `npm start` just run app, remember to set NODE_ENV=production and other environment variables.
- `npm run build` builds for production.

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

Developed by [Scalac](https://scalac.io/?utm_source=scalac_github&utm_campaign=scalac1&utm_medium=web)
