import fs from 'fs';
import path from 'path';
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

export default {
  _readFile: readFile,

  _parseConfig: parseConfig,

  initialize(env) {
    const outputPath = (env.outputPath || 'bin').trim();

    this.entryFileName = 'entry.map';
    this.debug = env.configuration !== 'Release';
    this.projectFile = (env.projectFile || __filename).trim();
    this.projectPath = path.dirname(this.projectFile);

    return Promise.resolve()
      .then(() => readFile(path.resolve(this.projectPath, 'web.config')))
      .catch(() => readFile(path.resolve(this.projectPath, 'app.config')))
      .catch(() => '<configuration></configuration>')
      .then(parseConfig)
      .then(config => {
        this.clientPath = path.resolve(this.projectPath, outputPath, config.script.dir);
        this.entryPath = path.resolve(this.clientPath, this.entryFileName);

        this.extensions = config.script.extensions.map(x => `.${x.trim('.')}`);
        this.layout = config.script.layout;
        this.scriptBundleName = config.script.name;

        this.publicPath = config.server.assets.path;
      });
  },
};
