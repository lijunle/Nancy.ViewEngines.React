/* eslint-disable no-console */

const path = require('path');
const options = require('./commands/options');
const clean = require('./commands/clean');
const buildEntry = require('./commands/entry');
const webpack = require('./commands/webpack');

function trim(str) {
  return (str || '').trim();
}

const env = {
  projectFile: trim(process.argv[2]) || path.resolve(__dirname, '../package.json'),
  outputPath: trim(process.argv[3]) || 'bin',
  configuration: trim(process.argv[4]),
};

options(env)
.then(clean)
.then(buildEntry)
.then(webpack)
.catch(error => console.error('[Error] Error = ', error));
