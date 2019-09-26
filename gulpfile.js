/**
 * @file 文件说明
 * @author mengqingchun002@ke.com
 * @date 2019/7/2 20:58
 */
const gulp = require('gulp');

const babel = require('gulp-babel');
const less = require('gulp-less');
const revCollector = require('gulp-rev-collector');


const del = require('del');
const path = require('path');

const {
    src, task, series, parallel,
} = gulp;

function clean() {
    return del(['./lib']);
}


function complieCss() {
    src('src/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'src', 'includes')],
        }))
        // .pipe(minifyCss())
        .pipe(gulp.dest('lib'));
}

function complieJs() {
    src(['gulp.json', 'src/**/*.js'])
        .pipe(revCollector())
        .pipe(babel({
            presets: ['@babel/env'],
        }))
    // .pipe(minify())
        .pipe(gulp.dest('lib'));
}


task('clean', async () => clean());

task('complieCss', async () => complieCss());

task('complieJs', async () => complieJs());

task('build', series('clean', parallel(
    'complieCss', 'complieJs'

)));
