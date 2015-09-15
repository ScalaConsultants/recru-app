import Html from './html.react';
import Promise from 'bluebird';
import React from 'react';
import App from '../../client/app/app.react';
import config from '../config';
import immutable from 'immutable';
import initialState from '../initialstate';
import stateMerger from '../lib/merger';

export default function render(req, res, ...customStates) {
  const appState = immutable
    .fromJS(initialState)
    .mergeWith(stateMerger, ...customStates).toJS();
  return renderPage(req, res, appState);
}

function renderPage(req, res, appState) {
  return new Promise((resolve, reject) => {
    const html = getPageHtml(App, appState, {hostname: req.hostname});
    res.status(200).send(html);
    resolve();
  });
}

function getPageHtml(Handler, appState, {hostname}) {
  const appHtml = `<div id="app">${
    React.renderToString(<Handler initialState={appState} />)
  }</div>`;
  const appScriptSrc = config.isProduction
    ? '_assets/app.js?v=' + config.assetsHashes.appJs
    : `//${hostname}:8888/build/app.js`;

  let scriptHtml = `
    <script>
      window._initialState = ${JSON.stringify(appState)};
    </script>
    <script src="${appScriptSrc}"></script>
  `;

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      appCssHash={config.assetsHashes.appCss}
      baseUri={config.app.baseUri}
      bodyHtml={appHtml + scriptHtml}
      googleAnalyticsId={config.googleAnalyticsId}
      isProduction={config.isProduction}
      title={config.app.defaultTitle}
      version={config.app.version}
    />
  );
}
