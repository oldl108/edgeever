const { getConfig, listNotebooks, createMemo, parseTags, buildClipMarkdown } =
  globalThis.EdgeEverApi;

const $ = (id) => document.getElementById(id);
const setStatus = (text, cls = "") => {
  const el = $("status");
  el.textContent = text;
  el.className = cls;
};

let pageUrl = "";

const getActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

const getSelectionText = async (tabId) => {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => window.getSelection().toString(),
    });
    return results?.[0]?.result || "";
  } catch {
    return ""; // chrome:// 等受限页面无法注入
  }
};

const init = async () => {
  const config = await getConfig();
  if (!config.baseUrl || !config.token) {
    $("setup").style.display = "block";
    $("form").style.display = "none";
    $("open-options").addEventListener("click", (e) => {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
    });
    return;
  }

  const tab = await getActiveTab();
  pageUrl = tab?.url || "";
  $("title").value = (tab?.title || "").slice(0, 160);
  $("tags").value = config.defaultTags || "";

  const selection = tab?.id ? await getSelectionText(tab.id) : "";
  if (selection.trim()) {
    $("content").value = selection.trim();
  }

  try {
    const notebooks = await listNotebooks(config);
    const select = $("notebook");
    for (const nb of notebooks) {
      const option = document.createElement("option");
      option.value = nb.id;
      option.textContent = nb.name;
      if (nb.id === config.defaultNotebookId) option.selected = true;
      select.appendChild(option);
    }
    if (!notebooks.length) {
      setStatus("EdgeEver 里还没有笔记本，请先在应用里创建一个", "err");
      $("save").disabled = true;
    }
  } catch (err) {
    setStatus(`加载笔记本失败：${err.message}`, "err");
    $("save").disabled = true;
  }
};

$("save").addEventListener("click", async () => {
  const button = $("save");
  button.disabled = true;
  setStatus("保存中…");
  try {
    const config = await getConfig();
    await createMemo(config, {
      notebookId: $("notebook").value,
      title: $("title").value.trim().slice(0, 160) || "网页剪藏",
      contentMarkdown: buildClipMarkdown({
        url: pageUrl,
        selectionText: $("content").value,
      }),
      tags: parseTags($("tags").value),
    });
    setStatus("已保存 ✓", "ok");
    setTimeout(() => window.close(), 900);
  } catch (err) {
    setStatus(`保存失败：${err.message}`, "err");
    button.disabled = false;
  }
});

init();
