require('babel/register')({optional: ['es7']});

const serverConfig = require('./config');

if (!process.env.NODE_ENV)
  throw new Error('Environment variable NODE_ENV isn\'t set. Remember it\'s up to your production enviroment to set NODE_ENV and maybe other variables.');

// To ignore webpack custom loaders on server.
serverConfig.webpackStylesExtensions.forEach((ext) => {
  require.extensions['.' + ext] = () => {};
});

require('./main');
