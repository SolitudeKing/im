const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const htmlreplace = require('gulp-html-replace');
const { deleteAsync } = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const fs = require('fs');
const path = require('path');

// Sass Compile & CSS Minify Task
function styles() {
    return src('src/styles/**/*.scss') // 简化路径
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(dest('dist/css')) // 修改输出路径
        .pipe(browserSync.stream());
}

// 通用 JS 打包函数
function bundleJS(entryFile, outputFileName, isProduction) {
    let b = browserify({
        entries: `./src/js/${entryFile}`,
        debug: !isProduction // 生产环境不开启 sourcemap
    }).transform('babelify', { presets: ['@babel/env'] }); // 使用 babelify 进行转译

    let stream = b.bundle()
        .on('error', function (err) {
            console.error(err.message);
            this.emit('end'); // 确保在错误时结束 stream
        })
        .pipe(source(outputFileName))
        .pipe(buffer());

    if (isProduction) {
        stream = stream
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }));
    }

    return stream.pipe(dest('dist/js'));
}

// 自动扫描 JS 文件并创建打包任务
function createJSBundles(isProduction = false) {
    const jsDir = 'src/js/';
    const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));

    console.log(`Found JS files: ${jsFiles.join(', ')}`);

    const tasks = jsFiles.map(file => {
        const fileName = file.replace('.js', '');
        const outputFileName = isProduction ? `${fileName}.min.js` : `${fileName}.js`;

        console.log(`Creating bundle for ${file} -> ${outputFileName}`);

        return bundleJS(file, outputFileName, isProduction);
    });

    return parallel(...tasks);
}

// JavaScript Transpile for Development
const scriptsDev = createJSBundles(false);

// JavaScript Transpile, Uglify & Rename for Production
const scriptsBuild = createJSBundles(true);

// Images Task (处理图片和图标文件)
function images(cb) {
    const srcPath = 'src/assets/images/home.jpg';
    const destDir = 'dist/assets/images/';
    const destPath = path.join(destDir, 'home.jpg');

    // 确保目标目录存在
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Successfully copied ${srcPath} to ${destPath}`);
    } catch (err) {
        console.error(`Error copying image file: ${err.message}`);
    }

    // 处理图标文件
    const iconSrcDir = 'src/assets/icons/';
    const iconDestDir = 'dist/assets/icons/';

    // 确保图标目标目录存在
    if (!fs.existsSync(iconDestDir)) {
        fs.mkdirSync(iconDestDir, { recursive: true });
    }

    // 检查源图标目录是否存在
    if (fs.existsSync(iconSrcDir)) {
        try {
            const iconFiles = fs.readdirSync(iconSrcDir);
            iconFiles.forEach(file => {
                if (file.endsWith('.svg')) {
                    const srcIconPath = path.join(iconSrcDir, file);
                    const destIconPath = path.join(iconDestDir, file);
                    fs.copyFileSync(srcIconPath, destIconPath);
                    console.log(`Successfully copied icon: ${srcIconPath} to ${destIconPath}`);
                }
            });
        } catch (err) {
            console.error(`Error copying icon files: ${err.message}`);
        }
    } else {
        console.log('Icon source directory not found:', iconSrcDir);
    }

    cb(); // 通知 Gulp 任务完成
}

// HTML Task with environment-specific script replacement
function html(cb) {
    const isBuild = process.argv.includes('build');
    let stream = src('src/views/**/*.html');

    // 自动扫描 JS 文件并创建替换规则
    const jsDir = 'src/js/';
    const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
    const replacements = {};

    jsFiles.forEach(file => {
        const fileName = file.replace('.js', '');
        const jsKey = `js_${fileName}`;
        const jsValue = isBuild ? `js/${fileName}.min.js` : `js/${fileName}.js`;
        replacements[jsKey] = jsValue;
    });

    console.log('HTML replacements:', replacements);

    if (isBuild) {
        stream = stream.pipe(htmlreplace(replacements))
            .pipe(htmlmin({ collapseWhitespace: true }));
    } else {
        stream = stream.pipe(htmlreplace(replacements));
    }

    return stream
        .pipe(dest('dist/'))
        .pipe(browserSync.stream());
}
function _public() {
    return src('src/public/**/*')
        .pipe(dest('dist/'));
}

// 复制配置文件
function config() {
    console.log('=== Config Task Starting ===');
    console.log('Current directory:', process.cwd());
    console.log('config.json exists:', fs.existsSync('config.json'));

    return src('config.json')
        .pipe(dest('dist/'));
}

// Clean Dist Directory Task
function clean() {
    return deleteAsync(['dist']);
}

// BrowserSync Serve Task
function browserSyncServe(cb) {
    browserSync.init({
        host: '0.0.0.0',
        port: 5431,
        open: false, // 设置为 false 不自动打开浏览器， 或指定浏览器名如 'chrome'
        server: {
            baseDir: './dist/'
        }
    });
    cb();
}

// BrowserSync Reload Task
function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Files Task
function watchFiles() {
    watch('src/styles/**/*.scss', styles);
    watch('src/js/**/*.js', scriptsDev);
    watch('src/assets/images/**/*', images);
    watch('src/assets/icon/**/*', images); // 监听图标文件变化
    watch('src/views/**/*.html', html); // 监听 HTML 文件
}

// Default Gulp Task (Development)
exports.default = series(
    clean,
    parallel(config, styles, scriptsDev, images, html, _public),
    browserSyncServe,
    watchFiles
);

// Build Gulp Task (Production)
exports.build = series(
    clean,
    parallel(config, styles, scriptsBuild, images, html, _public)
);
