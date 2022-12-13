import {menuArray, stars} from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const mainDiv = document.getElementById("main")
const orderDiv = document.getElementById("order")

let totalPrice = 0
let productsOrederedArray = []
let discountAmount = 0
let ratedHtml = ``

document.addEventListener("click", function(e) {
    if(e.target.dataset.addBtn){
        orderDiv.style.display = "flex"
        addProductToTheOrder(e.target.dataset.addBtn)
    }
    else if(e.target.dataset.remove) {
        removeProduct(e.target.dataset.remove)
    }
    else if(e.target.id === "complete-order-btn") {
        completeOrder()
    }
    else if(e.target.id === "pay-btn") {
        finishTheOrder()
    } 
    else if(e.target.dataset.rate) {
        rateOrder(e.target.dataset.rate)
    }
    else if(e.target.id === "close-final-btn") {
        document.getElementById("final").style.display = "none"
    }
})

function getHtml() {
    let mainHtml = ``
    menuArray.forEach(function(product) {
        mainHtml += `
<div class="product-div">
    <i class="product-image">${product.emoji}</i>
    <div class="product-info">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-ingredients">${product.ingredients}</p>
        <p class="product-price">$${product.price}</p>
    </div>        
    <button class="add-product-btn" data-add-btn="${product.uuid}">+</button>
</div>
        `
    })
    mainDiv.innerHTML = mainHtml
}

function displayOrder() {
    let productAddedHtml = ``
    productsOrederedArray.forEach(function(product) {
        productAddedHtml += product.html
    })
    let orderHtml = `
<div id="order-div">
    <p id="order-title">Your Order</p>
    ${productAddedHtml}
    <div id="discount-div">
        <p id="discount-title">Discount</p>
        <p id="discount-amount">$${discountAmount}</p>
    </div>
    <div id="total-price-div">
        <p id="total-title">Total price:</p>
        <p id="total-price">$${totalPrice}</p>
    </div>
    <button id="complete-order-btn">Complete order</button>
</div>
    `
    orderDiv.innerHTML = orderHtml
}

function addProductToTheOrder(productId) {
    const productAdded = menuArray.filter(function(product){
        return product.uuid === productId
    })[0]
    let productHtml = ``
    if(!productAdded.isOrdered) {
        productHtml = `
    <div id="products-ordered">
        <div class="product-added">
            <p class="product-name">${productAdded.name} <span class="remove" data-remove=${productAdded.uuid}>remove</span></p>
            <p class="product-price">$${productAdded.price}</p>            
        </div>
    </div>
    `
    productAdded.isOrdered = true
    productsOrederedArray.push( {
        name: productAdded.name,
        html: productHtml,
        uuid: productAdded.uuid,
        price: productAdded.price
    })
    totalPrice = 0
    productsOrederedArray.forEach(function(prod) {
        totalPrice += prod.price
    })
    getDiscount()
    }
    displayOrder()
}

function removeProduct(productId) {
    const notOrdered = menuArray.filter(function(product) {
        if (product.uuid === productId) {
            product.isOrdered = false
        }
    })
    const toRemoveProduct = productsOrederedArray.filter(function(product, index) {
        totalPrice = 0
        discountAmount = 0
        if (product.uuid === productId) {
            productsOrederedArray.splice(index, 1)
            productsOrederedArray.forEach(function(prod) {
                totalPrice += prod.price
            })
            getDiscount()
            displayOrder()
        }
    })
}

function getDiscount() {
    const isDrinkInOrder = productsOrederedArray.filter(function(product) {
        if (product.name === "Coffee" && productsOrederedArray.length > 1) {
            discountAmount = totalPrice * 0.1 //discount
            totalPrice -= discountAmount
            
        }
    })
}

function completeOrder() {
    if (productsOrederedArray.length > 0) {
        document.getElementById("pay-card").style.display = "flex"
    }
}

function finishTheOrder() {
    document.getElementById("pay-card").style.display = "none"
    document.getElementById("order-div").style.display = "none"
    displayFinalCard()
}

function rateOrder(starValue) {
     const isClickedStar = stars.filter(function(star) {
        return star.value === starValue
    })[0]
    stars.forEach(function(star) {
        if(star.value <= isClickedStar.value) {
            star.isClicked = true
            ratedHtml = `
        <div id="rated">You rated ${isClickedStar.value} stars. We appreciate your opinion.</div>
    `
        }
    })
    displayFinalCard()
}

function displayFinalCard() {
    const starsDiv = document.getElementById("stars")
    let starsHtml = ``
    let ratingClass = ``
    stars.forEach(function(star) {
        if(star.isClicked) {
            ratingClass = `rating`
            star.isClicked = false
        }
        else {
            ratingClass = ``
        }
        starsHtml += `
            <i class="fa-solid fa-star ${ratingClass}" data-rate="${star.value}" 
            id="${star.value}"></i>
        `
    })
    starsDiv.innerHTML = starsHtml + ratedHtml
    document.getElementById("final").style.display = "flex"
}

getHtml()
displayOrder()
