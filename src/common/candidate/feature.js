import {Record} from 'immutable';

const FeatureRecord = Record({
  // Record will create getter for every property.
  id: null,
  desc: ''
});

export default class Feature extends FeatureRecord {
  // And here we can add own getters.
  // get titleLowerCase() {
  //   return this.title.toLowerCase();
  // }
}
