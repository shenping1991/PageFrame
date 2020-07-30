var gulp=require('gulp');
var plugins=require('gulp-load-plugins')();//自动加载插件
var rename=require('gulp-rename'),//重命名
	uglify = require("gulp-uglify"),//js文件压缩
	minifyCss=require("gulp-minify-css"),//css文件压缩
	minifyHtml = require("gulp-minify-html"),
	jshint=require("gulp-jshint"),
	concat=require("gulp-concat"),
	less=require("gulp-less"),
	//sass=require("gulp-sass"),
	imagemin=require('gulp-imagemin'),
	pngquant=require('imagemin-pngquant'),
	livereload = require('gulp-livereload'),
	connect=require('gulp-connect'),//自动刷新
	del=require('del'),
	watch=require('gulp-watch');
//js文件压缩 重命名 js代码检查
gulp.task('uglify',function(){
    gulp.src('src/js/*.js')//src/js/*.js
    	.pipe(jshint())//js代码检查
		.pipe(jshint.reporter())// 输出检查结果
    	.pipe(uglify())//压缩
    	.pipe(concat('common.js'))
  		.pipe(rename({suffix: '.min'}))
    	.pipe(gulp.dest('dist/js'));
    	
});
//css文件压缩
gulp.task('minify-css',function(){
	gulp.src('src/css/*.css')
		.pipe(minifyCss())
		.pipe(rename('css.min.css'))
		.pipe(gulp.dest('dist/css'));
});
//html文件压缩
gulp.task('minify-html', function () {
    gulp.src('src/html/index.html') // 要压缩的html文件
    	//.pipe(minifyHtml()) //压缩
    	.pipe(gulp.dest('dist/html'));
});
gulp.task('copy-index', function () {
    gulp.src('src/html/index.html') 
    	.pipe(gulp.dest('dist/html'));
});
//js代码检查
// gulp.task('jshint',function(){
// 	gulp.src('src/js/*.js')
// 		.pipe(jshint())
// 		.pipe(jshint.reporter());
// });
//文件合并
// gulp.task('concat',function(){
// 	gulp.src('src/js/*.js')
// 	.pipe(concat('common.min.js'))
// 	.pipe(gulp.dest('dist/js'));
// });

gulp.task('compile-less',function(){
	gulp.src('./src/less/common.less')
	.pipe(less())
	// .pipe(minifyCss())
	.pipe(rename('common.min.css'))
	.pipe(gulp.dest('dist/css'));
});
// gulp.task('compile-sass',function(){
// 	gulp.src('src/sass/*.scss')
// 	.pipe(sass())
// 	.pipe(gulp.dest('dist/css'));
// });

gulp.task('minify-image', function () {
    gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
	watch('./src/html/index.html', gulp.series('copy-index'));
    watch('src/less/*.less', gulp.series('compile-less'));
    watch('src/js/*.js', gulp.series('uglify'));
    watch('src/images/*', gulp.series('minify-image'));
    watch('./dist/**/*.*', gulp.series('reload'));
});
gulp.task('reload',function(){
	gulp.src('dist/html/index.html')
	.pipe(connect.reload());
});
gulp.task('server',function(){
	connect.server({
		root: "./dist",//根目录
		//ip:'172.16.21.225',//默认localhost:8080
		livereload:true,//自动更新
		port:9909
	});
});
//gulp.task('con',gulp.parallel('server','uglify','minify-css','minify-html','compile-less','minify-image'));

// gulp.task('default',function(){
// 	var watcher=gulp.watch('src/*/**.*',gulp.series('con'));
// 	watcher.on('change',function(){
// 		gulp.task('default');
// 	});
// });
gulp.task('clean:html',function(){
	del([
		'dist/html/**/*'
		]);
});
gulp.task('default',gulp.parallel('server','watch'));


