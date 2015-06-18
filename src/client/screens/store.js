import * as actions from './actions';
import {register} from '../dispatcher';
import {screensCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.nextScreen:
      screensCursor(screens => {
        const nextScreen = screens.get('currentScreen') + 1;
        if (nextScreen > screens.get('lastScreen'))
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

    case actions.setScreen:
      screensCursor(screens => {
        if (data < 0 || data > screens.get('lastScreen'))
          return screens.get('currentScreen');
        return screens.set('currentScreen', data);
      });
      break;
  }
});
