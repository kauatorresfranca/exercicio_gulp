const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')

function comprimagem(){
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript (){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'))
}

function funcaoPadrao(callback){
    setTimeout(function() {
        console.log('executando via gulp')
        callback()

    },2000)
}

function dizOi(callback){
    console.log('olá gulp')
    dizTchau()
    callback()
}

function dizTchau(){
    console.log('tchau gulp')
    }
exports.default = gulp.parallel(funcaoPadrao, dizOi)
exports.dizOi = dizOi
exports.sass = compilaSass
exports.watch = function(){
    gulp.watch('./source/styles/*.scss',{ignoreInitial: false}, gulp.series(compilaSass))
}
exports.javascripts = comprimeJavaScript
exports.images = comprimagem