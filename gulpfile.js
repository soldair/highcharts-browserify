var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');

var SRC_SUFFIX = '.src.js';

var modules = [];

fs.readdirSync(path.join(__dirname, '/highcharts/modules')).filter(function (file) {
  return file.substring(file.length - SRC_SUFFIX.length) === SRC_SUFFIX;
}).forEach(function (file) {
  modules.push(file);

  gulp.task(file, ['highcharts-more', 'highcharts-3d'], function() {
    return gulp.src('./highcharts/modules/' + file)
      .pipe(wrap('var $ = jQuery = require(\'jquery\');\n' +
        'var Highcharts = require(\'../\');\n' +
        'var HighchartsMore = require(\'../more\');\n' +
        '<%= contents %>;\n' +
        'module.exports = window.Highcharts;\n' +
        'module.exports.$ = $;'))
      .pipe(rename(file.substring(0, file.length - SRC_SUFFIX.length) + '.js'))
      .pipe(gulp.dest('./modules'));
   });
});

var themes = [];

fs.readdirSync(path.join(__dirname, '/highcharts/themes')).forEach(function (file) {
  themes.push(file);

  gulp.task(file, function() {
    return gulp.src('./highcharts/themes/' + file)
      .pipe(wrap('var Highcharts = require(\'../\');\n' +
        '<%= contents %>;\n' +
        'module.exports = window.Highcharts;'))
      .pipe(gulp.dest('./themes'));
   });
});

gulp.task('browser', modules.concat(themes), function () {
  return gulp.src([
    './highcharts/highcharts.src.js'
  ])
    .pipe(concat('browser.js'))
    .pipe(wrap('var $ = jQuery = require(\'jquery\');\n' +
      '<%= contents %>;\n' +
      'module.exports = window.Highcharts;\n' +
      'module.exports.$ = $;'))
    .pipe(gulp.dest('.'));
});

gulp.task('highcharts-more', function () {
  return gulp.src([
    './highcharts/highcharts-more.src.js'
  ])
    .pipe(concat('more.js'))
    .pipe(wrap('var $ = jQuery = require(\'jquery\');\n' +
      'var Highcharts = require(\'./\');\n' +
      '<%= contents %>;'))
    .pipe(gulp.dest('.'));
});

gulp.task('highcharts-3d', function () {
  return gulp.src([
    './highcharts/highcharts-3d.src.js'
  ])
    .pipe(concat('3d.js'))
    .pipe(wrap('var $ = jQuery = require(\'jquery\');\n' +
      'var Highcharts = require(\'./\');\n' +
      '<%= contents %>;\n' +
      'module.exports = window.Highcharts;\n' +
      'module.exports.$ = $;'))
    .pipe(gulp.dest('.'));
});

gulp.task('server', function () {
  return gulp.src([
    './servershim.js',
    './highcharts/adapters/standalone-framework.js',
    './highcharts/highcharts.src.js'
  ])
    .pipe(concat('index.js'))
    .pipe(wrap('<%= contents %>;\n' +
      'module.exports = window.Highcharts;'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['browser', 'server']);
