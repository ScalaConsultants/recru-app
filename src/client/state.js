import State from './lib/state';
import reviveScreens from './screens/revive';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

export const state = new State(initialState, function(key, value) {
  switch (key) {
    case 'screens': return reviveScreens(value);
  }
});

export const pendingActionsCursor = state.cursor(['pendingActions']);
export const screensCursor = state.cursor(['screens']);
