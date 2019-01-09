import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import constants from './constants';
import path from 'path';
import webpack from 'webpack';
import ip from 'ip';

const devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'inline-source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map';

const loaders = {
  'css': [],
  'less': [{loader: 'less-loader'}],
  'styl': [{loader: 'stylus-loader'}]
};

const serverIp = ip.address();

export default function makeConfig(isDevelopment) {

  function stylesLoaders() {
    return Object.keys(loaders).map(ext => {
      const prefix = [
        {loader: 'css-loader'},
        {loader: 'postcss-loader', options: {
          plugins: () => [autoprefixer({browsers: 'last 2 version'})]
        }},
      ];
      const extLoaders = [...prefix, ...loaders[ext]];
      const loader = isDevelopment
        ? [{loader: 'style-loader'}, ...extLoaders]
        : [MiniCssExtractPlugin.loader, ...extLoaders];

      return {
        use: loader,
        test: new RegExp(`\\.(${ext})$`)
      };
    });
  }

  const config = {
    cache: isDevelopment,
    performance: {
      hints: false,
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? devtools : '',
    optimization: {
      minimize: !isDevelopment
    },
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'browser/index.js')
      ] : [
        path.join(constants.SRC_DIR, 'browser/index.js')
      ]
    },
    module: {
      rules: [{
        use: 'url-loader?limit=100000',
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
      }, {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        test: /\.js$/
      }].concat(stylesLoaders())
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js'
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ];
      if (isDevelopment) plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      );
      else plugins.push(
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'app-[hash].css',
          chunkFilename: '[id].css'
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
      );
      return plugins;
    })(),
    resolve: {
      extensions: ['*', '.js', '.json'],
      modules: ['src', 'node_modules'],
      alias: {
        'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    }
  };

  return config;

};
