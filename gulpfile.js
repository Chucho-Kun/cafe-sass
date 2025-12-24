import { src, dest, watch, series } from 'gulp';
import gulpSass from 'gulp-sass';
import * as sassCompiler from 'sass';
const sass = gulpSass(sassCompiler);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import shell from 'gulp-shell';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from "cssnano";

// CSS
export function css() {
    return src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano() ]))
        .pipe( sourcemaps.write('.') )
        .pipe(dest('build/css'));
}

// Optimización imágenes con cwebp
export function imgWebp() {
    return src('src/img/**/*.{jpg,jpeg,png}', { read: false })
        .pipe(shell([
            // file.relative incluye subcarpetas, se respeta la estructura
            'cwebp "<%= file.path %>" -q 50 -o "build/img/<%= file.relative.replace(/\\.[^.]+$/, ".webp") %>"'
        ], { ignoreErrors: true }));
}
export function imgWebpGaleria() {
    return src('src/galeria/**/*.{jpg,jpeg,png}', { read: false })
        .pipe(shell([
            // file.relative incluye subcarpetas, se respeta la estructura
            'cwebp "<%= file.path %>" -q 50 -o "build/galeria/<%= file.relative.replace(/\\.[^.]+$/, ".webp") %>"'
        ], { ignoreErrors: true }));
}



// Watcher
export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*.{jpg,jpeg,png}', imgWebp);
    watch('src/galeria/**/*.{jpg,jpeg,png}', imgWebpGaleria);
}

export default series(css, imgWebp, imgWebpGaleria, dev);
