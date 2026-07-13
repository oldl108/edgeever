const { getConfig, setConfig, normalizeBaseUrl, listNotebooks } =
  globalThis.EdgeEverApi;

const $ = (id) => document.getElementById(id);
const setStatus = (text, cls = "") => {
  const el = $("status");
  el.textContent = text;
  el.className = cls;
};

const fillNotebooks = (notebooks, selectedId) => {
  const select = $("notebook");
  select.innerHTML = "";
  for (const nb of notebooks) {
    const option = document.createElement("option");
    option.value = nb.id;
    option.textContent = nb.name;
    if (nb.id === selectedId) option.selected = true;
    select.appendChild(option);
  }
};

const init = async () => {
  const config = await getConfig();
  $("baseUrl").value = config.baseUrl;
  $("token").value = config.token;
  $("tags").value = config.defaultTags;
  if (config.baseUrl && config.token) {
    try {
      fillNotebooks(await listNotebooks(config), config.defaultNotebookId);
    } catch {
      // 未授权或网络问题时留空，用户点保存时会重试
    }
  }
};

$("save").addEventListener("click", async () => {
  setStatus("正在测试连接…");
  const baseUrl = normalizeBaseUrl($("baseUrl").value);
  const token = $("token").value.trim();
  if (!baseUrl || !token) {
    setStatus("请填写服务器地址和 API Token", "err");
    return;
  }

  let origin;
  try {
    origin = `${new URL(baseUrl).origin}/*`;
  } catch {
    setStatus("服务器地址格式不正确", "err");
    return;
  }

  const granted = await chrome.permissions.request({ origins: [origin] });
  if (!granted) {
    setStatus("需要授权访问该域名才能保存笔记", "err");
    return;
  }

  try {
    const probe = { baseUrl, token };
    const notebooks = await listNotebooks(probe);
    const previous = await getConfig();
    const keepSelected =
      $("notebook").value ||
      previous.defaultNotebookId ||
      (notebooks[0] && notebooks[0].id) ||
      "";
    fillNotebooks(notebooks, keepSelected);

    await setConfig({
      baseUrl,
      token,
      defaultNotebookId: $("notebook").value,
      defaultTags: $("tags").value.trim() || "剪藏",
    });
    setStatus(`连接成功，已加载 ${notebooks.length} 个笔记本，设置已保存 ✓`, "ok");
  } catch (err) {
    setStatus(`连接失败：${err.message}`, "err");
  }
});

$("notebook").addEventListener("change", async () => {
  const config = await getConfig();
  if (config.baseUrl && config.token) {
    await setConfig({ defaultNotebookId: $("notebook").value });
  }
});

init();
