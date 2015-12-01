/* global window */

import multipartPostRequest from '../lib/multipartPostRequest';

export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_ROLE = 'SAVE_ROLE';
export const SAVE_SKILL = 'SAVE_SKILL';
export const SUBMIT_START = 'SUBMIT_START';
export const SUBMIT_ERROR = 'SUBMIT_ERROR';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';

// This is ugly but working, we're short on time...
function showDirtyError() {
  window.alert('Something went wrong and we are very sorry about that. Try again in couple seconds or drop us a message at info@scalac.io, thanks!'); // eslint-disable-line no-alert
}

function handleSubmitResponse(response) {
  if (response !== 'OK') {
    showDirtyError();
    return;
  }
  // After showing thank you screen, redirect to homepage
  window.setTimeout(() => window.location = 'http://scalac.io', 5000);
};

export function saveName(name) {
  return {
    type: SAVE_NAME,
    payload: {name}
  };
}

export function saveEmail(email) {
  return {
    type: SAVE_EMAIL,
    payload: {email}
  };
}

export function saveRole(role) {
  return {
    type: SAVE_ROLE,
    payload: {role}
  };
}

export function saveSkill(skill, level) {
  return {
    type: SAVE_SKILL,
    payload: {skill, level}
  };
}

export function submit(apiEndpoint, parts) {
  return ({fetch}) => ({
    type: 'SUBMIT',
    payload: {
      promise: multipartPostRequest(apiEndpoint, parts)
        .then(handleSubmitResponse)
        .catch(showDirtyError)
    }
  });
}
