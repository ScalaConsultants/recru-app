/* eslint-disable no-undef, no-console */
import bg from 'gulp-bg';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import yargs from 'yargs';
import webpackBuild from './webpack/build';

const args = yargs
  .alias('p', 'production')
  .argv;

const runEslint = () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task('env', (done) => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
  done();
});

gulp.task('clean', done => del('build/*', done));

gulp.task('build', gulp.series('env',  done => webpackBuild(done)));

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  // Exit process with an error code (1) on lint error for CI build.
  return runEslint().pipe(eslint.failAfterError());
});

gulp.task('test', gulp.series(['eslint-ci', 'build', 'clean']));


gulp.task('server-node', bg('babel-node', './src/server'));

gulp.task('server-hot', bg('babel-node', './webpack/server'));

gulp.task('server-nodemon', bg('nodemon', '--exec', 'NODE_ENV=development babel-node', 'src/server'));

gulp.task('server-prod', gulp.series('clean', 'build', 'server-node'));
gulp.task('server-dev', gulp.parallel('server-hot', 'server-nodemon'));


if (args.production) {
  gulp.task('default', gulp.series(['server-prod']));
}
else {
  gulp.task('default', gulp.series(['server-dev']));
}

