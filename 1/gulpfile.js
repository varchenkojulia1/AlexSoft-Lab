"use strict";

let gulp = require('gulp');
let sass = require('gulp-sass')

sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./styles/scss/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles'))
    }
)

gulp.task('watch', () => {
    gulp.watch('./styles/scss/**.scss', gulp.series('sass'))
})