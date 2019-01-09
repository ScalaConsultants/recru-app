/* global window */

import multipartPostRequest from '../lib/multipartPostRequest';

export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_ROLE = 'SAVE_ROLE';
export const SAVE_SKILL = 'SAVE_SKILL';
export const SAVE_EXTRA_SKILL = 'SAVE_EXTRA_SKILL';
export const SAVE_FEATURE = 'SAVE_FEATURE';
export const SAVE_EXP = 'SAVE_EXP';
export const SUBMIT_START = 'SUBMIT_START';
export const SUBMIT_ERROR = 'SUBMIT_ERROR';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';

function handleSubmitResponse(response) {
  if (response !== 'OK') {
    throw new Error('Non OK status has been returned.');
  }
  // After showing thank you screen, redirect to homepage
  window.setTimeout(() => {window.location = 'http://scalac.io';}, 5000);
}

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

export function saveExtraSkill(skills) {
  return {
    type: SAVE_EXTRA_SKILL,
    payload: {skills}
  };
}

export function saveSkill(skill, level) {
  return {
    type: SAVE_SKILL,
    payload: {skill, level}
  };
}

export function saveFeature(feature) {
  return {
    type: SAVE_FEATURE,
    payload: {feature}
  };
}

export function saveExp(exp) {
  return {
    type: SAVE_EXP,
    payload: {exp}
  };
}

export function submit(apiEndpoint, parts) {
  return ({fetch}) => ({
    type: 'SUBMIT',
    payload: {
      promise: multipartPostRequest(apiEndpoint, parts)
        .then(handleSubmitResponse)
    }
  });
}
