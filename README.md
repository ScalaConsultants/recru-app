# Recruitment App

Built on top of the ~~awesome~~ isomorphic [Este.js](https://github.com/steida/este) dev stack.
The app is used for recruitment of talented developers here at [Scalac](https://scalac.io).

We are currently [hiring](https://www.scalac.io/join_us) all kinds of talented remote developers.

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

## Start development

- run `gulp`
- point your browser to [localhost:8000](http://localhost:8000)

## Dev tasks

- `gulp` run app in development mode
- `gulp -p` run app in production mode
- `gulp test`

## CI tasks

- `npm start` just run app, remember to set NODE_ENV=production and other environment variables.
- `gulp build -p -b=[baseUri || '/'] -e=[apiEndpoint || '/api/v1/']` builds for production.
- `npm test` just alias for `gulp test`

## Production build

In order to build production version of an application run:

- `gulp build -p -b=[baseUri] -e=[apiEndpoint]`

where

- `-b` or `--baseUri` is a subdirectory where the app is being deployed, defaults to `/`
- `-e` or `--apiEndpoint` is the recru-app-backend URL for form submssions, defaults to `/api/v1/`.

- copy all files from `build` directory to the target location.

## Docker based development

#### Frontend with mocked backend

- `docker-compose up` 
