var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch');


gulp.task('style', function () {
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

    gulp.src("./src/img/*.*")
        .pipe(gulp.dest('./build/img/'))
});

gulp.task('default', function () {
    gulp.run('style');
    gulp.watch('./src/style/*.scss', run('style'));
});