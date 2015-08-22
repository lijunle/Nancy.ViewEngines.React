import fs from 'fs';
import path from 'path';
import gutil from 'gulp-util';
import rework from 'gulp-rework';
import reworkUrl from 'rework-plugin-url';
import options from './options';

const filePaths = new Set();

function isUrl(url) {
  return (/^([\w]+:)?\/\/./).test(url);
}

function isDataUrl(url) {
  return url && url.indexOf('data:') === 0;
}

export function rewriteUrl() {
  return rework(reworkUrl(function _rewriteUrl(url) {
    if (isUrl(url) ||
        isDataUrl(url) ||
        path.extname(url) === '.css' ||
        path.resolve(url) === url) {
      return url;
    }

    // restore the url source file path to filePaths
    const sourcePath = this.position.source;
    const filePath = path.resolve(path.dirname(sourcePath), url).replace(/[?#].*$/, '');
    filePaths.add(filePath);

    const basename = path.basename(url);
    return `/${options.publicPath}/${basename}`;
  }));
}

function copyFile(filePath) {
  return new Promise(resolve => {
    const stream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    const destination = path.resolve(options.clientPath, fileName);

    stream.pipe(fs.createWriteStream(destination));
    stream.on('end', () => {
      gutil.log(`File ${fileName} is copied to target folder.`);
      resolve();
    });
  });
}

export function copyFiles() {
  const copyFilesPromises = Array.from(filePaths).map(copyFile);
  return Promise.all(copyFilesPromises);
}
