const { ipcRenderer } = require('electron');
const itemsFunctions = require('./mainItems');

let overlay = document.querySelector('#overlay'),
    itemsContainer = document.querySelector('#itemsContainer');

window.addEventListener('load', () => {
    itemsFunctions.toggleOverlay(overlay);
    itemsFunctions.paintExistingItems(itemsContainer);
    itemsFunctions.deleteItemListener();
});

ipcRenderer.on('add-product', (e, newProduct) => {
    itemsFunctions.addItem(itemsContainer, newProduct);
    itemsFunctions.toggleOverlay(overlay);
});

ipcRenderer.on('delete-all-items', (e, args) => {
    localStorage.clear();
    itemsContainer.innerHTML = ``;
    itemsFunctions.toggleOverlay(overlay);
});

exports.overlay = overlay;
exports.itemsContainer = itemsContainer;