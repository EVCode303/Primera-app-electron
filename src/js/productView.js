const { ipcRenderer } = require('electron');

let productForm = document.querySelector('#productForm'),
    productName = document.querySelector('#productName'),
    productDescription = document.querySelector('#productDescription'),
    productPrice = document.querySelector('#productPrice'),
    productSubmit = document.querySelector('#productSubmit');

productName.focus();

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = {
        name: productName.value,
        description: productDescription.value,
        price: productPrice.value
    }
    ipcRenderer.send('product-info', product);
});