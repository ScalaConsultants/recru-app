import React from 'react';
import App from './app/app.react';
import {measureRender} from './console';

// Never render to body. Everybody updates it.
// https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375
const app = document.getElementById('app');

measureRender(done => React.render(<App />, app, done));
