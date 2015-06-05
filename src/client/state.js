import State from '../lib/state';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

// Custom revirer example, check how to convert JSON to custom record types.
// http://facebook.github.io/immutable-js/docs/#/fromJS
export const state = new State(initialState, function(key, value) {
});

export const appCursor = state.cursor(['app']);
export const pendingActionsCursor = state.cursor(['pendingActions']);
