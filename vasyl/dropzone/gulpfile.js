var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var browserSync  = require('browser-sync');

gulp.task('css', function() {
    gulp.src('./source/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove:true
        }))
        .pipe(concatCss("./main.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/style'))
});


gulp.task('html', function(){
    gulp.src('./*.html')
        .pipe(gulp.dest('./build'));
});
gulp.task('browser-sync', function() {
    browserSync({
        browser: ["opera"],
        server: {
            baseDir: "build"
        },
        open: false
    });
});

gulp.task('default', ['css', 'html', 'browser-sync'], function(){
    gulp.watch("source/style/*.scss", ['css', browserSync.reload]);
});
