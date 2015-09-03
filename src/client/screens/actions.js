export const actions = create();
export const feature = 'screens';

export function create(dispatch) {
  return {
    nextScreen() {
      dispatch(actions.nextScreen);
    },

    previousScreen() {
      dispatch(actions.previousScreen);
    },

    setScreen(id) {
      dispatch(actions.previousScreen, id);
    }
  };
}
