import React from 'react';
import App from './app/app.react';

const appContainer = document.getElementById('app');
const appState = window._appState;

React.render(<App initialState={appState} />, appContainer);
