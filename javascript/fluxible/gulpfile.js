var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var reactify = require('reactify');
var watchify = require('watchify');
var gulpif = require('gulp-if');
var compass = require('gulp-compass');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
/************************************************
 *
 *          environment Configuration
 *
 ************************************************/

/**
 * exec: npm run-script debug/dev/prod
 *
 * environment
 *  "prod", "dev"
 */
var env = process.env.NODE_ENV || 'dev';

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

var watchConfig = [
    './**/*',
    '!./node_modules/**/*',
    '!./build/**/*',
    '!./gulpfile.js'
];

var nodemonConfig = {
    script: './env/server.js',
    ext: 'js jsx scss',
    ignore: [
        './node_modules/**/*',
        './build/**/*',
        'gulpfile.js'
    ]
};

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
        return stream.pipe(gulp.dest(paths.destDir)).pipe(livereload());
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
            css: './assets/css',
            sass: './assets/scss',
            image: './assets/images'
        }))
        .pipe(minifyCSS({
            noAdvanced: false,
            keepBreaks: true,
            cache: true // this add-on is gulp only
        }))
        .pipe(gulp.dest(paths.destCSS));
});

/**
 *  production task
 */
gulp.task('prod', ['scripts', 'compass']);

/**
 *  development task
 */
gulp.task('dev', ['watchScripts', 'compass'], function(){
    livereload.listen();
    nodemon(nodemonConfig)
        .on('change', ['compass'])
        .on('restart', function() {
            console.log('restarted!, reload the page')
            gulp.src('./bind/bundle.js').pipe(livereload());
        });
});

/************************************************
 *
 *          exec task
 *
 ************************************************/

gulp.task('default', [env]);
