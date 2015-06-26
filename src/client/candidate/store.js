import * as actions from './actions';
import {Map} from 'immutable';
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
        return candidate
          .set('role', data)
          .set('skills', Map());
      });
      break;

    case actions.saveSkill:
      candidateCursor(candidate => {
        return candidate.setIn(['skills', data.id], data.level);
      });
      break;

    case actions.saveResume:
      candidateCursor(candidate => {
        return candidate.set('resume', data);
      });
      break;
  }
});
