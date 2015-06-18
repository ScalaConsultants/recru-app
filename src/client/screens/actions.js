import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export function nextScreen() {
  dispatch(nextScreen);
}

export function previousScreen() {
  dispatch(previousScreen);
}

export function setScreen(id) {
  dispatch(setScreen, id);
}

setToString('todos', {
  nextScreen,
  previousScreen,
  setScreen
});
