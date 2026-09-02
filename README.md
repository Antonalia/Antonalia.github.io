# 仓鼠小乐的个人博客

这是 `https://antonalia.github.io` 的 Hexo 源码仓库。GitHub Actions 会在 `main` 分支收到推送后自动安装依赖、生成静态站点并发布到 GitHub Pages。

## 新电脑初始化

```powershell
git clone https://github.com/Antonalia/antonalia.github.io.git
cd antonalia.github.io
npm ci
npm run server
```

本地预览地址为 `http://localhost:4000`。

## 日常更新

每次开始编辑前先拉取最新源码，完成后提交并推送：

```powershell
git pull --rebase
# 编辑 source/_posts、source/images 或主题配置
git add .
git commit -m "更新博客"
git push
```

推送完成后，GitHub Actions 会自动发布网站。不要提交 `public/`、`node_modules/`、`db.json` 或 `.deploy_git/`，也不要再运行 `hexo deploy`。

## 主要目录

- `source/_posts/`：文章 Markdown 文件。
- `source/images/`：文章图片。
- `themes/fluid/_config.yml`：主题外观、个人信息和插件配置。
- `_config.yml`：Hexo 站点配置。
- `.github/workflows/pages.yml`：自动构建和发布工作流。

不要把个人访问令牌、密码或其他密钥写入配置文件或提交到仓库。
