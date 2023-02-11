/* eslint-disable */
const fs = require('fs')
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const replace = require('gulp-replace')
const autoprefixer = require('gulp-autoprefixer')
const through = require('through2')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

const corePath = '../packages/ui'
const destEs = `../es`
const destLib = `../lib`
const destDist = `../dist`

/**
 * sass转为css并放到输出目录
 * @returns stream
 */
function sass2Css() {
  return gulp
    .src(`${corePath}/src/**/*.scss`)
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest(destEs))
    .pipe(gulp.dest(destLib))
}

/**
 * sass直接拷贝到输出目录
 * @returns stream
 */
function copySass() {
  return gulp
    .src(`${corePath}/src/**/*.scss`)
    .pipe(gulp.dest(destEs))
    .pipe(gulp.dest(destLib))
}

/**
 * style/index 转为 lib/style/index es/style/index
 * @returns
 */
function buildStyleImport() {
  return gulp
    .src(`${corePath}/src/**/style/index.ts`)
    .pipe(replace(/style\/index/g, 'style/index.mjs'))
    .pipe(replace('.scss', '.css'))
    .pipe(
      rename(function (path) {
        path.extname = '.mjs'
        return path
      })
    )
    .pipe(gulp.dest(destEs))
    .pipe(
      rename(function (path) {
        path.extname = '.js'
        return path
      })
    )
    .pipe(replace(/\.mjs/g, ''))
    .pipe(
      replace(/import\s+\'([\w\.\/\-]+)\'/g, function (p, a) {
        return `require('${a}')`
      })
    )
    .pipe(gulp.dest(destLib))
}

/**
 * style/index 转为 lib/style/sass es/style/sass
 * @returns
 */
function buildSassImport() {
  return gulp
    .src(`${corePath}/src/**/style/index.ts`)
    .pipe(replace(/style\/index/g, 'style/sass.mjs'))
    .pipe(
      rename(function (path) {
        path.extname = '.mjs'
        path.basename = 'sass'
        return path
      })
    )
    .pipe(gulp.dest(destEs))
    .pipe(
      rename(function (path) {
        path.extname = '.js'
        return path
      })
    )
    .pipe(replace(/\.mjs/g, ''))
    .pipe(
      replace(/import\s+\'([\w\.\/\-]+)\'/g, function (p, a) {
        return `require('${a}')`
      })
    )
    .pipe(gulp.dest(destLib))
}

/**
 * 把 es/style/index.css 压缩放到 dist/index.css
 * @returns stream
 */
function compressCss() {
  return (
    gulp
      .src(`${destEs}/style/index.css`)
      // 2. 压缩文件
      .pipe(cleanCSS())
      .pipe(rename('index.css'))
      // 3. 另存压缩后的文件
      .pipe(gulp.dest(destDist))
  )
}

/**
 * 拷贝 es 输出 d.ts 到 lib 目录下
 * @returns stream
 */
function copyDeclaration() {
  return gulp.src(`${destEs}/**/*.d.ts`).pipe(gulp.dest(destLib))
}

function buildFilePathsCache() {
  const paths = []

  return gulp
    .src(`${corePath}/src/**/*.ts`)
    .pipe(
      through.obj(function (file, enc, callback) {
        this.push(`${file.path.replace(/\\/g, '/').split('/src/').pop()}\n`)
        callback()
      })
    )
    .on('data', function (data) {
      paths.push(data)
    })
    .pipe(fs.createWriteStream('ts-files.txt', 'utf-8'))
}

function buildStyleImportFilePathsCache() {
  const paths = []

  return gulp
    .src(`${corePath}/src/**/style/index.ts`)
    .pipe(
      through.obj(function (file, enc, callback) {
        this.push(`${file.path.replace(/\\/g, '/').split('/src/').pop()}\n`)
        callback()
      })
    )
    .on('data', function (data) {
      paths.push(data)
    })
    .pipe(fs.createWriteStream('style-files.txt', 'utf-8'))
}

exports.build = gulp.series(
  sass2Css,
  copySass,
  buildStyleImport,
  buildSassImport
)
exports.buildFilePathsCache = buildFilePathsCache
exports.copyDeclaration = copyDeclaration
exports.compressCss = compressCss
exports.buildStyleImportFilePathsCache = buildStyleImportFilePathsCache
