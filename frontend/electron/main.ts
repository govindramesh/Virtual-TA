import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "node:path";
import { spawn, spawnSync } from "child_process";
let pythonprocess;
// let pythonProcess1 = spawnSync("python", ["../../Models/chatbox.py"]);
pythonprocess = spawnSync("python", ["../../Models/notestore.py"]);
// let pythonProcess3 = spawnSync("python", ["../../Models/notetaker.py"]);
console.log("FUCSAKLDJKLSJS DHkl");
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.xf
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

interface createWindowProps {
  indexPath: string;
  frame?: boolean;
  transparent?: boolean;
  resizable?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  inspect?: boolean;
}

// connecting to react part

// fs.writeFileSync("mylead.json", leadStr);
function createWindow({
  indexPath,
  frame,
  width,
  height,
  transparent,
  resizable,
  x,
  y,
  inspect,
}: createWindowProps) {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    frame,
    width,
    height,
    transparent,
    resizable,
  });

  // get rid of menu
  win.setMenu(null);

  //dev tools
  if (inspect) win.webContents.openDevTools();

  if (!!x && !!y) {
    win.setPosition(x, y);
  }

  // win.setAlwaysOnTop(true);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL + indexPath);
    // console.log(VITE_DEV_SERVER_URL + "index1.html");
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, indexPath));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow({ indexPath: "index.html" });
  }
});

app.on("browser-window-created", (_, window) => {
  require("@electron/remote/main").enable(window.webContents);
});
ipcMain.on("sendSummary", (event, args) => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  createWindow({
    indexPath: "live_summary.html",
    frame: true,
    x: width - 250 - 30,
    y: height - 450,
    width: 250,
    height: 400,
  });
});
ipcMain.on("sendChat", (event, args) => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  createWindow({
    indexPath: "main_chatbot.html",
    frame: true,
    x: 30,
    y: height - 450,
    width: 250,
    height: 400,
  });
});

app
  .whenReady()
  .then(() =>
    createWindow({ indexPath: "index.html", resizable: true, frame: true })
  );
ipcMain.on("startRecord", (event, args) => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  createWindow({
    indexPath: "chatbot_control.html",
    frame: false,
    transparent: true,
    resizable: true,
    width: 80,
    height: 80,
    x: 50,
    y: height - 50,
  });

  createWindow({
    indexPath: "summary_control.html",
    frame: false,
    transparent: true,
    resizable: false,
    width: 120,
    height: 80,
    x: width - 50 - 100,
    y: height - 50,
  });
  let pythonProcess4 = spawn("python", ["../Models/recorder.py"]);
  let pythonProcess5 = spawn("python", ["../../Models/transcriber.py"]);
});
