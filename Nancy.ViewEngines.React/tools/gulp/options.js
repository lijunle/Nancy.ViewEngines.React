import fs from 'fs';
import path from 'path';
import gutil from 'gulp-util';
import { DOMParser } from 'xmldom';

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

function toObject(keyValuePairs) {
  return keyValuePairs.reduce((result, keyValuePair) => {
    const key = keyValuePair[0];
    const value = keyValuePair[1];
    result[key] = value;
    return result;
  }, {});
}

function parseList(str, defaultValue) {
  return str ? str.split(';') : defaultValue;
}

function parseConfig(projectPath) {
  return Promise.resolve()
    .then(() => {
      const webConfig = path.resolve(projectPath, 'web.config');
      return readFile(webConfig);
    })
    .catch(() => {
      // if web.config not exist, try app.config
      const appConfig = path.resolve(projectPath, 'app.config');
      return readFile(appConfig);
    })
    .catch(() => {
      // if app.config not exist too, return empty contents
      return '<contents></contents>';
    })
    .then(contents => {
      // TODO provide a dedicated section for project settings
      const doc = new DOMParser().parseFromString(contents, 'text/xml');
      const entries = Array.from(doc.getElementsByTagName('add'))
        .filter(entry => entry.hasAttribute('key'))
        .map(entry => [entry.getAttribute('key'), entry.getAttribute('value')]);

      const result = toObject(entries);
      return result;
    });
}

function _parseConfig(config) { // eslint-disable-line no-unused-vars
  return new Promise(resolve => {
    resolve({
      script: {
        dir: 'client',
        name: 'script.js',
        extensions: [],
      },
      server: {
        assets: {
          path: 'assets',
        },
      },
    });
  });
}

export default {
  debug: gutil.env.configuration !== 'Release',
  tfsBuild: process.env.TF_BUILD === 'True',
  projectFile: (gutil.env.projectFile || __filename).trim(), // default value for testing only
  entryFileName: 'entry.map',

  _readFile: readFile,

  _parseConfig: _parseConfig,

  initialize() {
    const options = this;
    const projectPath = path.dirname(options.projectFile);
    options.projectPath = projectPath;

    return parseConfig(projectPath).then(config => {
      const outputPath = (gutil.env.outputPath || 'bin').trim();
      const clientRelativePath = config.clientPath || 'client';
      const clientPath = path.resolve(projectPath, outputPath, clientRelativePath);

      options.clientPath = clientPath;
      options.entryPath = path.resolve(clientPath, options.entryFileName);
      options.webpackLockPath = path.resolve(clientPath, 'webpack.lock');

      options.extensions = parseList(config.extensions, ['jsx']).map(x => `.${x.trim('.')}`);
      options.layout = config.layout || path.resolve(__dirname, '../client/layout.jsx');
      options.scriptBundleName = config.scriptBundleName || 'script.js';

      options.publicPath = config.publicPath || 'assets';
    });
  },
};
