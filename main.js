const { app, BrowserWindow } = require("electron");

const windows = new Set();

function createWindow() {
    let win = new BrowserWindow({
        width: 1280,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
        }
    });

    windows.add(win)

    win.on("closed", () => {
        windows.delete(win);
        win = null;
    });

    win.loadFile('src/index.html');
}

app.whenReady().then(() => {
    if (windows.size == 0) {
        createWindow()
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})