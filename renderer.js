/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const ipc = require("electron").ipcRenderer;

const syncMsgBtn = document.getElementById("btnGetLyric");
var songname;

syncMsgBtn.addEventListener("click", function () {
  const reply = ipc.sendSync("get-lyric", "");

  // setTimeout(function () {

  // }, 100);

  console.log("renderer.js @ 15 => " + reply);
  var taylor = JSON.parse(reply);
  console.log("renderer.js @ 17 => " + taylor);
  var message = taylor.lyric;
  songname = taylor.track_title;

  document.getElementById("taylor-lyric").innerHTML = message;
});

// const asyncMsgBtn = document.getElementById('sendAsyncMsgBtn')
// asyncMsgBtn.addEventListener('click', function () {
//     console.log("sendAsyncMsgBtn...")
//     ipc.send('asynchronous-message', "That's one small step for man")
// })

// ipc.on('asynchronous-reply', function (event, arg) {
//     const message = `Asynchronous message reply: ${arg}`
//     document.getElementById('asyncReply').innerHTML = message
// })
