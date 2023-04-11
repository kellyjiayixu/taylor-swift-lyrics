// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["v8", "chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }  
  // replaceText(`v8-version`, process.versions["v8"]);

  // const element = document.getElementById("v8-version");
  // if (element) element.innerText = process.versions["v8"];


  // replaceText(`chrome-version`, process.versions["chrome"]);
  // replaceText(`node-version`, process.versions["node"]);
  // replaceText(`electron-version`, process.versions["electron"]);

  // const ipc = require('electron').ipcRenderer
  // const reply = ipc.sendSync('synchronous-message', 'Mr. Watson, come here.')
  // console.log(reply)
  // const message = `Synchronous message reply: ${reply}`
  // document.getElementById('syncReply').innerHTML = message 
});
