var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss   = require('gulp-minify-css');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var coffee      = require('gulp-coffee');
var runSequence = require('run-sequence');

var paths = {
    html:['index.html'],
    css:['src/scss/*.scss'],
    script:['script.coffee']
};

gulp.task('sass', function(){
    return gulp.src(paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('destination'))
        .pipe(reload({stream:true}));
});

gulp.task('html', function(){
    return gulp.src(paths.html)
        .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        open: true,
        notify: false
    });
});

gulp.task('scripts', function(){
    return gulp.src(paths.script)
        .pipe(coffee())
        .pipe(gulp.dest('destination'))
        .pipe(reload({stream:true}));
});


gulp.task('reload', function (done) {
    browserSync.reload();
    done();
})

gulp.task('watcher',function(){
    gulp.watch(paths.html, gulp.parallel('html', 'reload'));
    gulp.watch(paths.css, gulp.series('sass', 'html'));
    gulp.watch(paths.script, gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('browserSync', 'watcher'));
