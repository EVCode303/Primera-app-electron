const { Menu, app, BrowserWindow, ipcMain } = require('electron');
let window, isWindowActive;
const mainUtilities = require('./main');

exports.openWindow = () => {
    window = new BrowserWindow({
        width: 500,
        height: 400,
        maxWidth: 500,
        maxHeight: 400,
        minWidth: 300,
        minHeight: 200,
        show: false, webPreferences: { nodeIntegration: true }
    });
    window.loadFile('src/productView.html');
    window.once('ready-to-show', window.show);
    window.setMenu(null);
    window.on('closed', () => isWindowActive = false);
    isWindowActive = true;
};

exports.closeWindow = () => {
    window.close();
}

exports.menuTemplate = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Crear nuevo producto',
                accelerator: (process.platform !== 'darwin') ? 'Ctrl+N' : 'command+N',
                click() {
                    !isWindowActive ? exports.openWindow() : window.focus();
                }
            },
            {
                label: 'Eliminar todos los productos',
                accelerator: (process.platform !== 'darwin') ? 'Ctrl+Shift+D' : 'command+D',
                click() {
                    mainUtilities.deleteAllItems();
                }
            },
            {
                label: 'Salir',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Vista',
        submenu: [
            { role: 'reload' },
            { role: 'toggledevtools' }
        ]
    }
]

exports.menuCreated = Menu.buildFromTemplate(this.menuTemplate);