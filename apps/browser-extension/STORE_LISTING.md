# Chrome Web Store 上架材料

上传 zip 后，在开发者后台按下面内容填写。

## 基本信息

- **名称**：EdgeEver 网页剪藏
- **类别**：生产工具（Productivity）
- **语言**：中文（简体）

## 简短说明（Summary，≤132 字符）

```
把网页链接和选中文字一键保存到你自己部署的 EdgeEver 开源笔记，支持右键剪藏、笔记本与标签选择，数据只发送到你自己的服务器。
```

## 详细说明（Description）

```
EdgeEver 网页剪藏是开源自托管笔记应用 EdgeEver 的配套浏览器扩展。

EdgeEver 是一个部署在 Cloudflare 上的免费开源「印象笔记」替代品
（https://github.com/tianma-if/edgeever）。装好这个扩展后，浏览网页时：

★ 点击工具栏图标 —— 弹窗自动带出页面标题和选中文字，可编辑标题、
  选择笔记本、添加标签，一键保存为 Markdown 笔记
★ 右键「保存选中内容到 EdgeEver」—— 选中的文字以引用格式直接入库
★ 右键「保存本页链接到 EdgeEver」—— 快速收藏当前页面
★ 每条笔记自动附带原文链接，方便日后回溯

隐私友好：
• 无任何数据收集、统计或第三方服务
• 内容只发送到你自己在设置里填写的 EdgeEver 服务器
• 全部代码开源可审计

使用前提：你需要有一个自己部署的 EdgeEver 实例（部署完全免费，
见项目主页），并在其「个人中心 → MCP 设置」中创建 API Token。
```

## 权限用途说明（审核时的 Justification）

| 权限 | 用途 |
| --- | --- |
| `activeTab` | 用户点击扩展时读取当前页标题和网址 |
| `scripting` | 抓取用户在页面上选中的文字作为笔记内容 |
| `contextMenus` | 提供右键快捷保存菜单 |
| `storage` | 保存用户配置的服务器地址、Token、默认笔记本 |
| 可选主机权限 `https://*/*` | 每个用户的 EdgeEver 部署在不同域名，扩展在用户保存设置时只对用户填写的那一个域名动态申请权限（`permissions.request`），不会默认获得任何站点访问权 |

## 隐私

- **隐私政策 URL**：https://github.com/oldl108/edgeever/blob/main/apps/browser-extension/PRIVACY.md
- **数据使用声明**：勾选「不收集任何用户数据」；远程代码：无
- **单一用途说明**：把网页内容保存到用户自托管的 EdgeEver 笔记服务

## 图片素材

- **截图**（必需 1–5 张，1280×800 或 640×400）：建议截「弹窗保存界面」和「右键菜单」各一张，再截一张 EdgeEver 里保存结果
- **商店图标**：直接用 `icons/icon128.png`（128×128）

## 提交流程备忘

1. https://chrome.google.com/webstore/devconsole 注册开发者账号（一次性 $5）
2. 「新增项目」上传 `edgeever-web-clipper-v0.1.0.zip`
3. 按本文件填写商店信息 + 隐私声明 + 权限说明
4. 提交审核（因为用了可选宽域名权限，审核通常 1–7 天）
5. 过审后任何人都能安装；以后更新版本号改 `manifest.json` 的 `version`，重新打 zip 上传即可

## 也可以考虑

- **Edge 加载项商店**：免费注册，流程类似（https://partner.microsoft.com/dashboard/microsoftedge）
- **给上游提 PR**：把 `apps/browser-extension` 贡献给 tianma-if/edgeever，
  变成官方组件后由上游统一维护和发布
