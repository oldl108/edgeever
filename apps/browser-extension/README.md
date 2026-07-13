# EdgeEver 网页剪藏（Chrome 扩展）

把当前网页链接或选中的文字一键保存到自托管的 EdgeEver 实例。非官方组件，随 fork 维护。

## 功能

- 点击工具栏图标：弹窗里编辑标题、选笔记本、加标签后保存，自动抓取页面上选中的文字
- 右键菜单「保存选中内容到 EdgeEver」：选中文字直接存为引用格式笔记
- 右键菜单「保存本页链接到 EdgeEver」：快速收藏当前页面
- 保存的笔记为 Markdown，带原文链接，方便回溯

## 安装（开发者模式加载）

1. 打开 Chrome / Edge，进入 `chrome://extensions`
2. 打开右上角「开发者模式」
3. 点「加载已解压的扩展程序」，选择本目录（`apps/browser-extension`）

## 配置

1. 在 EdgeEver 左下角 **个人中心 → MCP 设置** 创建 API Token，
   权限勾选 `read:notebooks`、`write:memos`（可选 `read:tags`）
2. 右键扩展图标 → 「选项」，填入服务器地址和 Token
3. 点「测试连接并保存」，浏览器会请求授权访问你的 EdgeEver 域名，
   通过后选择默认笔记本即可

## 说明

- Token 保存在浏览器的扩展同步存储（`chrome.storage.sync`）中，只发送到你自己配置的服务器
- `chrome://` 等浏览器内置页面无法抓取选中文字，属于浏览器限制
