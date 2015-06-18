import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export function saveName(name) {
  dispatch(saveName, name);
}

export function saveRole(role) {
  dispatch(saveRole, role);
}

export function saveSkill(skill, level) {
  dispatch(saveSkill, {skill, level});
}

export function saveResume(file) {
  dispatch(saveResume, file);
}

setToString('candidate', {
  saveName,
  saveRole,
  saveSkill,
  saveResume
});
