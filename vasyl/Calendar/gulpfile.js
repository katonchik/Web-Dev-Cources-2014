var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');

gulp.task('default', function() {
    gulp.src('./source/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCss("./main.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/style'))

});
