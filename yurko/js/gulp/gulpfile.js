var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var rjs = require('gulp-requirejs');

gulp.task('compressjs', function() {
    gulp.src('./src/scripts/**/*.js')
        .pipe(concat('all.js'))
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./dist/scripts'))
});


gulp.task('sass', function () {
    gulp.src('./js/sorting/src/style/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./js/sorting/dist/style/css'));
});

gulp.task('requirejsBuild', function() {
    rjs({
        baseUrl: './src/scripts/**/*.js',
        out: 'all-min.js',
        shim: {            // standard require.js shim options
            //
        }
        // ... more require.js options
    })
        .pipe(gulp.dest('./dist/scripts')); // pipe it to the output DIR
});