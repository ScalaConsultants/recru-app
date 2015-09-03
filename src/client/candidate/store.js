import Role from './role';
import Skill from './skill';
import {Record, Map} from 'immutable';
import {actions} from './actions';

// We can use simple initialState if no data from server need to be revived.
const initialState = new (Record({
  name: '',
  email: '',
  role: new Role(null),
  skills: {},
  isSubmittingForm: false,
  hasSubmittedForm: false
}));

export default function(state = initialState, action, payload) {
  if (!action) return state;

  switch (action) {
  case actions.saveName:
    return state.set('name', payload);

  case actions.saveEmail:
    return state.set('email', payload);

  case actions.saveRole:
    return state
      .set('role', new Role(payload))
      .set('skills', Map());

  case actions.saveSkill:
    return state
      .setIn(['skills', payload.skill.id], new Skill(payload.skill))
      .setIn(['skills', payload.skill.id, 'level'], payload.level);

  case actions.submit:
    return state.set('isSubmittingForm', true);

  case actions.receiveSubmitResponse:
    return state
      .set('isSubmittingForm', false)
      .set('hasSubmittedForm', true);
  }

  return state;
}
