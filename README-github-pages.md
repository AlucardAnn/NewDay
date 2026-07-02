# GitHub Pages 部署说明

这个目录已经是可部署的静态站点。上传到 GitHub 仓库根目录后，开启 GitHub Pages 即可分享。

## 网页端上传

1. 在 GitHub 新建公开仓库，例如 `daily-push`。
2. 打开仓库首页，选择 `Add file` -> `Upload files`。
3. 上传本目录里的所有文件和文件夹：
   - `index.html`
   - `daily-interest-2026-07-01.html`
   - `daily-interest-2026-07-02.html`
   - `assets/`
   - `.nojekyll`
4. 进入仓库 `Settings` -> `Pages`。
5. `Source` 选择 `Deploy from a branch`。
6. `Branch` 选择 `main`，文件夹选择 `/root`，保存。
7. 等几分钟后访问：
   `https://你的GitHub用户名.github.io/daily-push/`

## 命令行上传

如果你已经在 GitHub 创建了空仓库，可以在这个目录执行：

```powershell
git init
git add .
git commit -m "Add daily push pages"
git branch -M main
git remote add origin https://github.com/你的GitHub用户名/daily-push.git
git push -u origin main
```

然后到 GitHub 仓库 `Settings` -> `Pages` 开启 `main / root` 发布源。

## 注意

- 不要把飞书 Webhook、token、账号凭证放进仓库。
- 如果某些官方外链图片失效，页面仍能打开，只是对应图片可能显示不出来。
