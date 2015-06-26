import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export function saveName(name) {
  dispatch(saveName, name);
}

export function saveRole(role) {
  dispatch(saveRole, role);
}

export function saveSkill(id, level) {
  dispatch(saveSkill, {id, level});
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
