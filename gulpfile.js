var del             = require('del'),
    gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    data            = require('gulp-data'),
    shell           = require('gulp-shell'),
    uglify          = require('gulp-uglify'),
    ghPages         = require('gulp-gh-pages'),
    imagemin        = require('gulp-imagemin'),
    sourcemaps      = require('gulp-sourcemaps'),
    browserSync     = require('browser-sync'),
    runSequence     = require('run-sequence').use(gulp),
    nunjucksRender  = require('gulp-nunjucks-render');

// Clean Dist
gulp.task('clean', function () {
  return del(['public']);
});

// Browser Sync
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
});

// Sass
gulp.task('sass', function () {
  // Gets all files ending with .scss in source/sass
  return gulp.src('source/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('vendor', function () {
  return gulp.src('source/static/vendor/**/*')
    .pipe(gulp.dest('public/vendor'));
});

gulp.task('image', function () {
  return gulp.src('source/static/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

gulp.task('js', function () {
  return gulp.src('source/static/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

// Nunjucks
// gulp.task('nunjucks', function () {
//   nunjucksRender.nunjucks.configure(['source/templates/']);

//   // Gets .html and .nunjucks files in pages
//   return gulp.src('source/templates/**/[^_]*.html')
//     // Renders template with nunjucks
//     .pipe(nunjucksRender({ path: 'source/templates' }))
//     // output files in app folder
//     .pipe(gulp.dest('public'))
//     .pipe(browserSync.reload({ stream: true }));
// });

gulp.task('nunjucks', function() {
  return gulp.src('source/templates/**/*.+(html|nunjucks)')
    // Adding data to Nunjucks
    .pipe(data(function() {
      return require('./source/data/data.json')
    }))
    .pipe(nunjucksRender({
      path: ['source/templates']
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('push-gh-master', shell.task(['git push origin master']));

gulp.task('push-gh-pages', function () {
  return gulp.src('public/**/*')
    .pipe(ghPages({ force: true }));
});

gulp.task('deploy', function (callback) {
  runSequence(
    'clean',
    ['sass', 'js', 'image', 'nunjucks', 'vendor'],
    'push-gh-master',
    'push-gh-pages',
    callback
  );
});

gulp.task('watch', function () {
  gulp.watch('source/static/**/*.js', ['js']);
  gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch('source/templates/**/*.html', ['nunjucks']);
  gulp.watch('source/static/vendor/**/*.js', ['vendor']);
  gulp.watch('source/static/vendorimages/**/*', ['images']);
});

gulp.task('default', function (callback) {
  runSequence(
    'clean',
    ['sass', 'js', 'image', 'nunjucks', 'vendor'],
    ['browserSync', 'watch'],
    callback
  );
});
