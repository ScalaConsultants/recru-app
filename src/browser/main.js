import React from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {hot} from 'react-hot-loader/root';
import createEngine from 'redux-storage/engines/localStorage';
import createRoutes from './createRoutes';
import roles from './data/roles.json';

import configureStore from '../common/configureStore';

const engine = createEngine('este-app');
let initialState = window.__INITIAL_STATE__ || {};

const url = new URL(location.href);
const path = url.searchParams.get('role');
const role = path && roles.find(r => r.position.toLowerCase() === path);
if (path && role) {
  initialState = {
    ...initialState,
    screens: {
      ...initialState.screens,
      currentScreen: 2
    },
    candidate: {
      ...initialState.candidate,
      role: role
    }
  };
}
const store = configureStore({engine, initialState});
const routes = createRoutes();

const Application = () => (<Provider store={store}>
  <Router history={browserHistory}>
    {routes}
  </Router>
</Provider>);

export default process.env.NODE_ENV === 'production' ? Application : hot(Application);
