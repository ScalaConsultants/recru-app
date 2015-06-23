import App from './app/app.react';
import Home from './pages/home.react';
import NotFound from './pages/notfound.react';
import React from 'react';
import {appState} from './state';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path={appState.get().getIn(['environment', 'baseUri'])}>
    <DefaultRoute handler={Home} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />
  </Route>
);
