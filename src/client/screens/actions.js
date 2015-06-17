import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export function nextScreen() {
  dispatch(nextScreen);
}

export function previousScreen() {
  dispatch(previousScreen);
}

setToString('todos', {
  nextScreen,
  previousScreen
});
