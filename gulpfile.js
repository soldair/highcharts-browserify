var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');

var SRC_SUFFIX = '.src.js';

var modules = [];

fs.readdirSync(path.join(__dirname, '/node_modules/highcharts-release/modules')).filter(function (file) {
  return file.substring(file.length - SRC_SUFFIX.length) === SRC_SUFFIX;
}).forEach(function (file) {
  modules.push(file);

  gulp.task(file, ['highcharts-more', 'highcharts-3d'], function() {
    return gulp.src('./node_modules/highcharts-release/modules/' + file)
      .pipe(wrap({ src: './templates/module.txt'}))
      .pipe(rename(file.substring(0, file.length - SRC_SUFFIX.length) + '.js'))
      .pipe(gulp.dest('./modules'));
   });
});

var themes = [];

fs.readdirSync(path.join(__dirname, '/node_modules/highcharts-release/themes')).forEach(function (file) {
  themes.push(file);

  gulp.task(file, function() {
    return gulp.src('./node_modules/highcharts-release/themes/' + file)
      .pipe(wrap({ src: './templates/theme.txt'}))
      .pipe(gulp.dest('./themes'));
   });
});

gulp.task('highcharts', ['highcharts-adapter'].concat(modules).concat(themes), function () {
  return gulp.src([
    './node_modules/highcharts-release/highcharts.src.js'
  ])
    .pipe(concat('index.js'))
    .pipe(wrap({ src: './templates/highcharts.txt'}))
    .pipe(gulp.dest('.'));
});

gulp.task('highcharts-adapter', function () {
  return gulp.src([
    './node_modules/highcharts-release/adapters/standalone-framework.src.js'
  ])
    .pipe(concat('standalone-framework.js'))
    .pipe(wrap({ src: './templates/adapter.txt'}))
    .pipe(gulp.dest('./adapters'));
});

gulp.task('highcharts-more', function () {
  return gulp.src([
    './node_modules/highcharts-release/highcharts-more.src.js'
  ])
    .pipe(concat('more.js'))
    .pipe(wrap({ src: './templates/more.txt'}))
    .pipe(gulp.dest('.'));
});

gulp.task('highcharts-3d', function () {
  return gulp.src([
    './node_modules/highcharts-release/highcharts-3d.src.js'
  ])
    .pipe(concat('3d.js'))
    .pipe(wrap({ src: './templates/3d.txt'}))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['highcharts']);
