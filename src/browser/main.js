import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import configureStore from '../common/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import {Provider} from 'react-redux';
import _obj from 'lodash/object';

// TODO: Add app storage example.
// import storage from 'redux-storage';

// Enabling ES7 `async/await` in browser:
if (process.env.IS_BROWSER) require('regenerator/runtime');

const app = document.getElementById('app');
const engine = createEngine('este-app');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({engine, initialState});
const routes = createRoutes(store.getState);

// fix for S3 redirect problem
// http://stackoverflow.com/questions/16267339/s3-static-website-hosting-route-all-paths-to-index-html/34958026#34958026
const history = useRouterHistory(createBrowserHistory)({queryKey: false, basename: _obj.get(store.getState(), 'config.baseUri', '/')});
history.listen((location) => {
  const path = (/#(\/.*)$/.exec(location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  app,
  () => {
    // This is where state from local storage should be retrieved.
    // storage.createLoader(engine)(store);
  }
);
