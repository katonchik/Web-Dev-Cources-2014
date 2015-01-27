var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.src('src/javascript/*.js')
        .pipe(uglify())
        .pipe(concat())
        .pipe(gulp.dest('build/javascript'));

    gulp.src('./src/style/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/style'));

    gulp.src("./src/*.html")
        .pipe(gulp.dest('./build'));
});
