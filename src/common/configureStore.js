import appReducer from './app/reducer';
import createLogger from 'redux-logger';
import fetch from './fetch';
import injectDependencies from './lib/injectDependencies';
import promiseMiddleware from 'redux-promise-middleware';
import stateToJS from './lib/stateToJS';
import validate from './validate';
import {applyMiddleware, compose, createStore} from 'redux';

const BROWSER_DEVELOPMENT = (
  process.env.NODE_ENV !== 'production' && // eslint-disable-line no-undef
  process.env.IS_BROWSER // eslint-disable-line no-undef
);

// TODO: Add example for browser/native storage.
// import storage from 'redux-storage';

export default function configureStore({deps, engine, initialState}) {

  // Inject services for actions.
  const dependenciesMiddleware = injectDependencies(
    {...deps, fetch},
    {validate}
  );

  let middleware = [
    dependenciesMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  // TODO: Add storage example.
  // if (engine) {
  //   // The order is important.
  //   engine = storage.decorators.filter(engine, [
  //     ['todos', 'list']
  //   ]);
  //   engine = storage.decorators.debounce(engine, 1500);
  //   middleware.push(storage.createMiddleware(engine));
  // }

  if (BROWSER_DEVELOPMENT) {
    const logger = createLogger({
      collapsed: true,
      stateTransformer: stateToJS
    });
    // Logger must be the last middleware in chain.
    middleware = [...middleware, logger];
  }

  const createReduxStore = (BROWSER_DEVELOPMENT && window.devToolsExtension) // eslint-disable-line no-undef
    ? compose(applyMiddleware(...middleware), window.devToolsExtension()) // eslint-disable-line no-undef
    : applyMiddleware(...middleware);

  const store = createReduxStore(createStore)(appReducer, initialState);

  // Enable hot reload where available.
  if (module.hot) { // eslint-disable-line no-undef
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => { // eslint-disable-line no-undef
      const nextAppReducer = require('./app/reducer'); // eslint-disable-line no-undef
      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
