importScripts("api.js");

const { getConfig, listNotebooks, createMemo, parseTags, buildClipMarkdown } =
  globalThis.EdgeEverApi;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "edgeever-save-selection",
    title: "保存选中内容到 EdgeEver",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "edgeever-save-page",
    title: "保存本页链接到 EdgeEver",
    contexts: ["page"],
  });
});

const flashBadge = (ok) => {
  chrome.action.setBadgeBackgroundColor({ color: ok ? "#16a34a" : "#dc2626" });
  chrome.action.setBadgeText({ text: ok ? "✓" : "!" });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 4000);
};

const resolveNotebookId = async (config) => {
  if (config.defaultNotebookId) return config.defaultNotebookId;
  const notebooks = await listNotebooks(config);
  if (!notebooks.length) throw new Error("EdgeEver 里还没有任何笔记本");
  return notebooks[0].id;
};

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    const config = await getConfig();
    const notebookId = await resolveNotebookId(config);
    const title = (tab?.title || "网页剪藏").slice(0, 160);
    const url = info.pageUrl || tab?.url || "";
    const selectionText =
      info.menuItemId === "edgeever-save-selection" ? info.selectionText || "" : "";

    await createMemo(config, {
      notebookId,
      title,
      contentMarkdown: buildClipMarkdown({ url, selectionText }),
      tags: parseTags(config.defaultTags),
    });
    flashBadge(true);
  } catch (err) {
    console.error("EdgeEver clip failed:", err);
    flashBadge(false);
  }
});
