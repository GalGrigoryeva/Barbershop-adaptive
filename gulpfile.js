'use strict';

var gulp = require("gulp");
var del = require("del");
var rename = require("gulp-rename");
var less = require("gulp-less");
var minify = require("gulp-csso");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var imagemin = require("gulp-imagemin");
var minify = require('gulp-minify');
var server = require("browser-sync");
var run = require("run-sequence");


/* For svg sprite
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");

gulp.task("symbols", function() {
  return gulp.src("img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("img"));
});
*/
gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))

  .pipe(gulp.dest("build/img"));
});

gulp.task("compress", function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['tasks']
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task("serve", function() {
  server.init({
      server: ".build"
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.js/*.js");
  gulp.watch("*.html")
    .on("change", server.reload);
});

gulp.task("copy", function() {
  return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "img/**",
      "js/**",
      "*html"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "compress",
    fn
  );
});
