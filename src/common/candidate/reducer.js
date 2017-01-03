import * as actions from './actions';
import map from 'lodash.map';
import Role from './role';
import Skill from './skill';
import {Record, Map} from 'immutable';

const InitialState = Record({
  name: '',
  email: '',
  role: new Role(null),
  skills: {},
  otherSkill: '',
  isSubmittingForm: false,
  hasSubmittedForm: false,
  hasSubmissionErroredOut: false
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = (candidate) => initialState.merge({
  name: candidate.name,
  email: candidate.email,
  role: new Role(candidate.role),
  skills: map(candidate.skills, (skill => new Skill(skill))),
  otherSkill: candidate.otherSkill,
  isSubmittingForm: candidate.isSubmittingForm,
  hasSubmittedForm: candidate.hasSubmittedForm,
  hasSubmissionErroredOut: candidate.hasSubmittedForm
});

export default function candidateReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {
    case actions.SAVE_NAME: {
      const {name} = action.payload;
      return state.set('name', name);
    }

    case actions.SAVE_EMAIL: {
      const {email} = action.payload;
      return state.set('email', email);
    }

    case actions.SAVE_ROLE: {
      const {role} = action.payload;
      return state
        .set('role', new Role(role))
        .set('skills', Map());
    }

    case actions.SAVE_SKILL: {
      const {skill, level} = action.payload;
      return state
        .setIn(['skills', skill.id], new Skill(skill))
        .setIn(['skills', skill.id, 'level'], level);
    }

    case actions.SAVE_OTHER_SKILL: {
      const {skillDesc} = action.payload;
      return state.set('otherSkill', skillDesc);
    }

    case actions.SUBMIT_START: {
      return state.set('isSubmittingForm', true);
    }

    case actions.SUBMIT_SUCCESS: {
      return state
        .set('isSubmittingForm', false)
        .set('hasSubmittedForm', true);
    }

    case actions.SUBMIT_ERROR: {
      return state
        .set('isSubmittingForm', false)
        .set('hasSubmittedForm', true)
        .set('hasSubmissionErroredOut', true);
    }
  }

  return state;
}
