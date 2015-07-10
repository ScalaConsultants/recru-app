import setToString from '../lib/settostring';
import multipartPostRequest from '../lib/multipartPostRequest';
import {dispatch} from '../dispatcher';

export function saveName(name) {
  dispatch(saveName, name);
}

export function saveEmail(email) {
  dispatch(saveEmail, email);
}

export function saveRole(role) {
  dispatch(saveRole, role);
}

export function saveSkill(skill, level) {
  dispatch(saveSkill, {skill, level});
}

export function submit(parts) {
  dispatch(submit);
  // TODO: replace the api endpoint uri and ideally make it configurable per environment
  multipartPostRequest('http://144.76.238.49:20001/upload', parts)
    .then(receiveSubmitResponse)
    .catch(showDirtyError);
}

// This is ugly but working, we're short on time...
function showDirtyError() {
  window.alert('Something went wrong and we are very sorry about that. Try again in couple seconds or drop us a message at info@scalac.io, thanks!'); // eslint-disable-line no-alert
}

export function receiveSubmitResponse(response) {
  if (response !== 'OK') {
    showDirtyError();
    return;
  }

  dispatch(receiveSubmitResponse, response);
  // After showing thank you screen, redirect to homepage
  setTimeout(() => window.location = 'http://scalac.io', 5000);
}

setToString('candidate', {
  saveName,
  saveEmail,
  saveRole,
  saveSkill,
  submit,
  receiveSubmitResponse
});
