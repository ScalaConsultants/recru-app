import api from './api';
import config from './config';
import errorHandler from './lib/errorhandler';
import express from 'express';
import frontend from './frontend';
import trimRight from 'lodash.trimright';
import {Server} from 'http';

const app = express();
const server = Server(app);

// Load API
app.use('/api/v1', api);

// Load react-js frontend.
const trimmedBaseUri = trimRight(config.app.baseUri, '/');
app.use(trimmedBaseUri, frontend);

// Error reporting
app.use(errorHandler);

server.listen(config.port, () => {
  console.log('Server started at port %s', config.port);
});
