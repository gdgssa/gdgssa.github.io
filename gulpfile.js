'use strict';

var gulp          = require('gulp'),    
    plumber       = require('gulp-plumber'),
    // htmlmin       = require('gulp-htmlmin'),
    browserSync   = require('browser-sync').create(),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    imagemin      = require('gulp-imagemin'),
    ghPages       = require('gulp-gh-pages'),
    sass          = require('gulp-sass'),
    cp            = require('child_process'),    
    env           = require('minimist')(process.argv.slice(2)),
    bourbon       = require('node-bourbon').includePaths,
    path          = require('path');
    

  var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
  };
  
  // * Build the Jekyll Site
  gulp.task('jekyll-build', function (done) {
      browserSync.notify(messages.jekyllBuild);
      return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);    
  });

  // gulp.task('minify-html', function() {
  //   return gulp.src('_site/**/*.html')
  //     .pipe(htmlmin({collapseWhitespace: true}))
  //     .pipe(gulp.dest('_site'));
  // });


  // * Rebuild Jekyll & do page reload
  gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
  });

  // * Wait for jekyll-build, then launch the Server
  gulp.task('browser-sync', ['jekyll-build'], function() {
      browserSync.init({
          server: {
          baseDir: '_site'
          },
          port: 4000
      });
  });

  gulp.task('sass', function () {
    gulp.src('_src/sass/main.scss')
      .pipe(plumber())
      .pipe(sass({
          includePaths: ['styles'].concat(bourbon)
      }).on('error', sass.logError))
          .pipe(gulp.dest('_site/assets/css'))
          .pipe(browserSync.reload({stream:true}))
          .pipe(gulp.dest('assets/css/'));
  });


  // * Javascript Task 
  gulp.task('js', function(){
    return gulp.src((env.p) ? '_src/js/**.js' : ['_src/js/**/*.js', '!_src/js/analytics.js'])
      .pipe(plumber())
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js/'));
  });


  // * JSON Task 
  gulp.task('json', function(){
      return gulp.src('_src/json/**/*.json')
      .pipe(plumber())
      .pipe(gulp.dest('assets/json/'))
      .pipe(gulp.dest('_site/assets/json/'))
  });

  // * Imagemin Task
  gulp.task('imagemin', function() {
      return gulp.src('_src/img/**/*.{jpg,png,gif}')
      .pipe(plumber())
      .pipe(gulp.dest('assets/img/'));
  });


// * Apply assets Task 
// gulp.task('apply-assets', function(){
//     return gulp.src('assets/**/*')
//     .pipe(plumber())
//     .pipe(gulp.dest('_site/assets/'))
// });


/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_src/js/**/*.js', ['js']);
    gulp.watch('_src/json/**/*.json', ['json']);
    gulp.watch('_src/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch('_src/sass/**/*.scss', ['sass']);
    gulp.watch(['*.html','index.html', '_includes/*.html', '_layouts/*.html', '_posts/*', '**/*.md', '**/*.html'], ['jekyll-rebuild'/*, 'minify-html'*/]);
});

gulp.task('deploy', function() {
  return gulp.src('./_site/**/*')
  .pipe(ghPages());
});

gulp.task('build', ['badge', 'js', 'json',  'sass']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'json', 'sass', 'browser-sync'/*, 'minify-html'*/, 'watch']);


