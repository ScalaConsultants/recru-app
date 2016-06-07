import Html from '../src/server/frontend/Html.react';
import { getAppHtml, getScriptHtml } from '../src/server/frontend/markup';
import config from '../src/server/config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import configureStore from '../src/common/configureStore';
import Helmet from 'react-helmet';

export default function getHtmlPluginConfig() {
  return {
    templateContent: (templateParams) => {
      const initialState = {};
      const store = configureStore({ initialState });
      const helmet = Helmet.rewind();

      const appHtml = getAppHtml(store, {});
      const scriptHtml = getScriptHtml(store.getState(), { 'user-agent': '' }, config.app.baseUri, templateParams.htmlWebpackPlugin.files.js[0], true);

      return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
          <Html
            appCssFilename={templateParams.htmlWebpackPlugin.files.css[0]}
            baseUri={config.app.baseUri}
            bodyHtml={`<div id="app">${appHtml}</div>${scriptHtml}`}
            googleAnalyticsId={config.googleAnalyticsId}
            helmet={helmet}
            isProduction={false}
            isStatic
          />
        );
    }
  };
}
