
let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Call Of Duty: Modern Warfare (2019)',
        tag: 'callofduty',
        price: 60,
        inCart: 0
    },
    {
        name: 'NBA2k21',
        tag: 'nba2k21',
        price: 60,
        inCart: 0
    },
    {
        name: 'Need For Speed Heat',
        tag:'needforspeedheat',
        price: 50,
        inCart: 0
    },
    {
        name: 'Elder Scrolls V: Skyrim',
        tag: 'skyrim',
        price: 20,
        inCart: 0
    },
    {
        name: 'Tekken 7',
        tag: 'tekken7',
        price: 30,
        inCart: 0
    }
];

 for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
 }

 function onLoadCartNumbers() {
     let productNumbers = localStorage.getItem('cartNumbers');

     if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
     }
 }

 function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
     } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
        }  
    setItems(product); 
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
    }
 }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    console.log("my cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON. parse(cartItems);
    let productContainer = document.querySelector
    ('.products');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer ) {
       productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <image src="${item.tag}.jpg" width="50" height="50" class="center">
                <span>${item.name}</span>
            </div>
            <div class="price" style="float: left; color: gray">xxxxxxxxxxxxxxxxxxxxxxxxxxxx<p style="color: black; margin: 0px">$${item.price}.00</p></div>
            <div class="total" style="float: right; color: gray">xxxx<p style="color: black; margin: 0px">
                <span>$${item.inCart * item.price}.00</span>
            </div>
            <div class = "quantity" style="float: left; color: gray">xxxxxxxxxxxx<p style="color: black; margin: 0px">${item.inCart}</p></div>
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total:  $</h4>
            <h4 class="basketTotal">
            ${cartCost}.00
            </h4>
        `;

    }
}

function purchaseCart() {
    alert("Thank you for your purchase!");
}

function clearCart() {
    localStorage.clear();
    alert("The cart is now empty");
}

onLoadCartNumbers();
displayCart();

