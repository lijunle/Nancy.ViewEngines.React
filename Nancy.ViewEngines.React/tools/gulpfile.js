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
  const helper = require('./gulp/webpack-helper');
  return helper.checkLock(options)
    .then(function _checkLock(isLocked) {
      return isLocked
        ? gutil.log('Webpack watch is on, compilation locked.')
        : helper.compile(options);
    });
});

gulp.task('clean-index', ['init', 'webpack'], function _cleanIndex(done) {
  const fs = require('fs');
  gutil.log('Remove intermedia index file:', options.indexPath);
  fs.unlink(options.indexPath, done);
});

gulp.task('style-generate', ['init', 'info'], function _styleGenerate() {
  const helper = require('./gulp/style-helper');
  const concat = require('gulp-concat');
  const minify = require('gulp-minify-css');
  const gulpif = require('gulp-if');

  gutil.log('Style file path:', options.stylePath);

  return gulp.src(options.stylePath)
    .pipe(helper.rewriteUrl())
    .pipe(concat(options.styleBundleName))
    .pipe(gulpif(!options.debug, minify()))
    .pipe(gulp.dest(options.clientPath));
});

gulp.task('style-copy', ['init', 'info', 'style-generate'], function _styleCopy() {
  const helper = require('./gulp/style-helper');
  return helper.copyFiles();
});

gulp.task('style', ['style-generate', 'style-copy']);

gulp.task('default', ['info', 'webpack', 'clean-index', 'style']);
