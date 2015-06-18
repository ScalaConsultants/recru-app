import {Map} from 'immutable';

export default function(value) {
  return Map(value)
    .set('currentScreen', 0)
    .set('lastScreen', 4);
}
