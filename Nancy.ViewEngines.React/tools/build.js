/* eslint-disable no-console */

const options = require('./commands/options');
const clean = require('./commands/clean');

const env = {
  projectFile: process.argv[2],
  outputPath: process.argv[3],
  configuration: process.argv[4],
};

options(env)
.then(clean)
.catch(error => console.error('[Error] Error = ', error));
