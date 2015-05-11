'use strict';

var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  rework = require('gulp-rework'),
  inherit = require('rework-inherit'),
  vars = require('rework-vars'),
  imprt = require('rework-import'),
  reworkNPM = require('rework-npm'),
  babelify = require('babelify'),
  watchify = require('watchify');
var plugins = require('gulp-load-plugins')();

gulp.task('coverage', function () {
 
    var coverageServer = http.createServer(function (req, resp) {
        req.pipe(fs.createWriteStream('coverage.json'))
        resp.end()
    });
 
    var port = 7358;
    coverageServer.listen(port);
    console.log("Coverage Server Started on port", port);
});
 
gulp.task('testem', ['coverage'], function () {
    gulp.src([''])
        .pipe(plugins.testem({
            configFile: 'testem.json'
        }));
});

gulp.task('nodemon', function () {
  plugins.nodemon({ script: './bin/www', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});
gulp.task('test', function () {
  require('babel/register')({ modules: 'common' });
  return gulp.src('./tests/unit/*_spec.js', {read: false})
        .pipe(plugins.mocha({ reporter: 'spec', compilers: 'js:babel/register' }));
});
 
gulp.task('watch', function() {
    var server = plugins.livereload();

    gulp.watch('./apps/**/**.*' , function(file) {
        gulp.start('watchify');
        server.changed(file.path);
    });
    gulp.watch( './css/**/*.css', function(file) {
        gulp.start('buildcss');
        server.changed(file.path);
    });

});
 

//lint js files
gulp.task('lint', function() {
    gulp.src(['*.js','routes/*.js', 'public/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});
gulp.task('fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./public/fonts'));

});
gulp.task('buildcss', ['fonts'], function () {
    return gulp.src('./css/shopping.css')
        .pipe(rework(reworkNPM({
            alias: { 'responsive-grids': './node_modules/purecss/build/grids-responsive.css' },
            shim: { 
                'purecss': 'build/pure.css',
                'purecss/grids-responsive': 'build/grids-responsive.css',
                'font-awesome' : 'css/font-awesome.css'
            }}),
            vars(), 
            inherit(),
            imprt({
                path: './css/modules/'
            })
            )
        )
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('buildjs', function () {
 
    return browserify({ entries:['./apps/shopping/app.js'], debug: true })
        .ignore('react')
        .transform(babelify.configure({
          experimental: false
        })) 
        .bundle()
        .on('error', function (e) {
            console.log('browserify error');
            console.log(arguments);
            throw e;
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js')) 
        .on('end', function () {
            console.log('ended');
        });
});

var browserifyBundle = function (b) {
    

        return b.transform(babelify.configure({
          experimental: false
        })) 
        .bundle();

};
var gulpifyBundle = function (b) {
        return b.pipe(source('app.js'))
        .pipe(gulp.dest('./public/js')) 
        .on('end', function () {
            console.log('ended');
        });
};
gulp.task('watchify', function () {
    var b = browserify({ entries:['./apps/shopping/index.js'], debug: true });
    var wb = browserifyBundle(watchify(b));
    wb.on('update', function(){
      gulpifyBundle(b);
    });


});

gulp.task('routerjs', function () {
 
    var b = browserify({ entries:['./apps/shopping/index.js'], debug: true });
    return gulpifyBundle(browserifyBundle(b).on('error', function (e) {
            console.log('browserify error');
            console.log(arguments);
            throw e;
        }));


});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['lint','nodemon', 'watch']);