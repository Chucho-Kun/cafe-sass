import { src, dest, watch, series } from 'gulp';

// CSS y SASS
import gulpSass from 'gulp-sass';
import * as sassCompiler from 'sass';
const sass = gulpSass(sassCompiler);

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

// Imágenes
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';
import webp from 'gulp-webp';

export function css(done) {
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));
    done();
}

export function imagenes(done) {
    src('src/img/**/*.{png,jpg,jpeg,svg}')
        .pipe(imagemin([
            imageminMozjpeg({ quality: 75, progressive: true }),
            imageminOptipng({ optimizationLevel: 5 }), // mejor equilibrio
            imageminSvgo({
                plugins: [
                    { name: 'removeViewBox', active: false },
                    { name: 'cleanupIDs', active: false }
                ]
            })
        ], {
            verbose: true
        }))
        .pipe(dest('build/img'));
    done();
}


export function imgWebp(done) {
    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(webp({ quality: 75, method: 6 }))
        .pipe(dest('build/img'));
    done();
}


export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

export default series(imgWebp, css, dev);
