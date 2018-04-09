const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync');

gulp.task('scss', () => {
  return gulp
    .src('dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
});

gulp.task('default', ['browser-sync', 'scss'], () => {
  gulp.watch('dev/scss/**/*.scss', ['scss']);
  gulp.watch('dist/*.html', browserSync.reload);
});
