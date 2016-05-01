/* eslint-disable no-console */

const options = require('./commands/options');

const env = {
  projectFile: process.argv[2],
  outputPath: process.argv[3],
  configuration: process.argv[4],
};

options(env)
.catch(error => console.error('[Error] Error = ', error));
