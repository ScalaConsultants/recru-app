import React from 'react';
import ReactDOM from 'react-dom';
import Application from './main.js';

// TODO: Add app storage example.
// import storage from 'redux-storage';

// Enabling ES7 `async/await` in browser:
if (process.env.IS_BROWSER) require('regenerator-runtime/runtime');

const app = document.getElementById('app');


ReactDOM.render(
  <Application/>,
  app,
  () => {
    // This is where state from local storage should be retrieved.
    // storage.createLoader(engine)(store);
  }
);
