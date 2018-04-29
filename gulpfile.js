var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            port: 82,
            livereload: false,
            directoryListing: true,
            open: true
        }));
});

gulp.task('default', ['webserver']);