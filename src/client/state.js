import State from './lib/state';
import reviveScreens from './screens/revive';
import reviveCandidate from './candidate/revive';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

export const state = new State(initialState, function(key, value) {
  switch (key) {
    case 'screens': return reviveScreens(value);
    case 'candidate': return reviveCandidate(value);
  }
});

export const pendingActionsCursor = state.cursor(['pendingActions']);
export const screensCursor = state.cursor(['screens']);
export const candidateCursor = state.cursor(['candidate']);
