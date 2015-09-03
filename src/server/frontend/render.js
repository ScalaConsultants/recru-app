import Html from './html.react';
import Promise from 'bluebird';
import React from 'react';
import App from '../../client/app/app.react';
import config from '../config';
import immutable from 'immutable';
import initialState from '../initialstate';
import stateMerger from '../lib/merger';

export default function render(req, res, ...customStates) {
  const appState = immutable.fromJS(initialState).mergeWith(stateMerger, ...customStates).toJS();
  return renderPage(req, res, appState);
}

function renderPage(req, res, appState) {
  return new Promise((resolve, reject) => {
    const html = getPageHtml(App, appState);
    res.status(200).send(html);
    resolve();
  });
}

function getPageHtml(Handler, appState) {
  const appHtml = `<div id="app">${
    React.renderToString(<Handler initialState={appState} />)
  }</div>`;
  const appScriptSrc = config.isProduction
    ? 'build/app.js?v=' + config.app.version
    : '//localhost:8888/build/app.js';

  let scriptHtml = `
    <script>
      (function() {
        window._appState = ${JSON.stringify(appState)};
        var app = document.createElement('script'); app.type = 'text/javascript'; app.async = true;
        var src = '${appScriptSrc}';
        app.src = src;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(app, s);
      })();
    </script>`;

  if (config.isProduction && config.googleAnalyticsId !== 'UA-XXXXXXX-X')
    scriptHtml += `
      <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','${config.googleAnalyticsId}');ga('send','pageview');
      </script>`;

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      baseUri={config.app.baseUri}
      bodyHtml={appHtml + scriptHtml}
      isProduction={config.isProduction}
      title={config.app.defaultTitle}
      version={config.app.version}
    />
  );
}
