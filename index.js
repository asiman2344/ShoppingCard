const icon=document.querySelector('.icon');
const closeBtn=document.querySelector('.close-button');
const card=document.querySelector('.card');
const list=document.querySelector('.list');
const button=document.querySelectorAll('.product-card-button');
const cardList=document.querySelector('.card-list');
const cardInput=document.querySelector('.card-list-input');
const cardProductPrice=document.querySelector('.card-product-price')

icon.addEventListener('click',function(){
    card.classList.add('open');
})

closeBtn.addEventListener('click',function(){
    card.classList.remove('open');
})

let products=[
    {
        id:1,
        image:'1.PNG',
        description:'High protein meal',
        price:10
    },

    {
        id:2,
        image:'2.PNG',
        description:'Chicken wings',
        price:10
    },

    {
        id:3,
        image:'3.PNG',
        description:'Salad with fish',
        price:10
    },

    {
        id:4,
        image:'4.PNG',
        description:'Soup',
        price:10
    },

    {   id:5,
        image:'5.PNG',
        description:'Rocket salad',
        price:10
    },

    {
        id:6,
        image:'6.PNG',
        description:'Pizza',
        price:10
    }
];

    products.forEach(function(el){
        let productDiv=document.createElement('div');
        productDiv.classList='product-card'
        productDiv.innerHTML=`
        <img class="product-card-img" src=${el.image} alt="">
        <p class="product-card-description">${el.description}</p>
        <div class="product-card-info">
            <span class="product-card-price">10$</span>
            <button class="product-card-button">
                <span class"span">Add</span>
            </button>
        </div>
        `

        list.appendChild(productDiv);
    })

// Orijinal fiyatları depolamak için bir nesne oluştur
let originalPrices = {};

products.forEach((product) => {
    originalPrices[product.id] = product.price;
});

let control=[];

list.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card-button')) {
        let parentDiv = e.target.closest('.product-card');
        let index = Array.from(list.children).indexOf(parentDiv);
        let productId = products[index].id;
        let productImg = products[index].image;
        let productPrice = products[index].price;

        let listDiv = document.createElement('div');
        listDiv.classList = 'card-list-product';

        listDiv.innerHTML = `
            <img class="card-list-img" src=${productImg} alt="">
            <div class="card-list-info">
                <span>${productPrice}$</span>
                <input type="number" min="1" max="10" value="1" class="card-list-input" data-product-id="${productId}">
                <button>clear</button>
            </div>
        `;

        if(!control.includes(productId)){
            cardList.appendChild(listDiv);
            control.push(productId)
        }
    }
});

function updateCardProductPrice() {
    let totalPrice = 0;

    // Iterate through each product in the card list
    document.querySelectorAll('.card-list-product').forEach((product) => {
        let inputValue = Number(product.querySelector('.card-list-input').value);
        let originalPrice = originalPrices[product.querySelector('.card-list-input').dataset.productId];

        totalPrice += inputValue * originalPrice;
    });

    // Update the cardProductPrice
    cardProductPrice.textContent = `${totalPrice}$`;
}

cardList.addEventListener('input', function (e) {
    if (e.target.classList.contains('card-list-input')) {
        let parentDiv = e.target.closest('.card-list-product');
        let inputValue = Number(e.target.value);
        let productId = e.target.dataset.productId;

        // Orijinal fiyatı al
        let originalPrice = originalPrices[productId];

        // Yeni değeri hesapla ve span'e güncelle
        parentDiv.querySelector('.card-list-info span').textContent = `${inputValue * originalPrice}$`;
        let a=Number(parentDiv.querySelector('.card-list-info span').textContent.slice(0,-1));

        updateCardProductPrice();
    }
});


cardList.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent.toLowerCase() === 'clear') {
        let parentDiv = e.target.closest('.card-list-product');
        let productId = parentDiv.querySelector('.card-list-input').dataset.productId;

        // Remove the product div from the card list
        parentDiv.remove();

        // Remove the productId from the control array
        control = control.filter(id => parseInt(id) !== parseInt(productId));

        updateCardProductPrice()

    }
});

