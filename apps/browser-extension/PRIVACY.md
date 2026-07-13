# EdgeEver 网页剪藏 — 隐私政策 / Privacy Policy

最后更新 / Last updated: 2026-07-13

## 中文

**EdgeEver 网页剪藏**是一款用于把网页内容保存到用户自己部署的 EdgeEver 笔记服务的浏览器扩展。

- **收集哪些数据**：本扩展不收集、不统计、不追踪任何用户数据。没有分析代码，没有第三方服务。
- **数据流向**：只有在你主动点击保存时，扩展才会把当前页面的标题、网址和你选中的文字，发送到**你自己在设置里填写的 EdgeEver 服务器**。数据不会发送到任何其他地方。
- **本地存储**：服务器地址、API Token、默认笔记本和标签保存在浏览器的扩展存储（`chrome.storage.sync`）中，仅用于连接你自己的服务器。
- **权限说明**：
  - `activeTab` / `scripting`：读取当前页面的标题、网址和选中文字（仅在你点击扩展时）
  - `contextMenus`：提供右键快捷保存菜单
  - `storage`：保存你的服务器配置
  - 可选主机权限：仅在你保存设置时，向你填写的那一个域名申请访问权限
- **开源**：全部代码公开于 https://github.com/oldl108/edgeever/tree/main/apps/browser-extension

## English

**EdgeEver Web Clipper** saves web content to the user's own self-hosted EdgeEver instance.

- **Data collection**: none. No analytics, no tracking, no third-party services.
- **Data flow**: only when you explicitly click save, the current page title, URL, and selected text are sent to **the EdgeEver server you configured yourself**. Nothing is sent anywhere else.
- **Local storage**: server URL, API token, default notebook and tags are kept in `chrome.storage.sync` solely to connect to your own server.
- **Open source**: https://github.com/oldl108/edgeever/tree/main/apps/browser-extension
