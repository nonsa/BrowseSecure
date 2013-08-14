function closeme(){window.close()}
document.getElementById('verstr').textContent=chrome.runtime.getManifest().version;
document.getElementById('close').addEventListener("click",closeme);