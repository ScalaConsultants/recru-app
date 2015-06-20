import State from './lib/state';
import reviveScreens from './screens/revive';
import reviveCandidate from './candidate/revive';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

export const appState = new State(initialState, function(key, value) {
  switch (key) {
    case 'screens': return reviveScreens(value);
    case 'candidate': return reviveCandidate(value);
  }
});

export const pendingActionsCursor = appState.cursor(['pendingActions']);
export const screensCursor = appState.cursor(['screens']);
export const candidateCursor = appState.cursor(['candidate']);
