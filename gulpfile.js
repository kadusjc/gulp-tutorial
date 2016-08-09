const gulp = require('gulp')
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin')
const autoprefix = require('gulp-autoprefixer')
const minifyCSS = require('gulp-minify-css')
const minify = require('gulp-minify')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()
const preprocess = require('gulp-preprocess');
const del = require('del')

gulp.task('default', ['images', 'styles', 'scripts'])

gulp.task('server', ['images', 'styles', 'scripts'], () => {
  browserSync.init({
      open: false,
      notify: false,
      port: 3001,
      server: {
        baseDir: './public'
      }
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

gulp.task('watch', ['server'], () => {
  gulp.watch('src/styles/*.css', () => {
    gulp.run('styles')
  })

  gulp.watch('src/images/**/*', () => {
    gulp.run('images')
  })

  gulp.watch('src/scripts/**/*', () => {
    gulp.run('scripts')
  })
})

gulp.task('images', () => {
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

gulp.task('styles', () => {
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
    .pipe(preprocess())
    .pipe(concat('all-scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/'))
    .pipe(browserSync.reload({
      stream: true
    }))
})
