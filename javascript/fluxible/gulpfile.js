var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var reactify = require('reactify');
var watchify = require('watchify');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var htmlreplace = require('gulp-html-replace');
/************************************************
 *
 *          environment Configuration
 *
 ************************************************/

/**
 * exec: npm run-script debug/dev/prod
 *
 * environment
 *  "prod", "dev", "debug"
 */
var env = process.env.NODE_ENV || 'dev';
var prodBuild = ['scripts', 'compass', 'copy'];
var devBuild = ['watchScripts', 'compass', 'copy', 'watch'];
var task = prodBuild;
/**
 * path
 */
var paths = {
    main: './env/client.js',
    css: './assets/css/*.css',
    sass: './assets/scss/*.scss',
    destDir: './build',
    destCSS: './build/assets/css'
};

/**
 * for dev env settings:
 *     simply start an web server on port 8080
 */
if (env === 'dev') {
    var connect = require('gulp-connect');
    connect.server({
        root: paths.destDir,
        https: true,
        livereload: true
    });
    reload = connect.reload;
    task = devBuild;
}

/************************************************
 *
 *          task Configuration
 *
 ************************************************/

/**
 * @Author: George_Chen
 * @Description: error handler function
 *
 * @param {error}      err, error instance
 */
function handlerError(err) {
    console.log('[錯誤]', err);
    this.end();
    gulp.src('').pipe(notify('✖ Bunlde Failed ✖'))
}

/**
 * @Author: George_Chen
 * @Description: bundle function for browserify
 *
 * @param {Boolean}      watch, watchify flag
 */
function scripts(watch) {
    var bundler, rebundle;
    bundler = browserify(paths.main, {
        basedir: __dirname,
        debug: true,
        cache: {}, // required for watchify
        packageCache: {}, // required for watchify
        fullPaths: watch // required to be true only for watchify
    });
    bundler.transform(reactify);

    if (watch) {
        bundler = watchify(bundler)
    }

    rebundle = function() {
        var stream = bundler.bundle();
        stream.on('error', handlerError);
        stream = stream.pipe(source('bundle.js'));
        if (env === 'prod') {
            return stream.pipe(gulp.dest(paths.destDir));
        }
        return stream.pipe(gulp.dest(paths.destDir)).pipe(connect.reload());
    };

    bundler.on('update', rebundle);
    return rebundle();
}

/**
 * Gulp Task
 * @Author: George_Chen
 * @Description: browserify task, used on production build
 */
gulp.task('scripts', function() {
    return scripts(false);
});

/**
 * Gulp Task
 * @Author: George_Chen
 * @Description: watchify task, used on development/debug build
 */
gulp.task('watchScripts', function() {
    return scripts(true);
});

/**
 * Gulp Task
 * @Author: Jos Tung
 * @Description: auto build sass file to css
 */
gulp.task('compass', function() {
  gulp.src(paths.sass)
    .pipe(compass({
      css: 'app/assets/css',
      sass: 'app/assets/scss',
      image: 'app/assets/images'
    }))
    .pipe(minifyCSS({
            noAdvanced: false,
            keepBreaks: true,
            cache: true // this add-on is gulp only
        }))
    .pipe(gulp.dest(paths.destCSS));
});

/**
 * Gulp Task
 * @Author: George_Chen
 * @Description: copy current app/*.html to build folder
 *     NOTE: for production build, we remove the all devTags on html file
 */
gulp.task('copy', function() {
    gulp.src('app/*.html')
        .pipe(gulpif(env === 'prod', htmlreplace({
            'dev': ''
        })))
        .pipe(gulp.dest(paths.destDir));
    gulp.src('app/lib/*.js')
        .pipe(gulp.dest(paths.destDir+'/lib/'));
});

/**
 * Gulp Task
 * @Author: George_Chen
 * @Description: trigger the page reload, only trigger on "dev"
 */
gulp.task('reload', function() {
    gulp.src(paths.destDir + '/*.html').pipe(connect.reload());
});

/**
 * Gulp Task
 * @Author: George_Chen
 * @Description: monitor files in app, any changed will build again
 */
gulp.task('watch', function() {
    gulp.watch('app/**/*', ['compass', 'copy', 'reload']);
});

/************************************************
 *
 *          exec task
 *
 ************************************************/

gulp.task('default', task);
