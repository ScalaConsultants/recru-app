import {Record} from 'immutable';

const ExpRecord = Record({
  // Record will create getter for every property.
  id: '',
  position: ''
});

export default class Exp extends ExpRecord {
  // And here we can add own getters.
  // get titleLowerCase() {
  //   return this.title.toLowerCase();
  // }
}
