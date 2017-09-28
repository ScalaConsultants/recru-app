import * as actions from './actions';
import {Record} from 'immutable';

// We can use simple initialState if no data from server need to be revived.
const InitialState = Record({
  currentScreen: 0,
  lastScreen: 7
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = (screens) => initialState.merge({
  currentScreen: screens.currentScreen,
  lastScreen: screens.lastScreen
});

export default function screensStore(state = initialState, action, payload) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {
    case actions.NEXT_SCREEN: {
      let nextScreen = state.get('currentScreen') + 1;
      if (nextScreen > state.get('lastScreen'))
        nextScreen = state.get('currentScreen');
      return state.set('currentScreen', nextScreen);
    }

    case actions.PREVIOUS_SCREEN: {
      let previousScreen = state.get('currentScreen') - 1;
      if (previousScreen < 0)
        previousScreen = state.get('currentScreen');
      return state.set('currentScreen', previousScreen);
    }

    case actions.SET_SCREEN: {
      const {id} = action.payload;
      if (id < 0 || id > state.get('lastScreen'))
        return state.get('currentScreen');
      return state.set('currentScreen', id);
    }
  }

  return state;
}
