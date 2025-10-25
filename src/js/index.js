import $ from "jquery";
import { svgIconLoader } from "./utils/svg-icon.js";

// 移除动态加载背景图的 JS 逻辑
// const backgroundDiv = $('#background');
// const bg_url = 'assets/images/home.jpg';
//
// const newImg = $('<img class="bg" alt="Background Image">');
// newImg.attr('src', bg_url);
//
// newImg.on('load', function () {
//     console.log("Background image loaded and applied!");
// });
//
// newImg.on('error', function () {
//     console.error("Error loading background image!");
// });
//
// backgroundDiv.empty().append(newImg);

function imgLoadComplete() {
  console.log("Background image loaded successfully!");
  // 在这里添加图片加载完成后的处理逻辑
}

function imgLoadError() {
  console.error("Error loading background image!");
  // 在这里添加图片加载出错后的处理逻辑
}

function imgAnimationEnd() {
  console.log("Background image animation ended!");
  // 在这里添加动画结束后的处理逻辑
}

// 页面加载完成后初始化图标
$(document).ready(() => {
  console.log("SVG Icon Loader initialized");
});

export { imgLoadComplete, imgLoadError, imgAnimationEnd };
