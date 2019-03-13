// Подключение пакетов 

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('server', function(done) {
    
    browserSync.init({

    		server: {baseDir: './src/'}
    });


	gulp.watch('src/index.html').on('change', () => {
	 browserSync.reload();
	});
	gulp.watch('src/scss/*.scss', gulp.series('scss'));
	gulp.watch('src/js/*.js').on('change', () => {
		browserSync.reload();
	});

	done();

});


gulp.task('scss', function(done) {
    return gulp.src('./src/scss/main.scss')
    	.pipe(plumber({
    		errorHandler: notify.onError(function(err){
    			return {
    				title: 'Styles',
    				message: err.message
    			}
    			err();
    		})
    	}))
    	.pipe(sourcemaps.init())
    	.pipe(scss())
    	.pipe(autoprefixer({
    		browsers: ['last 3 versions'],
    		cascade: false
    	}))
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest('./src/css'))
    	.pipe(browserSync.stream());

    done();

});

gulp.task('default', gulp.series('server', 'scss'));
