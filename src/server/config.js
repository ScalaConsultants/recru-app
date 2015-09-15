var hashFile = require('hash-file');
var nconf = require('nconf');

var isProduction = process.env.NODE_ENV === 'production';

// Specifying an env delimiter allows you to override below config when shipping
// to production server.
nconf.env('__');

var config = {
  assetsHashes: {
    appCss: isProduction ? hashFile.sync('build/app.css') : '',
    appJs: isProduction ? hashFile.sync('build/app.js') : ''
  },
  app: {
    // NOTE: Feel free to introduce new properties and read using configCursor.
    baseUri: '/',
    defaultTitle: 'Scalac - Best Scala hAkkers!',
    apiEndpoint: 'http://localhost:8080',
    version: require('../../package').version
  },
  googleAnalyticsId: 'UA-XXXXXXX-X',
  locales: ['en'],
  defaultLocale: 'en',
  isProduction: isProduction,
  piping: {
    // Ignore webpack custom loaders on server. TODO: Reuse index.js config.
    ignore: /(\/\.|~$|\.(css|less|sass|scss|styl))/,
    // Hook ensures always fresh server response even for client file change.
    hook: true
  },
  port: process.env.PORT || 8000,
  webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl']
};

// Use above config as a default one. Multiple other providers are available
// like loading config from json and more. Check out nconf docs.
nconf.defaults(config);

module.exports = nconf.get();
