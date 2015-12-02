/* global FormData, XMLHttpRequest */

import Promise from 'bluebird';

export default function multipartPostRequest(uri, parts) {
  if (typeof uri !== 'string')
    throw new Error('Argument \'uri\' must be a string.');

  if (typeof parts !== 'object')
    throw new Error('Argument \'parts\' must be a hashmap (an object).');

  const formData = new FormData();

  Object.keys(parts).forEach((name) => {
    const content = parts[name];
    formData.append(name, content);
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uri);
    xhr.withCredentials = true; // CORS
    xhr.onload = () => {
      if (xhr.status === 200)
        resolve(xhr.responseText);
      else
        reject(new Error('Non OK status has been returned.'));
    };
    xhr.onerror = (e) => {
      reject(new Error(e.target.status));
    };
    xhr.send(formData);
  });
}
