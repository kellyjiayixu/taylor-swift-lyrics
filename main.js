// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

var taylor_lyrics;
// var jsonTL;

function getLyric() {
  var http = require("http");
  var equal = require("assert").equal;

  // var username = "falcon";
  // var password = "";
  // var _auth =
  //   "Basic " + Buffer.from(username + ":" + password).toString("base64");

  var options = {
    host: "localhost",
    port: 28282,
    path: "/getLyric",
    method: "GET",
    headers: {
      accept: "*/*",
      "content-type": "application/json",
      "accept-encoding": "gzip, deflate",
      "accept-language": "en-US,en;q=0.9",
      "user-agent": "nodejs rest client",
    },
  };

  var req = http.request(options, function (res) {
    //   console.log("STATUS: " + res.statusCode);
    equal(200, res.statusCode);
    //   console.log("HEADERS: " + JSON.stringify(res.headers));

    res.on("data", function (chunk) {
      // console.log(typeof(chunk));
      taylor_lyrics = " " + chunk;
      console.log("main.js @ 41 => " + taylor_lyrics);
      // jsonTL = JSON.parse(taylor_lyrics);
      // console.log("main.js @ 43 = >" + jsonTL.lyric);
    });
  });

  req.on("error", function (e) {
    console.log("problem with request: " + e.message);
  });

  req.end();
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false, //  Uncaught ReferenceError: require is not defined错误就会消失
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // mainWindow.once('ready-to-show', () => {
  // 	mainWindow.webContents.send('init_win_id', win22.id);
  // 	mainWindow.show()
  // })

  // mainWindow.webContents.on('did-finish-load', function() {
  //   mainWindow.webContents.send('ping', 'hello world!!');
  //   });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const ipc = require("electron").ipcMain;

ipc.on("get-lyric", function (event, arg) {
  getLyric();
  setTimeout(function () {
    console.log("main.js @ 110 => " + taylor_lyrics);
    event.returnValue = taylor_lyrics;
  }, 1000);
});
