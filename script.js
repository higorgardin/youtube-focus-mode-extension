/**
 * Tratamentos de inicialização
 */
function onInit() {
  addListeners();
  handleSettings();
}

/**
 * Gerencia as configurações da extensão
 */
function handleSettings() {
  chrome.storage.sync.get(["isEnabled"], function (result) {
    if (document && document.getElementById("enableDisable")) {
      if (Boolean(result.isEnabled)) {
        document.getElementById("enableDisable").checked = true;
      } else {
        document.getElementById("enableDisable").checked = false;
      }
    }
  });
}

/**
 * Adiciona os listeners
 */
function addListeners() {
  if (document && document.getElementById("enableDisable")) {
    document
      .getElementById("enableDisable")
      .addEventListener("change", (event) => {
        const isChecked = document.getElementById("enableDisable").checked;

        chrome.storage.sync.set({ isEnabled: isChecked }, function () {});

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: reloadPage,
          });
        });
      });
  }
}

/**
 * Recarrega a página
 */
function reloadPage() {
  const currentLocation = window.location;
  currentLocation.reload();
}

onInit();
