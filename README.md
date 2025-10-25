# 个人主页项目



## 🚀 项目简介

这是一个基于 `Node.js`、`pnpm` 和 `Gulp` 构建的现代化个人主页项目。项目采用原生 JavaScript 技术栈，结合模块化开发理念，打造了一个功能丰富、性能优异的个人展示网站。项目支持毛玻璃效果、响应式布局、SVG 图标系统等现代前端特性。

## ✨ 主要特性

- **🎨 现代化设计**: 毛玻璃效果、响应式布局、优雅的视觉体验
- **🔧 模块化架构**: 组件化样式管理、工具类封装、配置分离
- **📱 响应式设计**: 完美适配桌面端、平板和移动设备
- **⚡ 高性能构建**: 自动化打包、代码压缩、资源优化
- **🎯 SVG 图标系统**: 自动化的 SVG 图标加载和管理
- **🛠️ 开发友好**: 热重载、文件监听、自动构建
- **📦 零框架依赖**: 纯原生 JavaScript，轻量级实现

## 🛠️ 技术栈

### 核心构建
- **Node.js** - JavaScript 运行时环境
- **pnpm** - 快速、节省磁盘空间的包管理器
- **Gulp** - 自动化构建工具

### 前端技术
- **HTML5** - 语义化标记语言
- **Sass** - CSS 预处理器，支持变量、嵌套、混入
- **Flexbox** - 现代 CSS 布局技术
- **原生 JavaScript** - ES6+ 模块化开发
- **jQuery** - DOM 操作和事件处理
- **Axios** - HTTP 客户端库

### 构建工具链
- **Browserify** - JavaScript 模块打包
- **Babel** - ES6+ 代码转译
- **BrowserSync** - 开发服务器和热重载
- **Prettier** - 代码格式化

## 📂 项目结构

```
HomePage/
├── src/                          # 源代码目录
│   ├── assets/                   # 静态资源
│   │   ├── icons/               # SVG 图标文件
│   │   │   ├── github.svg
│   │   │   ├── bilibili.svg
│   │   │   └── ...
│   │   └── images/              # 图片资源
│   │       └── home.jpg
│   ├── js/                      # JavaScript 源码
│   │   ├── index.js            # 首页脚本
│   │   ├── about.js            # 关于页面脚本
│   │   ├── common/             # 公共脚本
│   │   └── utils/              # 工具类
│   │       ├── svg-icon.js     # SVG 图标加载器
│   │       ├── scroll.js       # 滚动工具
│   │       └── util.js         # 通用工具
│   ├── styles/                 # 样式源码
│   │   ├── _base.scss         # 基础样式入口
│   │   ├── index.scss         # 首页样式
│   │   ├── about.scss         # 关于页面样式
│   │   ├── common/            # 公共样式
│   │   │   ├── reset.scss     # 样式重置
│   │   │   ├── layout.scss    # 布局样式
│   │   │   └── variables.scss # 变量定义
│   │   └── components/        # 组件样式
│   │       └── icon-btn.scss  # 图标按钮组件
│   └── views/                 # HTML 模板
│       ├── index.html         # 首页
│       └── about.html         # 关于页面
├── dist/                      # 构建输出目录
├── config.json               # 项目配置文件
├── gulpfile.js              # Gulp 构建配置
├── package.json             # 项目依赖配置
└── README.md                # 项目说明文档
```

## ⚙️ 安装与运行

### 环境要求
- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 快速开始

1. **克隆项目**
   ```bash
   git clone <your-repository-url>
   cd HomePage
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   # 或
   pnpm gulp
   ```
   访问 `http://localhost:5431` 查看项目

4. **构建生产版本**
   ```bash
   pnpm build
   # 或
   pnpm gulp build
   ```

## 🎯 核心功能

### SVG 图标系统
项目内置了智能的 SVG 图标加载系统，支持：
- 自动扫描和加载图标
- 配置化管理
- 缓存优化
- 响应式适配

**使用方式：**
```html
<a href="#" class="icon-btn">
    <i class="icon-github"></i>
</a>
```

### 组件化样式
采用组件化的样式管理方式：
- 独立的组件样式文件
- 可复用的样式组件
- 响应式设计支持
- 主题定制能力

### 自动化构建
- **开发模式**: 文件监听、热重载、Source Map
- **生产模式**: 代码压缩、资源优化、文件合并
- **智能打包**: 自动扫描 JS 文件，无需手动配置

## 🛠️ 开发指南

### 添加新页面
1. 在 `src/views/` 下创建 HTML 文件
2. 在 `src/js/` 下创建对应的 JS 文件
3. 在 `src/styles/` 下创建对应的 SCSS 文件
4. 构建系统会自动处理新文件

### 添加新图标
1. 将 SVG 文件放入 `src/assets/icons/` 目录
2. 在 HTML 中使用 `icon-图标名` 类名
3. 系统会自动加载和显示图标

### 样式开发
- 使用 Sass 编写样式
- 遵循组件化原则
- 利用变量和混入提高复用性
- 支持响应式设计

## 📝 配置说明

### 项目配置 (config.json)
```json
{
  "svgIcon": {
    "iconPath": "assets/icons/",
    "iconPrefix": "icon-",
    "iconClass": "svg-icon",
    "autoInit": true,
    "cacheEnabled": true
  }
}
```

### 构建脚本
- `pnpm dev` - 开发模式
- `pnpm build` - 生产构建
- `pnpm format` - 代码格式化

## 🎨 设计特色

### 毛玻璃效果
- 使用 `backdrop-filter` 实现毛玻璃背景
- 半透明容器设计
- 优雅的视觉层次

### 响应式布局
- Flexbox 布局系统
- 移动端优先设计
- 自适应图标和间距

### 交互体验
- 平滑的悬停效果
- 优雅的过渡动画
- 直观的用户反馈

## 🚀 性能优化

- **代码分割**: 按页面分离 JS 文件
- **资源压缩**: CSS/JS 自动压缩
- **图片优化**: 智能图片处理
- **缓存策略**: 静态资源缓存
- **模块化加载**: 按需加载资源

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📜 许可证

本项目采用 [GPL-3.0-or-later](LICENSE) 许可证。

## 📧 联系方式

- **作者**: SolitudeKing
- **GitHub**: [@SolitudeKing](https://github.com/SolitudeKing)
- **项目地址**: [HomePage Repository](https://github.com/SolitudeKing/HomePage)

---

**⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！**