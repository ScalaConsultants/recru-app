import {combineReducers} from 'redux';

// Note we are composing all reducers. Web, native, whatever. Of course we can
// pass platform specific reducers in configureStore, but there is no reason to
// do that, until app is really large.
import candidate from '../candidate/reducer';
import screens from '../screens/reducer';
import device from '../device/reducer';
import config from '../config/reducer';

const appReducer = combineReducers({
  candidate,
  screens,
  device,
  config,
});

export default appReducer;
