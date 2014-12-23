var gulp = require('gulp');
var requireDir = require('require-dir');
var config = require('config');


requireDir('./gulp/tasks', {recurse: true});

gulp.task('default', config.get('gulp.default'));
