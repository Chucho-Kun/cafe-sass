const { src, dest, watch , series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done ) {
    // compilar sass
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]))
        .pipe( dest('build/css') )
    
    done();
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
}

function tareaDefault(){
    console.log('Soy tarea por default....');
    
}

exports.css = css;
exports.dev = dev;
exports.default = series( css, dev );

// series - atiende una tarea despues de otra
// parallel - todas las tareas inician al mismo tiempo