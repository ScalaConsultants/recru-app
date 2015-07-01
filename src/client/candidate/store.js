import * as actions from './actions';
import Role from './role';
import Skill from './skill';
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

    case actions.saveEmail:
      candidateCursor(candidate => {
        return candidate.set('email', data);
      });
      break;

    case actions.saveRole:
      candidateCursor(candidate => {
        return candidate
          .set('role', new Role(data))
          .set('skills', Map());
      });
      break;

    case actions.saveSkill:
      candidateCursor(candidate => {
        return candidate
          .setIn(['skills', data.skill.id], new Skill(data.skill))
          .setIn(['skills', data.skill.id, 'level'], data.level);
      });
      break;

    case actions.submit:
      candidateCursor(candidate => {
        return candidate.set('isSubmittingForm', true);
      });
      break;

    case actions.receiveSubmitResponse:
      candidateCursor(candidate => {
        return candidate
          .set('isSubmittingForm', false)
          .set('hasSubmittedForm', true);
      });
      break;
  }
});
