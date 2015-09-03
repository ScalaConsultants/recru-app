import compression from 'compression';
import config from '../config';
import esteHeaders from '../lib/estemiddleware';
import express from 'express';
import favicon from 'serve-favicon';
import render from './render';
import userState from './userstate';
import i18nLoader from '../lib/i18nmiddleware';

const app = express();

app.use(esteHeaders());
app.use(compression());
app.use(favicon('assets/img/favicon.ico'));
app.use('/assets/img', express.static('assets/img', {maxAge: '200d'}));
app.use('/_assets', express.static('build', {maxAge: '200d'}));

// Load translations, fallback to defaultLocale if no
// translations available.
app.use(i18nLoader({
  appLocales: config.locales,
  defaultLocale: config.defaultLocale
}));

// Load state extras for current user.
app.use(userState());

app.get('/', (req, res, next) => {
  const customStates = {
    i18n: req.i18n,
    config: config.app
  };
  render(req, res, req.userState, customStates)
    .catch(next);
});

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;
