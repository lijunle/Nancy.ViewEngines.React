import path from 'path';
import gutil from 'gulp-util';
import webpack from 'webpack';

// TODO find another way to watch webpack
export default (options) => {
  const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  });

  const compiler = webpack({
    entry: options.indexPath,
    output: {
      path: options.clientPath,
      filename: options.scriptBundleName,
      publicPath: `/${options.assets}/`,
      library: 'render', // expose as render method
    },
    devtool: options.debug ? 'cheap-module-source-map' : null,
    plugins: options.debug ? null : [uglifyPlugin],
    bail: true,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
        {
          test: /\.jsx?$/,
          loader: 'imports',
          query: {
            console: path.resolve(__dirname, './console.js'),
          },
        },
      ],
    },
    resolve: {
      root: path.resolve(__dirname, '../../node_modules'),
      extensions: ['', '.js', '.jsx'],
    },
    resolveLoader: {
      root: path.resolve(__dirname, '../../node_modules'),
    },
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        gutil.log(err);
        reject(err);
      } else {
        gutil.log(stats.toString({
          colors: false,
          hash: false,
          version: false,
          chunks: false,
        }));
      }
    });
  });
};
