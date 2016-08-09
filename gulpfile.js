const gulp = require('gulp')
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin')
const autoprefix = require('gulp-autoprefixer')
const minifyCSS = require('gulp-minify-css')
const minify = require('gulp-minify')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()
const del = require('del')

gulp.task('default', ['images', 'styles', 'scripts']);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})

gulp.task('clean', function() {
 return del([
    'public/images',
    'public/scripts',
    'public/styles',
    '!public/index.html'
  ])
})

gulp.task('watch', ['browserSync', 'default'], function () {
  gulp.watch('src/styles/*.css', function() {
    gulp.run('styles');
  })

  gulp.watch('src/images/**/*', function() {
    gulp.run('images');
  })

  gulp.watch('src/scripts/**/*', function() {
    gulp.run('scripts');
  })
})

gulp.task('images', function() {
  const imgSrc = 'src/images/**/*'
  const imgDest = 'public/images'

gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('styles', function() {
  gulp.src(['src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/styles/'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('scripts', () => {
  gulp.src('src/scripts/**/*.js')
   .pipe(concat('all-scripts.js'))
   .pipe(uglify())
   .pipe(gulp.dest('public/scripts/'))
   .pipe(browserSync.reload({
      stream: true
    }))
})
