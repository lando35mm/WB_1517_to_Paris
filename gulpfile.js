const env = process.env.NODE_ENV || 'development';
const development = (env === 'development');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const mergeStream = require('merge-stream');
const streamqueue = require('streamqueue');

gulp.task('clean', () => {
    const del = require('del');

    return del([
        'dist/**', 
        'src/{**/,}.DS_Store'
    ]).then(paths => (paths.length > 0) ? console.log(`Deleted files and folders: ${paths.join('\n')}`) : console.log('Nothing to clean'));
});

gulp.task('lint:html', () => gulp.src('src/index.html')
    .pipe(plugins.html({ verbose: true }))
);

gulp.task('lint:js', () => gulp.src('src/js/{!(lib),}/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
);

gulp.task('build:media', () => mergeStream(
    gulp.src('src/media/img/{**/,}*.{jpg,gif,png,svg,webp}')
        .pipe(plugins.imagemin())
        .pipe(plugins.changed('dist/media/img/', { hasChanged: plugins.changed.compareSha1Digest }))
        .pipe(gulp.dest('dist/media/img/')),
    gulp.src('src/media/video/{**/,}*.{mp4}')
        .pipe(plugins.imagemin())
        .pipe(plugins.changed('dist/media/video/', { hasChanged: plugins.changed.compareSha1Digest }))
        .pipe(gulp.dest('dist/media/video/'))
));

gulp.task('build:fonts', () => gulp.src('src/fonts/**')
    .pipe(plugins.changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'))
);

gulp.task('build:html', /*[ 'lint:html' ], */() => gulp.src('src/index.html')
    .pipe(plugins.changed('dist/'))
    .pipe(gulp.dest('dist/'))
);

gulp.task('build:js', () => mergeStream(
    gulp.src('src/js/{!(lib)/,}*.js')
        .pipe(plugins.if(development, plugins.sourcemaps.init()))
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.babel())
        .pipe(plugins.if(!(development), plugins.uglify()))
        .pipe(plugins.if(development, plugins.sourcemaps.write('../sourcemaps/')))
        .pipe(plugins.changed('dist/js/', { hasChanged: plugins.changed.compareSha1Digest }))
        .pipe(gulp.dest('dist/js/')),

    gulp.src('src/js/lib/**')
        .pipe(plugins.changed('dist/js/lib/'))
        .pipe(gulp.dest('dist/js/lib/')),

    gulp.src('node_modules/webfontloader/webfontloader.js')
        .pipe(plugins.changed('dist/js/lib/webfontloader/'))
        .pipe(gulp.dest('dist/js/lib/webfontloader/')),

    gulp.src('node_modules/babel-polyfill/dist/polyfill.min.js')
        .pipe(plugins.changed('dist/js/lib/babel-polyfill/'))
        .pipe(gulp.dest('dist/js/lib/babel-polyfill/')),

    gulp.src('node_modules/gsap/{TweenLite,TimelineLite,CSSPlugin,EasePack}.js')
        .pipe(plugins.if(!(development), plugins.uglify()))
        .pipe(plugins.changed('dist/js/lib/gsap/'))
        .pipe(gulp.dest('dist/js/lib/gsap'))
));

gulp.task('build:css', () => gulp.src('src/postcss/main.postcss')
    .pipe(plugins.if(development, plugins.sourcemaps.init()))
    .pipe(plugins.postcss([
        require('postcss-import'),
        require('postcss-cssnext') 
    ])).pipe(plugins.concat('page.css'))
    .pipe(plugins.if(!(development), plugins.cleanCss()))
    .pipe(plugins.if(development, plugins.sourcemaps.write('../sourcemaps/')))
    .pipe(plugins.changed('dist/css/',  { hasChanged: plugins.changed.compareSha1Digest }))
    .pipe(gulp.dest('dist/css/'))
);

gulp.task('build:static', [ 'build:media', 'build:fonts', 'build:html' ]);

gulp.task('build', [ 'build:static', 'build:css', 'build:js' ]);

gulp.task('watch', [ 'build' ], () => {
    gulp.watch('src/postcss/**', [ 'build:css' ]);
    gulp.watch('src/js/**', [ 'build:js' ]);
    gulp.watch('src/media/**', [ 'build:media' ]);
    gulp.watch('src/fonts/**', [ 'build:fonts' ]);
    gulp.watch('src/index.html', [ 'build:html' ]);
});

gulp.task('default', [ 'build' ]);
