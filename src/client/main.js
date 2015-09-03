import React from 'react';
import App from './app/app.react';

const appContainer = document.getElementById('app');
const initialState = window._initialState;

React.render(<App initialState={initialState} />, appContainer);
