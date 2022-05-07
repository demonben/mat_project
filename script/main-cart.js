'use strict'


const addToCartBtn = document.querySelector('.constructor-footer__button')
const overlayCart = document.querySelector('.overlay')
const cart = document.querySelector('.cart')
const cartBtn = document.querySelector('.header__cart')
const cartInfo = cart.querySelector('.cart__wr')


const addToCartProduct = () => {
    const createItem = (data) => {
        cartInfo.innerHTML = ''
        data.forEach(item => {
            const createItem = document.createElement('div')
            createItem.classList.add('cart__item')
            createItem.innerHTML = `
                        <div class="cart__img">
                            <img src="./img/rugs/${item.id}.jpg" alt="image">
                        </div>
                        <div class="cart__info">
                            <h3 class="cart__name">
                                ${item.name}
                            </h3>
                            <span class="cart__color">
                                Цвет: ${item.color}<br>Строчка: ${item.colorStr}
                            </span>
                            <div class="cart__color">
                                <div>${item.addOptions.row}</div>
                                <div>${item.addOptions.trunk}</div>
                                <div>${item.addOptions.foot}</div>
                                <div>${item.addOptions.nameplate}</div>
                            </div>
                            <span class="cart__id">
                                id: <span class="cart__id_num">${item.id}</span>
                            </span>
                        </div>
                        <div class="cart-counter">
                            <div class="cart-counter__btn cart-counter__btn_minus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"> <path d="M14 31H50" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M32 62.999C49.1203 62.999 62.999 49.1203 62.999 32C62.999 14.8797 49.1203 1.00098 32 1.00098C14.8797 1.00098 1.00101 14.8797 1.00101 32C1.00101 49.1203 14.8797 62.999 32 62.999Z" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> </svg>
                            </div>
                            <div class="cart-counter__count">
                                ${item.count}
                            </div>
                            <div class="cart-counter__btn cart-counter__btn_plus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"> <path d="M32 50V14" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M14 32H50" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M32 62.999C49.1203 62.999 62.999 49.1203 62.999 32C62.999 14.8797 49.1203 1.00098 32 1.00098C14.8797 1.00098 1.00101 14.8797 1.00101 32C1.00101 49.1203 14.8797 62.999 32 62.999Z" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> </svg>
                            </div>
                        </div>
                        <div class="cart__price">
                            ${+item.price * +item.count}
                        </div>
                        <button class="cart__del">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"> <path d="M18.947 17.1533L45.045 43.0563" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M19.045 43.1527L44.947 17.0557" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M32 62.999C49.1203 62.999 62.999 49.1203 62.999 32C62.999 14.8797 49.1203 1.00098 32 1.00098C14.8797 1.00098 1.00101 14.8797 1.00101 32C1.00101 49.1203 14.8797 62.999 32 62.999Z" stroke="#E42E3A" stroke-width="2" stroke-miterlimit="10"/> </svg>
                        </button>
                   `
            cartInfo.append(createItem)
        })
    }

    const addProductToCart = () => {
        let getCart = JSON.parse(localStorage.getItem('cart'))

        if (getCart) {
            const idProduct = appData.imageNumber
            const variantRugs = appData.numberRugs
            const clickedGoods = Object.keys(getCart).find(good => good === idProduct)
            const variantGoods = Object.keys(getCart).find(good => good === variantRugs)


            if (clickedGoods && variantGoods) {
                getCart[idProduct]['count'] += 1
            } else {
                getCart[appData.imageNumber] = {
                    count: 1,
                    id: appData.imageNumber,
                    name: appData.numberRugs,
                    price: appData.fullPrice,
                    color: appData.skinColorName,
                    colorStr: appData.colorStrName,
                    addOptions: appData.otherServiceName
                }
            }
        } else {
            getCart = {
                [appData.imageNumber] : {
                    count: 1,
                    id: appData.imageNumber,
                    name: appData.numberRugs,
                    price: appData.fullPrice,
                    color: appData.skinColorName,
                    colorStr: appData.colorStrName,
                    addOptions: appData.otherServiceName
                }
            }
        }

        localStorage.setItem('cart', JSON.stringify(getCart))
        createItem(Object.values(getCart))
    }

    cart.addEventListener('click', (e) => {

        if (e.target.closest('.cart__close')) {
            overlayCart.classList.remove('overlay_active')
        }

        if (e.target.closest('.cart__item')) {
            const cartID = e.target.closest('.cart__item').querySelector('.cart__id_num').textContent
            if (e.target.closest('.cart-counter__btn_plus')) {
                const getCart = JSON.parse(localStorage.getItem('cart'))

                const clickedGoods = Object.keys(getCart).find(good => good === cartID)

                if (clickedGoods) {
                    getCart[cartID]['count'] += 1
                }
                localStorage.setItem('cart', JSON.stringify(getCart))
                createItem(Object.values(getCart))
            }
            if (e.target.closest('.cart-counter__btn_minus')) {
                const getCart = JSON.parse(localStorage.getItem('cart'))

                const clickedGoods = Object.keys(getCart).find(good => good === cartID)

                if (clickedGoods && getCart[cartID]['count'] > 1) {
                    getCart[cartID]['count'] -= 1
                } else {
                    delete getCart[cartID]
                }
                localStorage.setItem('cart', JSON.stringify(getCart))
                createItem(Object.values(getCart))
            }
            if (e.target.closest('.cart__del')) {
                const getCart = JSON.parse(localStorage.getItem('cart'))

                const clickedGoods = Object.keys(getCart).find(good => good === cartID)

                if (clickedGoods) {
                    delete getCart[cartID]
                }
                localStorage.setItem('cart', JSON.stringify(getCart))
                createItem(Object.values(getCart))
            }
        }
    })

    cartBtn.addEventListener('click', () => {
        if (JSON.parse(localStorage.getItem('cart'))) {
            const keys = Object.values(JSON.parse(localStorage.getItem('cart')))
            createItem(keys)
        }
        overlayCart.classList.add('overlay_active')
    })

    addToCartBtn.addEventListener('click', () => {
        addProductToCart()
    })
}

addToCartProduct()