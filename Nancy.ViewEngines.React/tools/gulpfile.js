require('babel/register');

const gulp = require('gulp');
const gutil = require('gulp-util');
const options = require('./gulp/options');

gulp.task('init', function _init() {
  return options.initialize();
});

gulp.task('info', ['init'], function _info() {
  gutil.log('Build runs at debug mode?', options.debug);
  gutil.log('Build runs in TFS machine?', options.tfsBuild);
  gutil.log('Project file:', options.projectFile);
  gutil.log('Client path:', options.clientPath);
  gutil.log('Current working directory:', process.cwd());
  gutil.log('Path environment variable:', process.env.PATH);
});

gulp.task('index', ['init'], function _index() {
  const buildIndex = require('./gulp/build-index');
  const projectFile = options.projectFile;
  const clientPath = options.clientPath;

  return gulp.src(projectFile)
    .pipe(buildIndex())
    .pipe(gulp.dest(clientPath));
});

gulp.task('webpack', ['init', 'index'], function _webpack() {
  const webpack = require('./gulp/webpack');
  return webpack(options);
});

gulp.task('clean-index', ['init', 'webpack'], function _cleanIndex(done) {
  const fs = require('fs');
  gutil.log('Remove intermedia index file:', options.indexPath);
  fs.unlink(options.indexPath, done);
});

gulp.task('default', ['info', 'webpack', 'clean-index']);
