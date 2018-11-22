'use strict';
/*
* @todo ADAPTER aux besoins du projet
* */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var svgSprite = require("gulp-svg-sprites");
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded', includePaths: ["scss/"]}))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('browser-sync', function () {
    browserSync.init(["assets/css/!*.css", "./!*.html", "assets/js/!*.js"], {
        server: {
            baseDir: "./"
        }
    });
    /*  Pour le PHP on utilise un proxy
    *   Remplacer le USER et le NOMPROJET */
    /* browserSync.init(["assets/css/*.css", "./*.php", "assets/js/!*.js"], {
        watch:true,
        proxy: "localhost/~USER/quiz"
    }); */
});

gulp.task('sprites', function () {
    return gulp.src('./assets/svg/*.svg')
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest('./assets'));
});

// Tâche 'js'
gulp.task('uglify', function() {
    return gulp.src('./assets/js/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest('./assets/js/'))
});

// Tâche par défaut
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['sass']);
});