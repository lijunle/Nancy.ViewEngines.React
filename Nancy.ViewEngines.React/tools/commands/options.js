/* eslint-disable no-console */

const path = require('path');
const parseString = require('xml2js').parseString;
const readFile = require('./file').readFile;

function get(obj, property) {
  // TODO This file run by node.js. Wait for node.js 6.x NuGet package, prefer rest-params.
  const args = [].slice.call(arguments, 2); // eslint-disable-line prefer-rest-params

  if (property === null || property === undefined) {
    return obj;
  }

  if (obj && obj[0] && obj[0][property]) {
    return get(obj[0][property], ...args);
  }

  if (obj && obj[0] && obj[0].$ && obj[0].$[property]) {
    return get(obj[0].$[property], ...args);
  }

  return null;
}

function toExtension(extensionNode) {
  return typeof extensionNode === 'string'
    ? extensionNode
    : extensionNode.$.name;
}

function parseConfig(config) {
  return new Promise((resolve, reject) => {
    parseString(config, (err, result) => {
      if (err) {
        reject(err);
      }

      const reactViewEngine = result.configuration.reactViewEngine;

      const extensionNodes =
        get(reactViewEngine, 'script', 'extensions', 'add') || ['jsx'];

      const configuration = {
        script: {
          dir: get(reactViewEngine, 'script', 'dir') || 'client',
          name: get(reactViewEngine, 'script', 'name') || 'script.js',
          extensions: extensionNodes.map(toExtension),
          layout: get(reactViewEngine, 'script', 'layout', 'name') ||
            path.resolve(__dirname, '../client/layout.jsx'),
        },
        server: {
          assets: {
            path: get(reactViewEngine, 'server', 'assets', 'path') || 'assets',
          },
        },
      };

      resolve(configuration);
    });
  });
}

function buildOptions(config, env, projectFile, projectPath) {
  const debug = env.configuration !== 'Release';
  const entryFileName = 'entry.map';
  const outputPath = env.outputPath;
  const clientPath = path.resolve(projectPath, outputPath, config.script.dir);
  return {
    debug,
    entryFileName,
    projectFile,
    projectPath,
    clientPath,
    workingPath: process.cwd(),
    entryFile: path.resolve(clientPath, entryFileName),
    extensions: config.script.extensions.map(x => `.${x.trim('.')}`),
    layout: config.script.layout,
    scriptBundleName: config.script.name,
    publicPath: config.server.assets.path,
  };
}

function parseOptions(env) {
  const projectFile = env.projectFile;
  const projectPath = path.dirname(projectFile);

  return Promise.resolve()
    .then(() => console.log('[Start] Parse options. Environment = ', env))
    .then(() => readFile(path.resolve(projectPath, 'web.config')))
    .catch(() => readFile(path.resolve(projectPath, 'app.config')))
    .catch(() => '<configuration></configuration>')
    .then(content => parseConfig(content))
    .then(config => buildOptions(config, env, projectFile, projectPath))
    .then(options => console.log('[Finish] Parse options. Options = ', options) || options);
}

module.exports = parseOptions;
module.exports.parseConfig = parseConfig;
