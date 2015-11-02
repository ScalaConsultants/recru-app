import api from './api';
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import trimRight from 'lodash.trimright';

const app = express();

app.use('/api/v1', api);

const trimmedBaseUri = trimRight(config.app.baseUri, '/');
app.use(trimmedBaseUri, frontend);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('Server started at port %s', config.port);
});
