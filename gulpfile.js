const { src, dest, task, series, watch } = require("gulp");
const clean = require("gulp-clean"); //analog gulp-rm
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
//const autoprefixer = require('gulp-autoprefixer'); // error
const gcmq = require("gulp-group-css-media-queries"); // группировка @media
const cleanCSS = require("gulp-clean-css"); // minCss
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require('gulp-uglify'); // minJs

task("clean", () => {
  return src("dist/**/*", { read: false }).pipe(clean());
});

// task("copy", () => {
// return src("src/styles/*.scss").pipe(dest("dist"));
// });

task("copy:html", () => {
  return src("src/*.html")
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/styles/main.scss",
];

task("styles", () => {
  return (
    src(styles)
      .pipe(sourcemaps.init())
      .pipe(concat("main.min.scss"))
      .pipe(sassGlob())
      .pipe(sass().on("error", sass.logError))
      // .pipe(autoprefixer({
      //   browsers: ['last 2 versions'],
      //   cascade: false
      // }))
      // ------- autoprefixer error
      .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(dest("dist"))
      .pipe(reload({ stream: true }))
  );
});

const libs = [
 
  "src/scripts/*.js"
];

task("scripts", () => {
  return src(libs)
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }))
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: false,
  });
});

watch("./src/styles/**/*.scss", series("styles"));
watch("./src/*.html", series("copy:html"));
watch("./src/scripts/*.js", series("scripts"));

task("default", series("clean", "copy:html", "styles", "scripts", "server"));