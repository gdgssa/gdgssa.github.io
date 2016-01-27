'use strict';

import gulp         from 'gulp';
import path         from 'path';
import browserify   from 'browserify';
import babelify     from 'babelify';
import source       from 'vinyl-source-stream';
import watchify     from 'watchify';
import serve        from 'browser-sync';
import rename       from 'gulp-rename';
import sass         from 'gulp-sass';

let reload = () => serve.reload();
let root = 'www';
let pathJoin = (pathOut, join) => {
  pathOut = pathOut || '';
  join = join || '';
  return path.join(root, pathOut, join);
};

let paths = {
  js: pathJoin('js/', '**/*!(.spec.js).js')
  , sass: ['./scss/**/*.scss']  
  , html: [
    path.join(root, 'index.html')
    , pathJoin('components/', '**/*.html')
  ]
}

gulp.task('sass', () => {
  gulp.src('./scss/index.scss')
    .pipe(sass().on('error', sass.logError))   
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename('main'))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
});

gulp.task('watch', () => {
  let allPaths = [].concat([paths.js], paths.html, [paths.sass]);
  gulp.watch(allPaths, ['sass', reload]);
});

gulp.task('serve', () => {
  serve({
    port: process.env.PORT || 4000,
    open: false,
    server: { baseDir: root }
  });
});

gulp.task('default', (done) => {
  sync('serve','sass','watch', done);
  console.log('Serviço iniciado... let\'s player');
});