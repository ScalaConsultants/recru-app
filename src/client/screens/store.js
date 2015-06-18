import * as actions from './actions';
import {register} from '../dispatcher';
import {screensCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.nextScreen:
      screensCursor(screens => {
        const previousScreen = screens.get('currentScreen');
        return screens.set('currentScreen', previousScreen + 1);
      });
      break;

    case actions.previousScreen:
      screensCursor(screens => {
        const previousScreen = screens.get('currentScreen');
        return screens.set('currentScreen', previousScreen - 1);
      });
      break;
  }
});
