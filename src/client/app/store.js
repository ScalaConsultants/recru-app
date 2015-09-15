import immutable, {Record} from 'immutable';

// Import stores.
import candidateStore from '../candidate/store';
import screensStore from '../screens/store';

const deviceInitialState = new (Record({
  isMobile: false
}));

function deviceStore(state = deviceInitialState, action, payload) {
  if (!action) return state;
  return deviceInitialState.merge(state);
}

export default function appStore(state, action, payload) {
  // Create immutable from JSON asap to prevent side effects accidents.
  if (!action) state = immutable.fromJS(state);

  state = state
    .update('candidate', (s) => candidateStore(s, action, payload))
    .update('device', (s) => deviceStore(s, action, payload))
    .update('screens', (s) => screensStore(s, action, payload));

  // Stores can be both reduced and composed.

  // Reduce store
  // .update('msg', (s) => state.get('intl').messages);
  // Compose new store from auth.
  // .update('foo', (s) => fooStore(s, state.get('auth'), action, payload));

  return state;
}
