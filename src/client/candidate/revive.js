import {Map} from 'immutable';
import Role from './role';
import Skill from './skill';

export default function(value) {
  return Map(value)
    .set('name', value.get('name'))
    .set('email', value.get('email'))
    .set('role', new Role(value.get('role')))
    .set('skills', value.get('skills').map(skill => new Skill(skill)))
    .set('isSubmittingForm', value.get('isSubmittingForm'))
    .set('hasSubmittedForm', value.get('hasSubmittedForm'));
}
