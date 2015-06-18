import {Map} from 'immutable';

export default function(value) {
  return Map(value)
    .set('name', '')
    .set('role', null)
    .set('skills', [])
    .set('resume', null);
}
