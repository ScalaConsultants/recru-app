import App from './app/App.react';
import React from 'react';
import Screens from './screens/Page';
import NotFound from './notfound/Page.react';
import {IndexRoute, Route} from 'react-router';

export default function createRoutes(getState) {

  return (
    <Route component={App} path="/">
      <IndexRoute component={Screens} />
      <Route component={NotFound} path="*" />
    </Route>
  );

}
