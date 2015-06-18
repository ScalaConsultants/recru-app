import * as actions from './actions';
import {register} from '../dispatcher';
import {candidateCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.saveName:
      break;

    case actions.saveRole:
      break;

    case actions.saveSkill:
      break;

    case actions.saveResume:
      break;
  }
});
