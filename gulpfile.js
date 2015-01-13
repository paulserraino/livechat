var gulp = require("gulp")
var watch = require('gulp-watch')
var watchify = require('watchify')
var source = require('vinyl-source-stream')
var browserify = require("browserify")

gulp.task('browserify', function () {
	var b = browserify('./lib/client.js');
	return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function () {
	gulp.watch('./src/js/**/*.js', ['browserify']);
})

gulp.task('default', ['browserify'])
gulp.task('dev', ['browserify', 'watch'])
