const { app, BrowserWindow } = require('electron');
const path = require('path');

// CREATE DESKTOP APP WINDOW
function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL('http://localhost:5000/');
}

// INITIALIZES ELECTRON WHEN THE APP IS READY
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// CLOSE THE APP WHEN ALL WINDOWS ARE CLOSED
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});