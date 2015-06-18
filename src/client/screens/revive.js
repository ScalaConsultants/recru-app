import {Map} from 'immutable';

export default function(value) {
  return Map(value)
    .set('currentScreen', value.get('currentScreen'))
    .set('lastScreen', value.get('lastScreen'));
}
