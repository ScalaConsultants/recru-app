import multipartPostRequest from '../lib/multipartPostRequest';

export const actions = create();
export const feature = 'candidate';

// This is ugly but working, we're short on time...
function showDirtyError() {
  window.alert('Something went wrong and we are very sorry about that. Try again in couple seconds or drop us a message at info@scalac.io, thanks!'); // eslint-disable-line no-alert
}

export function create(dispatch) {

  const handleSubmitResponse = (response) => {
    if (response !== 'OK') {
      showDirtyError();
      return;
    }
    dispatch(actions.receiveSubmitResponse, response);
    // After showing thank you screen, redirect to homepage
    setTimeout(() => window.location = 'http://scalac.io', 5000);
  };

  return {
    saveName(name) {
      dispatch(actions.saveName, name);
    },

    saveEmail(email) {
      dispatch(actions.saveEmail, email);
    },

    saveRole(role) {
      dispatch(actions.saveRole, role);
    },

    saveSkill(skill, level) {
      dispatch(actions.saveSkill, {skill, level});
    },

    submit(apiEndpoint, parts) {
      dispatch(actions.submit);
      multipartPostRequest(apiEndpoint, parts)
        .then(handleSubmitResponse)
        .catch(showDirtyError);
    },

    receiveSubmitResponse() {}
  };
}
