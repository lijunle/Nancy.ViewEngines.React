/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');

function mapLocal(array) {
  return array.map((item) => path.resolve(__dirname, '../../node_modules', item));
}

// TODO find a way to do webpack watch
function compile(options) {
  const deinfePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': options.debug ? '' : '"production"',
  });

  const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  });

  const compiler = webpack({
    entry: [
      'babel-polyfill',
      options.entryFile,
    ],
    output: {
      path: options.clientPath,
      filename: options.scriptBundleName,
      publicPath: `/${options.assets}/`,
      library: 'render', // expose as render method
    },
    devtool: options.debug ? 'cheap-module-source-map' : null,
    plugins: options.debug ? null : [deinfePlugin, uglifyPlugin],
    bail: true,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: mapLocal([
              'babel-preset-es2015',
              'babel-preset-react',
            ]),
          },
        },
        {
          test: /\.jsx?$/,
          loader: 'imports',
          query: {
            console: path.resolve(__dirname, '../client/console.js'),
          },
        },
      ],
    },
    resolve: {
      root: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, '../utils'),
      ],
      extensions: ['', '.js', '.jsx'],
    },
    resolveLoader: {
      root: path.resolve(__dirname, '../../node_modules'),
    },
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats.toString({
          colors: false,
          hash: false,
          version: false,
          chunks: false,
        }));
      }
    });
  });
}

function build(options) {
  return Promise.resolve()
    .then(() => console.log('[Start] Webpack.'))
    .then(() => compile(options))
    .then(stats => console.log(stats))
    .then(() => console.log('[End] Webpack.'))
    .then(() => options);
}

module.exports = build;
