require('babel/register');

const gulp = require('gulp');
const gutil = require('gulp-util');
const options = require('./gulp/options');

gulp.task('init', function _init() {
  return options.initialize();
});

gulp.task('clean', ['init'], function _clean(done) {
  const rimraf = require('rimraf');
  gutil.log('Clean up client path:', options.clientPath);
  rimraf(options.clientPath, done);
});

gulp.task('info', ['init'], function _info() {
  gutil.log('Build runs at debug mode?', options.debug);
  gutil.log('Build runs in TFS machine?', options.tfsBuild);
  gutil.log('Project file:', options.projectFile);
  gutil.log('Client path:', options.clientPath);
  gutil.log('Current working directory:', process.cwd());
  gutil.log('Path environment variable:', process.env.PATH);
});

gulp.task('index', ['init', 'clean'], function _index() {
  const buildIndex = require('./gulp/build-index');
  const projectFile = options.projectFile;
  const clientPath = options.clientPath;

  return gulp.src(projectFile)
    .pipe(buildIndex())
    .pipe(gulp.dest(clientPath));
});

gulp.task('index-mapping', ['init', 'index'], function _indexMapping(done) {
  const path = require('path');
  const fs = require('fs');
  const pathMapping = require('./gulp/build-index').pathMapping;
  const content = JSON.stringify(pathMapping, null, 4);
  const filePath = path.resolve(options.clientPath, 'index.map');
  fs.writeFile(filePath, content, done);
});

gulp.task('webpack', ['init', 'index', 'index-mapping'], function _webpack() {
  const webpack = require('./gulp/webpack');
  return webpack(options);
});

gulp.task('default', ['info', 'clean', 'webpack']);
