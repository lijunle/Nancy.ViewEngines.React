import path from 'path';
import xpath from 'xpath';
import through from 'through2';
import options from './options';
import { DOMParser } from 'xmldom';
import { PluginError } from 'gulp-util';

const PLUGIN_NAME = 'build-index';
const PROJ_NAMESPACE = 'http://schemas.microsoft.com/developer/msbuild/2003';
const XPATH_SELECTOR = '//proj:Content/@Include | //proj:None/@Include';

function requireLibrary(libirary, indent = 0) {
  const libiraryPath = libirary[0] === '.'
    ? path.resolve(__dirname, libirary)
    : libirary;

  const indention = Array(indent + 1).join(' ');
  const libiraryPathString = JSON.stringify(libiraryPath);

  return `${indention}require(${libiraryPathString})`;
}

function requireView(view) {
  const projectPath = options.projectPath;
  const viewPath = path.resolve(projectPath, view);
  return requireLibrary(viewPath);
}

function formatLine(line) {
  const key = JSON.stringify(line[0]);
  const value = line[1];
  return `  ${key}: ${value}`;
}

function buildIndexCode(items) {
  const lookup = items
    .filter(file => options.extensions.indexOf(path.extname(file)) !== -1)
    .map(file => [file.replace(/\\/g, '/'), requireView(file)]);

  const clientCode = options.clientLibraries.map(x => requireLibrary(x, 2)).join(';\n');
  const ifClientCode = options.clientLibraries.length === 0
    ? ''
    : `if (typeof window !== "undefined") {\n${clientCode};\n}\n\n`;

  const requireRender = requireLibrary('./render.js');
  const lookupCode = lookup.map(formatLine).join(',\n');
  const requireLayout = requireView(options.layout);
  const renderCode = `module.exports = ${requireRender}({\n${lookupCode}\n}, ${requireLayout});`;

  return `${ifClientCode}${renderCode}`;
}

function buildIndexFile(file) {
  const contents = file.contents.toString();
  const doc = new DOMParser().parseFromString(contents);
  const select = xpath.useNamespaces({ 'proj': PROJ_NAMESPACE });
  const items = select(XPATH_SELECTOR, doc).map(node => node.value);
  const code = buildIndexCode(items);

  // TODO wait for new version vinyl, see wearefractal/vinyl-fs#71
  file.path = path.join(path.dirname(file.path), options.indexFileName);
  file.contents = new Buffer(code);

  return file;
}

export default function buildIndex() {
  return through.obj((file, enc, done) => {
    if (file.isStream()) {
      const error = new PluginError(PLUGIN_NAME, 'Streams are not supported!');
      done(error);
    } else if (file.isBuffer()) {
      const indexFile = buildIndexFile(file);
      done(null, indexFile);
    } else {
      done(null, file);
    }
  });
}
