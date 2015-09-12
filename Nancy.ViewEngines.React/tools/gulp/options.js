import fs from 'fs';
import path from 'path';
import gutil from 'gulp-util';
import { parseString } from 'xml2js';

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (error, contents) => {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}

function get(obj, property, ...args) {
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

export default {
  debug: gutil.env.configuration !== 'Release',
  tfsBuild: process.env.TF_BUILD === 'True',
  projectFile: (gutil.env.projectFile || __filename).trim(), // default value for testing only
  entryFileName: 'entry.map',

  _readFile: readFile,

  _parseConfig: parseConfig,

  initialize() {
    const options = this;
    const projectPath = path.dirname(options.projectFile);
    options.projectPath = projectPath;

    return Promise.resolve()
      .then(() => readFile(path.resolve(projectPath, 'web.config')))
      .catch(() => readFile(path.resolve(projectPath, 'app.config')))
      .catch(() => '<configuration></configuration>')
      .then(parseConfig)
      .then(config => {
        const outputPath = (gutil.env.outputPath || 'bin').trim();

        options.clientPath = path.resolve(projectPath, outputPath, config.script.dir);
        options.entryPath = path.resolve(options.clientPath, options.entryFileName);

        options.extensions = config.script.extensions.map(x => `.${x.trim('.')}`);
        options.layout = config.script.layout || path.resolve(__dirname, '../client/layout.jsx'); // TODO
        options.scriptBundleName = config.script.name;

        options.publicPath = config.server.assets.path;
      });
  },
};
