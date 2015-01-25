/**
 * ref: http://michaelhsu.tw/2014/06/11/gulp-livereload/
 */

var gulp = require('gulp');

/**
 * Gulp plugin which combine webserver and livereload
 */
var connect = require('gulp-connect');

/**
 * configure the livereload flag
 */
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

/**
 * for all html files, do the reload
 */
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(connect.reload());
});

/**
 * monitor files that match *.* will invoke task 'html'
 */
gulp.task('watch', function() {
    gulp.watch(['*.*'], ['html']);
});

/**
 * start to run gulp tasks
 */
gulp.task('default', ['connect', 'watch']);
