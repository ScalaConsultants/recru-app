import immutable from 'immutable';

import candidateStore from '../candidate/store';
import screensStore from '../screens/store';

export default function(state, action, payload) {
  // Create immutable from JSON asap to prevent side effects accidents.
  if (!action) state = immutable.fromJS(state);

  // Btw, this can be refactored, but leaving it explicit for now.
  state = state
    .update('candidate', (s) => candidateStore(s, action, payload))
    .update('screens', (s) => screensStore(s, action, payload));

  // We can reduce and compose stores. Note we don't need waitFor.

  // Composed store example:
  // .update('foo', (s) => fooStore(s, state.get('auth'), action, payload));

  return state;
}
