import useragent from 'useragent';
import { HOT_RELOAD_PORT } from '../../../webpack/constants';
import serialize from 'serialize-javascript';
import config from '../config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';

export function getAppHtml(store, renderProps) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RoutingContext {...renderProps} />
    </Provider>
  );
}

export function getScriptHtml(clientState, headers, hostname, appJsFilename, isStatic = false) {
  let scriptHtml = '';

  const ua = useragent.is(headers['user-agent']);
  const needIntlPolyfill = ua.safari || (ua.ie && ua.version < '11');
  if (needIntlPolyfill) {
    scriptHtml += `
      <script src="/node_modules/intl/dist/Intl.min.js"></script>
      <script src="/node_modules/intl/locale-data/jsonp/en-US.js"></script>
    `;
  }

  const appScriptSrc = config.isProduction
    ? `/_assets/${appJsFilename}`
    : (isStatic ? `/${appJsFilename}` : `//${hostname}:${HOT_RELOAD_PORT}/build/app.js`);

  // Note how clientState is serialized. JSON.stringify is anti-pattern.
  // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  return scriptHtml + `
    <script>
      window.__INITIAL_STATE__ = ${serialize(clientState)};
    </script>
    <script src="${appScriptSrc}"></script>
  `;
}