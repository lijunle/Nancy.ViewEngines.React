/* eslint-disable no-console */

const path = require('path');
const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;
const readFile = require('./file').readFile;
const writeFile = require('./file').writeFile;
const writeFileWithDir = require('./file').writeFileWithDir;

const PROJ_NAMESPACE = 'http://schemas.microsoft.com/developer/msbuild/2003';
const XPATH_SELECTOR = '//proj:Content/@Include | //proj:None/@Include';

const requirePolyfill = 'require("babel/polyfill")\n';


function requireLibrary(libirary) {
  const libiraryPath = libirary[0] === '.'
    ? path.resolve(__dirname, libirary)
    : libirary;

  const libiraryPathString = JSON.stringify(libiraryPath);
  return `require(${libiraryPathString})`;
}

function requireView(view, options) {
  const viewPath = path.resolve(options.projectPath, view);
  return requireLibrary(viewPath);
}

function formatLine(line) {
  const filePath = line[0];
  const key = formatLine.pathMappingCount++;
  const value = line[1];
  formatLine.pathMapping[filePath] = key;
  return `  ${key}: ${value} /* ${filePath} */`;
}

formatLine.pathMappingCount = 0;
formatLine.pathMapping = {};

function buildEntryCode(items, options) {
  const lookup = items
    .filter(file => options.extensions.indexOf(path.extname(file)) !== -1)
    .map(file => [file.replace(/\\/g, '/'), requireView(file, options)]);

  const requireRender = requireLibrary('../client/render.js');
  const lookupCode = lookup.map(formatLine).join(',\n');
  const requireLayout = requireView(options.layout, options);
  const renderCode = `${requirePolyfill}module.exports = ${requireRender}({\n${lookupCode}\n}, ${requireLayout});`;

  return renderCode;
}

function buildEntryFile(content, options) {
  const doc = new DOMParser().parseFromString(content);
  const select = xpath.useNamespaces({ 'proj': PROJ_NAMESPACE });
  const items = select(XPATH_SELECTOR, doc).map(node => node.value);
  const code = buildEntryCode(items, options);
  return code;
}

// TODO this function is using a global variable, should refactor.
function writePathMapping(options) {
  const pathMapping = formatLine.pathMapping;
  const content = JSON.stringify(pathMapping, null, 4);
  const filePath = path.resolve(options.clientPath, 'path.map');
  return writeFile(filePath, content);
}

function buildEntry(options) {
  return Promise.resolve()
    .then(() => console.log('[Start] Build entry. Project file:', options.projectFile))
    .then(() => readFile(options.projectFile))
    .then(content => buildEntryFile(content, options))
    .then(content => writeFileWithDir(options.entryFile, content))
    .then(() => writePathMapping(options))
    .then(() => console.log('[End] Build entry. Entry file:', options.entryFile))
    .then(() => options);
}

module.exports = buildEntry;
