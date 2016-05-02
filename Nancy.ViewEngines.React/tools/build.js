/* eslint-disable no-console */

const options = require('./commands/options');
const clean = require('./commands/clean');
const buildEntry = require('./commands/entry');

const env = {
  projectFile: process.argv[2],
  outputPath: process.argv[3],
  configuration: process.argv[4],
};

options(env)
.then(clean)
.then(buildEntry)
.catch(error => console.error('[Error] Error = ', error));
