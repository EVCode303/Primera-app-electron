const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const windowState = require('electron-window-state');
const menu = require('./menu');
let mainWindow, mainWindowPosition;

const createWindow = () => {
    mainWindowPosition = new windowState({
        defaultWidth: 800,
        defaultHeight: 600
    });

    mainWindow = new BrowserWindow({
        minWidth: 300,
        minHeight: 250,
        width: mainWindowPosition.width,
        height: mainWindowPosition.height,
        x: mainWindowPosition.x,
        y: mainWindowPosition.y,
        show: false,
        webPreferences: { nodeIntegration: true }
    });

    Menu.setApplicationMenu(menu.menuCreated);

    mainWindow.loadFile('src/mainView.html');
    mainWindow.on('ready-to-show', mainWindow.show);
    mainWindow.on('closed', () => app.quit());
};

ipcMain.on('product-info', (e, product) => {
    mainWindow.webContents.send('add-product', product);
    menu.closeWindow();
});

app.once('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});

exports.deleteAllItems = () => {
    mainWindow.webContents.send('delete-all-items');
};