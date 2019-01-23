var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            fallback: 'index.html',
            port: 3000,
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', ['webserver']);