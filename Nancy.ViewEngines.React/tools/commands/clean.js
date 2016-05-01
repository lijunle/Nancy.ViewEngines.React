/* eslint-disable no-console */

const rimraf = require('rimraf');

function removePath(path) {
  return new Promise((resolve, reject) =>
    rimraf(path, (error) =>
      error ? reject(error) : resolve()));
}

function clean(options) {
  return Promise.resolve()
    .then(() => console.log('[Start] Clean up client path:', options.clientPath))
    .then(() => removePath(options.clientPath))
    .then(() => console.log('[Finish] Clean up client path.'))
    .then(() => options);
}

module.exports = clean;
