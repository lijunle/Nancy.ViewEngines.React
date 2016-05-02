const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

function mkdir(dirPath) {
  return new Promise((resolve, reject) =>
    mkdirp(dirPath, (error) => error ? reject(error) : resolve()));
}

function readFile(filePath) {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (error, content) =>
      error ? reject(error) : resolve(content)));
}

function writeFile(filePath, content) {
  return new Promise((resolve, reject) =>
    fs.writeFile(filePath, content, 'utf8', (error) =>
      error ? reject(error) : resolve()));
}

function writeFileWithDir(filePath, content) {
  return mkdir(path.dirname(filePath))
    .then(() => writeFile(filePath, content));
}

exports.readFile = readFile;
exports.writeFile = writeFile;
exports.writeFileWithDir = writeFileWithDir;
