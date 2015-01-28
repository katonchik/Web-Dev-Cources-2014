/**
 * Created by User on 25.01.2015.
 */

var gulp         = require('gulp');
var sass         = require('gulp-sass');;
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var concat       = require('gulp-concat');
var order        = require('gulp-order');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');

gulp.task('css', function(){
    gulp.src('./src/style/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            remove: true
        }))
        .pipe(concat('main.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('build/style'));
});

gulp.task('js', function(){
    gulp.src('./src/js/*.js')
        .pipe(order([
            "src/js/dropzone.js",
            "src/js/game_of_life.js"
        ]))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('html', function(){
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('browser-sync', function() {
    browserSync({
        browser: ["firefox"],
        server: {
            baseDir: "build"
        },
        open: false
    });
});

gulp.task('default', ['css', 'js', 'html', 'browser-sync'], function(){
    gulp.watch("src/style/*.scss", ['css', browserSync.reload]);
});


