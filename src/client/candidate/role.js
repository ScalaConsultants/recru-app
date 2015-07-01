import {Record} from 'immutable';

const RoleRecord = Record({
  // Record will create getter for every property.
  id: '',
  name: ''
});

export default class Role extends RoleRecord {
  // And here we can add own getters.
  // get titleLowerCase() {
  //   return this.title.toLowerCase();
  // }
}
