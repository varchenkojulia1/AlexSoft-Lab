"use strict";

let gulp = require('gulp');
let sass = require('gulp-sass');
const prettier = require('gulp-prettier');

sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./styles/scss/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles'))
    }
)
gulp.task('build', () => {
    return gulp.src('./jsDev/*.js')
        .pipe(prettier({ printWidth: 100,
            singleQuote: true,
            trailingComma: 'all',
            bracketSpacing: true,
            tabWidth: 2,
            semi: true, }))
        .pipe(gulp.dest('./jsDist'));
});

gulp.task('watch', () => {
    gulp.watch('./styles/scss/**.scss', gulp.series('sass'))
})