import {Record} from 'immutable';
import {actions} from './actions';

// We can use simple initialState if no data from server need to be revived.
const initialState = new (Record({
  currentScreen: 0,
  lastScreen: 4
}));

export default function(state = initialState, action, payload) {
  if (!action) return state.toJS();

  switch (action) {
  case actions.nextScreen: {
    let nextScreen = state.get('currentScreen') + 1;
    if (nextScreen > state.get('lastScreen'))
      nextScreen = state.get('currentScreen');
    return state.set('currentScreen', nextScreen);
  }

  case actions.previousScreen: {
    let previousScreen = state.get('currentScreen') - 1;
    if (previousScreen < 0)
      previousScreen = state.get('currentScreen');
    return state.set('currentScreen', previousScreen);
  }

  case actions.setScreen:
    if (payload < 0 || payload > state.get('lastScreen'))
      return state.get('currentScreen');
    return state.set('currentScreen', payload);
  }

  return state;
}
