var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var uglifyify = require('uglifyify');

var autoprefixer = require('gulp-autoprefixer');

gulp.task('concat-stylus', function () {
    return gulp.src('./blocks/**/*.styl')
        .pipe(concat('index.styl'))
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('browserify', function() {
    return browserify('./blocks/app.jsx')
        .transform(reactify)
        // .transform(uglifyify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./public/js/weather/'));
});

gulp.task('styles', ['concat-stylus']);
gulp.task('scripts', ['browserify']);

gulp.task('watch', function () {
    gulp.watch('./blocks/**/*.styl', ['styles']);
    gulp.watch('./blocks/**/*.jsx', ['browserify']);
});

gulp.task('default', ['styles', 'browserify', 'watch']);