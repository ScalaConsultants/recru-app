import React from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {hot} from 'react-hot-loader/root';
import createEngine from 'redux-storage/engines/localStorage';
import createRoutes from './createRoutes';

import configureStore from '../common/configureStore';

const engine = createEngine('este-app');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({engine, initialState});
const routes = createRoutes();

const Application = () => (<Provider store={store}>
  <Router history={browserHistory}>
    {routes}
  </Router>
</Provider>);

export default process.env.NODE_ENV === 'production' ? Application : hot(Application);
