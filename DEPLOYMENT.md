# 部署指南

本项目支持多种部署方式，您可以根据需要选择合适的部署平台。

## 🚀 部署方式

### 1. GitHub Pages 部署

**特点**: 免费、简单、与 GitHub 集成度高

**步骤**:
1. 确保仓库已启用 GitHub Pages
2. 推送代码到 `main` 分支
3. GitHub Actions 会自动构建和部署

**配置**:
- 工作流文件: `.github/workflows/deploy.yml`
- 部署地址: `https://yourusername.github.io/HomePage`

### 2. Vercel 部署

**特点**: 快速、全球 CDN、自动 HTTPS

**步骤**:
1. 在 Vercel 导入 GitHub 仓库
2. 配置环境变量（如需要）
3. 自动部署

**环境变量**:
```bash
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_org_id
PROJECT_ID=your_project_id
VERCEL_SCOPE=your_scope
```

### 3. Netlify 部署

**特点**: 功能丰富、支持表单处理、分支预览

**步骤**:
1. 在 Netlify 连接 GitHub 仓库
2. 配置构建设置
3. 自动部署

**环境变量**:
```bash
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

## ⚙️ 部署配置

### GitHub Pages 配置

1. **启用 GitHub Pages**:
   - 进入仓库 Settings
   - 找到 Pages 部分
   - 选择 Source: GitHub Actions

2. **权限设置**:
   - 确保 Actions 有 Pages 写入权限
   - 在仓库 Settings > Actions > General 中设置

### Vercel 配置

1. **项目设置**:
   - 构建命令: `pnpm build`
   - 输出目录: `dist`
   - Node.js 版本: 18

2. **环境变量**:
   - 在 Vercel 控制台添加必要的环境变量

### Netlify 配置

1. **构建设置**:
   - 构建命令: `pnpm build`
   - 发布目录: `dist`
   - Node.js 版本: 18

2. **重定向规则**:
   - SPA 路由支持
   - 自定义 404 页面

## 🔧 本地测试部署

### 测试构建
```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 预览构建结果
npx serve dist
```

### 测试不同环境
```bash
# 开发环境
pnpm dev

# 生产环境
pnpm build
```

## 📝 部署检查清单

### 部署前检查
- [ ] 代码已提交到正确分支
- [ ] 构建命令正确配置
- [ ] 环境变量已设置
- [ ] 域名和重定向规则配置正确

### 部署后检查
- [ ] 网站可以正常访问
- [ ] 所有页面路由正常
- [ ] 静态资源加载正常
- [ ] 移动端显示正常
- [ ] 性能指标符合预期

## 🐛 常见问题

### 构建失败
1. **依赖问题**: 检查 `package.json` 和 `pnpm-lock.yaml`
2. **Node.js 版本**: 确保使用正确的 Node.js 版本
3. **权限问题**: 检查 GitHub Actions 权限设置

### 部署后问题
1. **404 错误**: 检查重定向规则配置
2. **资源加载失败**: 检查路径配置
3. **样式问题**: 检查 CSS 构建和路径

### 性能优化
1. **缓存设置**: 配置适当的缓存策略
2. **压缩优化**: 启用 Gzip 压缩
3. **CDN 配置**: 使用 CDN 加速静态资源

## 📞 技术支持

如果遇到部署问题，请：
1. 检查 GitHub Actions 日志
2. 查看平台部署日志
3. 提交 Issue 描述问题
4. 联系项目维护者

---

**祝您部署顺利！** 🎉
