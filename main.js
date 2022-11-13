const { app, BrowserWindow } = require("electron");

function createWindow () {
    const win = new BrowserWindow({
        width: 1280,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
        }
    });

    win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})