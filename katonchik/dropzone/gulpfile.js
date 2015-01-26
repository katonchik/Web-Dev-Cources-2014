/**
 * Created by User on 25.01.2015.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
    gulp.src('./src/style/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/style'));
});

gulp.task('js', function(){
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./build/js'));
});

gulp.task('html', function(){
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('default', function() {
    var client = ['sass', 'js', 'html'];
    gulp.run('sass');
    gulp.run('js');
    gulp.run('html');
    gulp.watch('./src/style/*.scss', client);
});


