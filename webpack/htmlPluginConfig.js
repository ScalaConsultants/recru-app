import Html from '../src/server/frontend/html.react';
import {getAppHtml, getStaticScriptHtml} from '../src/server/frontend/markup';
import config from '../src/server/config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import configureStore from '../src/common/configureStore';
import Helmet from 'react-helmet';

export default function getHtmlPluginConfig() {
  return {
    templateContent: (templateParams) => {
      const initialState = {};
      const store = configureStore({initialState});
      const helmet = Helmet.rewind();
      const renderProps = {
        history: {},
      };

      const appHtml = getAppHtml(store, renderProps);
      const scriptHtml = getStaticScriptHtml(config.app);

      return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
          <Html
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
