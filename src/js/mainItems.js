const mainTools = require('./mainView');

exports.getProducts = () => {
    let items = [];
    for(let i in localStorage){
        if(typeof localStorage[i] === 'string'){
            items.push(JSON.parse(localStorage[i]));
        }
    }
    return items;
};

exports.save = (product) => localStorage.setItem(product.name, JSON.stringify(product));

exports.templateItem = (itemsContainer, product) => {
    itemsContainer.innerHTML += `
        <div class="item">
            <h3 class="item__title">${product.name}</h3>
            <p class="item__description">${product.description}</p>
            <h2 class="item__price">${product.price}</h2>
            <div class="item__btn">
                <button type="button" class="item__delete" id="itemDelete">Delete</button>
            </div>
        </div>
    `;
}

exports.toggleOverlay = (overlay) => this.getProducts().length === 0 ? overlay.style.display = 'flex' : overlay.style.display = 'none';

exports.addItem = (itemsContainer, product) => {
    this.templateItem(itemsContainer, product);
    this.save(product);
    this.deleteItemListener();
}

exports.paintExistingItems = (itemsContainer) => {
    if (this.getProducts()) {
        this.getProducts().forEach((product) => {
            this.templateItem(itemsContainer, product);
        });
    }
};


const deleteItem = (btnDel) => {
    let productCard = btnDel.parentElement.parentElement;
    let productName = productCard.querySelector('.item__title').innerText;
    this.getProducts().forEach((product) => {
        if(product.name === productName) {
            localStorage.removeItem(productName);
            productCard.remove();
            this.toggleOverlay(mainTools.overlay);
            return;
        }
    });

}

exports.deleteItemListener = () => {
    let btnsDeleteItem = document.querySelectorAll('#itemDelete');
    btnsDeleteItem.forEach((btnDel) => {
        btnDel.addEventListener('click', () => deleteItem(btnDel));
    });
}   

exports.clearItems = () => {
    
}