var eslint = require( 'gulp-eslint' );
var fs = require('fs');
var gulp = require('gulp');
gulp.task('lint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.format('html', fs.createWriteStream('lintReports/lint_report.html')))
      .pipe(eslint.format('checkstyle', fs.createWriteStream('lintReports/checkstyle.xml')))
      .pipe(eslint.failAfterError());
});
// const autoFixTask = require('gulp-eslint-auto-fix')

// autoFixTask('fix-js', [
//   'app/**/*.js',
//   'test/**/*.js'
// ])