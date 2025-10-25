# 构建和部署指南

本项目使用 GitHub Actions 进行自动化构建，支持多种部署方式。

## 🚀 构建流程

### GitHub Actions 构建

项目使用 GitHub Actions 进行自动化构建：

- **触发条件**: 推送到 `main` 分支或创建 Pull Request
- **构建环境**: Ubuntu Latest + Node.js 18 + pnpm 8
- **构建产物**: 自动上传到 GitHub Actions Artifacts

### 本地构建

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 预览构建结果
pnpm serve
```

## 📦 构建产物

构建完成后，会在 `dist/` 目录下生成以下文件：

```
dist/
├── index.html          # 首页
├── about.html          # 关于页面
├── css/               # 样式文件
│   ├── index.css
│   └── about.css
├── js/                # JavaScript 文件
│   ├── index.js
│   └── about.js
├── assets/            # 静态资源
│   ├── images/
│   └── icons/
└── config.json        # 配置文件
```

## 🌐 部署方式

### 1. 静态网站托管

构建产物可以直接部署到任何静态网站托管服务：

#### GitHub Pages
1. 启用 GitHub Pages
2. 选择 Source: GitHub Actions
3. 使用构建产物进行部署

#### Vercel
1. 连接 GitHub 仓库
2. 构建设置: `pnpm build`
3. 输出目录: `dist`

#### Netlify
1. 连接 GitHub 仓库
2. 构建设置: `pnpm build`
3. 发布目录: `dist`

#### 其他静态托管
- Firebase Hosting
- AWS S3 + CloudFront
- 阿里云 OSS
- 腾讯云 COS

### 2. 服务器部署

#### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache 配置示例
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/dist
    
    <Directory /path/to/dist>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## ⚙️ 构建配置

### 环境变量

项目支持通过环境变量进行配置：

```bash
# 开发环境
NODE_ENV=development
DEBUG=true

# 生产环境
NODE_ENV=production
DEBUG=false
```

### 构建脚本

在 `package.json` 中定义的构建脚本：

```json
{
  "scripts": {
    "dev": "gulp",                    # 开发模式
    "build": "gulp build",           # 生产构建
    "serve": "npx serve dist",       # 本地预览
    "clean": "gulp clean",           # 清理构建产物
    "format": "prettier --write src/**/*.{js,scss,html}",
    "format:check": "prettier --check src/**/*.{js,scss,html}"
  }
}
```

## 🔧 构建优化

### 性能优化
- **代码分割**: 按页面分离 JavaScript 文件
- **资源压缩**: CSS/JS 自动压缩
- **图片优化**: 智能图片处理
- **缓存策略**: 静态资源缓存

### 构建产物优化
- **文件大小**: 自动压缩和优化
- **加载速度**: 资源预加载和懒加载
- **SEO 优化**: 语义化 HTML 和元数据

## 📝 构建检查清单

### 构建前检查
- [ ] 代码已提交到正确分支
- [ ] 依赖版本正确
- [ ] 环境变量配置正确

### 构建后检查
- [ ] 构建产物完整
- [ ] 静态资源路径正确
- [ ] 页面可以正常访问
- [ ] 移动端显示正常

## 🐛 常见问题

### 构建失败
1. **依赖问题**: 检查 `package.json` 和 `pnpm-lock.yaml`
2. **Node.js 版本**: 确保使用 Node.js 18+
3. **权限问题**: 检查 GitHub Actions 权限设置

### 部署问题
1. **404 错误**: 检查重定向规则配置
2. **资源加载失败**: 检查路径配置
3. **样式问题**: 检查 CSS 构建和路径

## 📞 技术支持

如果遇到构建或部署问题，请：
1. 检查 GitHub Actions 日志
2. 查看构建产物完整性
3. 提交 Issue 描述问题
4. 联系项目维护者

---

**构建愉快！** 🎉