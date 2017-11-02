import {Record} from 'immutable';

const SkillRecord = Record({
  // Record will create getter for every property.
  extraSkills: []
});

export default class Skill extends SkillRecord {
  // And here we can add own getters.
  // get titleLowerCase() {
  //   return this.title.toLowerCase();
  // }
}
