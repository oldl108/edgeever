// EdgeEver REST API helper, shared by popup / options / background.
// Classic script: attaches EdgeEverApi to globalThis so the MV3 service
// worker can load it with importScripts and pages with <script src>.

(() => {
  const DEFAULTS = {
    baseUrl: "",
    token: "",
    defaultNotebookId: "",
    defaultTags: "剪藏",
  };

  const getConfig = () =>
    new Promise((resolve) => {
      chrome.storage.sync.get(DEFAULTS, resolve);
    });

  const setConfig = (values) =>
    new Promise((resolve) => {
      chrome.storage.sync.set(values, resolve);
    });

  const normalizeBaseUrl = (input) => {
    let url = String(input || "").trim();
    if (!url) return "";
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
    return url.replace(/\/+$/, "");
  };

  const request = async (config, path, options = {}) => {
    const baseUrl = normalizeBaseUrl(config.baseUrl);
    if (!baseUrl) throw new Error("尚未配置服务器地址");
    if (!config.token) throw new Error("尚未配置 API Token");

    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    let body = null;
    try {
      body = await res.json();
    } catch {
      // non-JSON error responses fall through with status text below
    }

    if (!res.ok) {
      const message =
        (body && body.error && (body.error.message || body.error)) ||
        `HTTP ${res.status}`;
      throw new Error(typeof message === "string" ? message : `HTTP ${res.status}`);
    }
    return body;
  };

  const listNotebooks = async (config) => {
    const body = await request(config, "/api/v1/notebooks");
    return body.notebooks || [];
  };

  const createMemo = (config, memo) =>
    request(config, "/api/v1/memos", {
      method: "POST",
      body: JSON.stringify(memo),
    });

  const parseTags = (raw) =>
    String(raw || "")
      .split(/[,，\s]+/)
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

  const buildClipMarkdown = ({ url, selectionText, comment }) => {
    const parts = [`来源：[${url}](${url})`];
    if (selectionText && selectionText.trim()) {
      const quoted = selectionText
        .trim()
        .split(/\r?\n/)
        .map((line) => `> ${line}`)
        .join("\n");
      parts.push(quoted);
    }
    if (comment && comment.trim()) {
      parts.push(comment.trim());
    }
    return parts.join("\n\n");
  };

  globalThis.EdgeEverApi = {
    getConfig,
    setConfig,
    normalizeBaseUrl,
    listNotebooks,
    createMemo,
    parseTags,
    buildClipMarkdown,
  };
})();
