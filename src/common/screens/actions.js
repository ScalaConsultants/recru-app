export const NEXT_SCREEN = 'NEXT_SCREEN';
export const PREVIOUS_SCREEN = 'PREVIOUS_SCREEN';
export const SET_SCREEN = 'SET_SCREEN';

export function nextScreen() {
  return {
    type: NEXT_SCREEN
  };
}

export function previousScreen() {
  return {
    type: PREVIOUS_SCREEN
  };
}

export function setScreen(id) {
  return {
    type: SET_SCREEN,
    payload: {id}
  };
}
