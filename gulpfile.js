//引入模块
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin"),
			uglify = require("gulp-uglify"),
			babel = require("gulp-babel"),
			connect = require("gulp-connect"),
			sass = require("gulp-sass"),
			cleanCss = require("gulp-clean-css");
	
//压缩Html：gulp-htmlmin
gulp.task("html", ()=>{
	gulp.src("src/**/*.html")
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
               collapseWhitespace: true,//压缩HTML
               collapseBooleanAttributes: true,//省略布尔属性的值
               removeEmptyAttributes: true,//删除所有空格作属性值
               removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
               removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
               minifyJS: true,//压缩页面JS
               minifyCSS: true//压缩页面CSS
		}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
})
//压缩css
gulp.task("css",()=>{
	gulp.src("src/scss/**/*.scss")
	    .pipe(sass())
	    .pipe(cleanCss())
	    .pipe(gulp.dest("dist/css"))
	    .pipe(connect.reload());
})
//压缩JS：gulp-uglify
gulp.task("js", ()=>{
	gulp.src("src/js/**/*.js")
		.pipe(babel({//取出js文件，es6转es5，再压缩
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
})
//移动静态资源
gulp.task("static",()=>{
	gulp.src("src/static/**/*")
	    .pipe(gulp.dest("dist/static"))
	    .pipe(connect.reload());
})
gulp.task("libs",()=>{
	gulp.src("src/libs/**/*")
	    .pipe(gulp.dest("dist/libs"))
	    .pipe(connect.reload());
})
gulp.task("api",()=>{
	gulp.src("src/api/**/*")
	    .pipe(gulp.dest("dist/api"))
	    .pipe(connect.reload());
})
//开启服务器
gulp.task("server", ()=>{
	connect.server({
		port:1809,
		livereload: true,
		root: "dist"
	})
})
//监听改变状态
gulp.task("watch", ()=>{
	gulp.watch("src/**/*.html", ["html"]);
	gulp.watch("src/**/*.scss", ["css"]);
	gulp.watch("src/**/*.js", ["js"]);
	gulp.watch("src/static/**/*",["static"]);
})

gulp.task("default", ["html","css","js","watch","static","server","libs","api"]);