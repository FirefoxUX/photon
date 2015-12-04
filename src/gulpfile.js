'use strict';

var gulp = require('gulp');

var babel = require('gulp-babel');
var del = require('del');
var eslint = require('gulp-eslint');
var foreach = require('gulp-foreach');
var include = require('gulp-include');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');

gulp.task('clean', function() {
  return del(['../index.html', '../js', '../styles'], {force: true});
});

gulp.task('eslint', function() {
  return gulp.src(['scripts/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('usemin', ['eslint'], function() {
  return gulp.src('./html/*.html')
    .pipe(include())
    .pipe(foreach(function (stream) {
      return stream.pipe(usemin({
        css: [ minifyCss(), 'concat', rev() ],
        html: [ minifyHtml({ empty: true }) ],
        js: [ babel({presets: ['es2015']}), uglify(), rev() ],
        inlinejs: [ babel({presets: ['es2015']}), uglify() ]
      }));
    }))
    .pipe(gulp.dest('../'));
});

gulp.task('default', ['clean'], function() {
  gulp.start('usemin');
});
