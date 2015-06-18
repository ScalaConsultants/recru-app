import * as actions from './actions';
import {register} from '../dispatcher';
import {candidateCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.saveName:
      candidateCursor(candidate => {
        return candidate.set('name', data);
      });
      break;

    case actions.saveRole:
      candidateCursor(candidate => {
        return candidate.set('role', data);
      });
      break;

    case actions.saveSkill:
      candidateCursor(candidate => {
        return candidate.set(['skills', data.title], data.rating);
      });
      break;

    case actions.saveResume:
      candidateCursor(candidate => {
        return candidate.set('resume', data);
      });
      break;
  }
});
