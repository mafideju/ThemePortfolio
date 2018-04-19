const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


// FUNÇÃO COMPILADOR DE SASS E INJETOR NO BROWSER
gulp.task('sass', function(){
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
	.pipe(browserSync.stream());
});

// TIRAR ARQUIVOS JS DO NODE_MODULES E MOVER PARA A PASTA FONTE DO JS
gulp.task('js', function(){
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest("src/js"))
	.pipe(browserSync.stream());
});

//FAZER O SASS E O SERVIDOR FUNCIONAREM - APONTAR UMA FUNÇÃO PARA QUE SEMPRE COMPILE OS ARQUIVOS
// "WATCH SASS" - COMPILADOR?
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: "./src"
	});
	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

//MOVER A PASTA FONTES PARA A PASTA DE TRABALHO (SRC)
gulp.task('fonts', function(){
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest("src/fonts"));
});

//MOVER A PASTA FONTAWESOME PARA A PASTA DE TRABALHO (SRC)
gulp.task('fa', function(){
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest("src/css"));
});

 gulp.task('default', ['js','serve','fa','fonts']);