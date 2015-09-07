import path from 'path';
import xpath from 'xpath';
import through from 'through2';
import options from './options';
import { DOMParser } from 'xmldom';
import { PluginError } from 'gulp-util';

const PLUGIN_NAME = 'build-entry';
const PROJ_NAMESPACE = 'http://schemas.microsoft.com/developer/msbuild/2003';
const XPATH_SELECTOR = '//proj:Content/@Include | //proj:None/@Include';

let pathMappingCount = 0;
const pathMapping = {};

function requireLibrary(libirary) {
  const libiraryPath = libirary[0] === '.'
    ? path.resolve(__dirname, libirary)
    : libirary;

  const libiraryPathString = JSON.stringify(libiraryPath);
  return `require(${libiraryPathString})`;
}

function requireView(view) {
  const projectPath = options.projectPath;
  const viewPath = path.resolve(projectPath, view);
  return requireLibrary(viewPath);
}

function formatLine(line) {
  const filePath = line[0];
  const key = pathMappingCount++;
  const value = line[1];
  pathMapping[filePath] = key;
  return `  ${key}: ${value} /* ${filePath} */`;
}

function buildEntryCode(items) {
  const lookup = items
    .filter(file => options.extensions.indexOf(path.extname(file)) !== -1)
    .map(file => [file.replace(/\\/g, '/'), requireView(file)]);

  const requireRender = requireLibrary('../client/render.js');
  const lookupCode = lookup.map(formatLine).join(',\n');
  const requireLayout = requireView(options.layout);
  const renderCode = `module.exports = ${requireRender}({\n${lookupCode}\n}, ${requireLayout});`;

  return renderCode;
}

function buildEntryFile(file) {
  const contents = file.contents.toString();
  const doc = new DOMParser().parseFromString(contents);
  const select = xpath.useNamespaces({ 'proj': PROJ_NAMESPACE });
  const items = select(XPATH_SELECTOR, doc).map(node => node.value);
  const code = buildEntryCode(items);

  // TODO wait for new version vinyl, see wearefractal/vinyl-fs#71
  file.path = path.join(path.dirname(file.path), options.entryFileName);
  file.contents = new Buffer(code);

  return file;
}

// TODO hack gulp-xpath to meet the requirements, see donum/gulp-xpath#1
function buildEntry() {
  return through.obj((file, enc, done) => {
    if (file.isStream()) {
      const error = new PluginError(PLUGIN_NAME, 'Streams are not supported!');
      done(error);
    } else if (file.isBuffer()) {
      const entryFile = buildEntryFile(file);
      done(null, entryFile);
    } else {
      done(null, file);
    }
  });
}

buildEntry.pathMapping = pathMapping;

export default buildEntry;
