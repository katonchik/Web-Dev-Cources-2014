var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('compressjs', function() {
    gulp.src('./js/sorting/src/scripts/**/*.js')
        .pipe(concat('all.js'))
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./js/sorting/dist/scripts'))
});


gulp.task('sass', function () {
    gulp.src('./js/sorting/src/style/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./js/sorting/dist/style/css'));
});
