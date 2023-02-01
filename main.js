// creates browser and loads html into it

const { app, BrowserWindow } = require("electron");

const windows = new Set();

function createWindow() {
    let win = new BrowserWindow({
        width: 1920,
        height: 1080,
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

    win.loadFile('src/mainPage.html');
}

app.whenReady().then(() => {
    if (windows.size == 0) {
        createWindow()
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})