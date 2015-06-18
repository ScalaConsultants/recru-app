import * as actions from './actions';
import {register} from '../dispatcher';
import {screensCursor} from '../state';

const NO_OF_SCREENS = 5;

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.nextScreen:
      screensCursor(screens => {
        const nextScreen = screens.get('currentScreen') + 1;
        if (nextScreen >= NO_OF_SCREENS)
          return screens.get('currentScreen');
        return screens.set('currentScreen', nextScreen);
      });
      break;

    case actions.previousScreen:
      screensCursor(screens => {
        const previousScreen = screens.get('currentScreen') - 1;
        if (previousScreen < 0)
          return screens.get('currentScreen');
        return screens.set('currentScreen', previousScreen);
      });
      break;
  }
});
