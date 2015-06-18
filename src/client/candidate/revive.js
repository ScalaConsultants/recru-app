import {Map} from 'immutable';

export default function(value) {
  return Map(value)
    .set('name', value.get('name'))
    .set('role', value.get('role'))
    .set('skills', value.get('skills'))
    .set('resume', value.get('resume'));
}
