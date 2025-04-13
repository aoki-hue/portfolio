"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();

gulp.task("sass", () => {
  return gulp
    .src("assets/sass/**/*.scss") //SCSSファイルを指定
    .pipe(plumber()) //エラーの抑止
    .pipe(sourcemaps.init()) //初期化
    .pipe(sass()) //CSSにコンパイル
    .pipe(gulp.dest("assets/css")) //CSSフォルダに出力
    .pipe(rename({ extname: ".min.css" })) //ファイル名の変更
    .pipe(cleanCss()) //minifyの実施
    .pipe(sourcemaps.write("./")) //出力
    .pipe(gulp.dest("assets/css/min")) //minifyファイルの出力
    .pipe(browserSync.stream()); //LiveReloadの実施
});

//scssの監視＆変更があった場合にsassのタスク実行
gulp.task("watch", () => {
  gulp.watch("assets/sass/**/*.scss", gulp.task("sass"));
});

//browserSyncの初期化
gulp.task("liveReload", () => {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: "./",
    },
  });
});

gulp.task("default", gulp.parallel("liveReload", "watch")); //defaultタスクにsassを実行するよう指定
