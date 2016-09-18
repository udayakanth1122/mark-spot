"use strict";
var path_1 = require('path');
var config = {
    gulp: require('gulp'),
    appDir: 'app',
    testDir: 'test',
    testDest: 'www/build/test',
    typingsDir: 'typings',
};
var imports = {
    gulp: require('gulp'),
    runSequence: require('run-sequence'),
    ionicGulpfile: require(path_1.join(process.cwd(), 'gulpfile.js')),
};
var gulp = imports.gulp;
var runSequence = imports.runSequence;
// just a hook into ionic's build
gulp.task('build-app', function (done) {
    runSequence('build', done);
});
// compile E2E typescript into individual files, project directoy structure is replicated under www/build/test
gulp.task('build-e2e', ['clean-e2e'], function () {
    var typescript = require('gulp-typescript');
    var tsProject = typescript.createProject('tsconfig.json');
    var src = [
        path_1.join(config.typingsDir, '/index.d.ts'),
        path_1.join(config.appDir, '**/*e2e.ts'),
    ];
    var result = gulp.src(src)
        .pipe(typescript(tsProject));
    return result.js
        .pipe(gulp.dest(config.testDest));
});
// delete _only_ tests generated on e2e.
// If we delete everything (using Ionic's `clean` task we'll wipe the newly built app we're testing against)
gulp.task('clean-e2e', function () {
    var del = require('del');
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del([config.testDest]).then(function (paths) {
        console.log('Deleted', paths && paths.join(', ') || '-');
    });
});
// run jasmine unit tests using karma with PhantomJS2 in single run mode
gulp.task('karma', function (done) {
    var karma = require('karma');
    var karmaOpts = {
        configFile: path_1.join(process.cwd(), config.testDir, 'karma.config.js'),
        singleRun: true,
    };
    new karma.Server(karmaOpts, done).start();
});
// run jasmine unit tests using karma with Chrome, Karma will be left open in Chrome for debug
gulp.task('karma-debug', function (done) {
    var karma = require('karma');
    var karmaOpts = {
        configFile: path_1.join(process.cwd(), config.testDir, 'karma.config.js'),
        singleRun: false,
        browsers: ['Chrome'],
        reporters: ['mocha'],
        browserify: {
            debug: true,
            plugin: [
                ['tsify'],
            ],
        },
    };
    new karma.Server(karmaOpts, done).start();
});
// run tslint against all typescript
gulp.task('lint', function () {
    var tslint = require('gulp-tslint');
    return gulp.src(path_1.join(config.appDir, '**/*.ts'))
        .pipe(tslint({
        formatter: 'verbose',
    }))
        .pipe(tslint.report());
});
// build unit tests, run unit tests, remap and report coverage
gulp.task('unit-test', function (done) {
    runSequence(['clean'], // Ionic's clean task, nukes the whole of www/build
    ['configure-environment'], ['html'], 
    //['lint', 'html'],
    'karma', done);
});
//# sourceMappingURL=/Users/sripada/Documents/mark-spot/ts-node/42dbbb385b81d478b0e11c14730e14e5e4f27f29/25b8ea80f45107fc324b866c127e3031e248b8ac.js.map