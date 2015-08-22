import path from 'path';
import gutil from 'gulp-util';
import locker from 'lockfile';
import webpack from 'webpack';

function compilerInvoke(options, method) {
  const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });

  const compiler = webpack({
    entry: options.indexPath,
    output: {
      path: options.clientPath,
      filename: options.scriptBundleName,
      publicPath: `/${options.assets}/`,
      library: 'render' // expose as render method
    },
    devtool: options.debug ? 'cheap-module-source-map' : null,
    plugins: options.debug ? null : [uglifyPlugin],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel'
        },
        {
          test: /\.jsx?$/,
          loader: 'imports',
          query: {
            console: path.resolve(__dirname, './console.js')
          }
        }
      ]
    },
    resolve: {
      root: path.resolve(__dirname, '../../node_modules'),
      extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
      root: path.resolve(__dirname, '../../node_modules')
    }
  });

  return new Promise((resolve, reject) => {
    const runner = method(compiler, (err, stats) => {
      if (err) {
        gutil.log(err);
        reject(err);
      } else {
        gutil.log(stats.toString({
          colors: false,
          hash: false,
          version: false,
          chunks: false
        }));
        resolve(runner);
      }
    });
  });
}

export const checkLock = function checkLock(options) {
  return new Promise((resolve, reject) => {
    locker.check(options.webpackLockPath, (error, isLocked) => {
      if (error) {
        gutil.log(error.toString());
        reject(error);
      } else {
        resolve(isLocked);
      }
    });
  });
};

export const lock = function lock(options, watcher) {
  if (!watcher) {
    return watcher; // another watcher is on, already locked
  }

  // TODO handle exit event and do the same thing
  process.on('SIGINT', () => {
    watcher.close(() => {
      locker.unlock(options.webpackLockPath, () => {
        gutil.log('Webpack watcher closed, compilation lock released');
      });
    });
  });

  // inject the lock process before return watcher
  return new Promise(resolve => {
    locker.lock(options.webpackLockPath, (err) => {
      gutil.log(err ? err.toString() : 'Webpack watcher started, lock compilation');
      resolve(watcher);
    });
  });
};

export const compile = function compile(options) {
  return compilerInvoke(options, (compiler, cb) => compiler.run(cb));
};
