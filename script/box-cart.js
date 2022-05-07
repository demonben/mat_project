'use strict'

const boxCart = () => {
    const skinColorItem = document.querySelector('.box-constructor__item_skin')
    const strColorItem = document.querySelector('.box-constructor__item_str')
    const endingColorItem = document.querySelector('.box-constructor__item_edging')
    const buttonBuy = document.querySelector('.box-constructor-price__button')
    const errorMess = document.querySelector('.constructor__error')
    const addToCartBtn = document.querySelector('.constructor-footer__button')
    const overlayCart = document.querySelector('.overlay')
    const cart = document.querySelector('.cart')
    const cartBtn = document.querySelector('.header__cart')
    const cartInfo = cart.querySelector('.cart__wr')
    const cartClose = cart.querySelector('.cart__close')

    const settings = {
        skinColor: '',
        strColor: '',
        endingColor: '',
        size: '',
        price: ''
    }

    const validate = () => {
        if ((settings.skinColor && settings.strColor && settings.endingColor !== '')
            && (sumOut.textContent !== '0')) {
            errorMess.classList.remove('constructor__error_active')
            buttonBuy.classList.add('box-constructor-price__button_active')
        } else {
            buttonBuy.classList.remove('box-constructor-price__button_active')
            errorMess.classList.add('constructor__error_active')
        }
    }

    const createItemBox = (data) => {
        cartInfo.innerHTML = ''
        data.forEach(item => {
            const createItem = document.createElement('div')
            createItem.classList.add('cart__item')
            createItem.innerHTML = `
                        <div class="cart__info">
                            <h3 class="cart__name">
                                ${item.size}
                            </h3>
                            <span style="margin: 0;" class="cart__color">
                                ${item.skinColor}<br>${item.strColor}
                            </span>
                            <span class="cart__id">
                                <span class="cart__id_num">${item.endingColor}</span>
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
        let getCart = JSON.parse(localStorage.getItem('box-cart'))

        if (getCart) {
            const idProduct = settings.size
            const clickedGoods = Object.keys(getCart).find(good => good === idProduct)

            if (clickedGoods) {
                getCart[idProduct]['count'] += 1
            } else {
                getCart[idProduct] = {
                    count: 1,
                    skinColor: settings.skinColor,
                    strColor: settings.strColor,
                    endingColor: settings.endingColor,
                    size: settings.size,
                    price: settings.price
                }
            }
        } else {
            getCart = {
                [settings.size] : {
                    count: 1,
                    skinColor: settings.skinColor,
                    strColor: settings.strColor,
                    endingColor: settings.endingColor,
                    size: settings.size,
                    price: settings.price,
                }
            }
        }

        localStorage.setItem('box-cart', JSON.stringify(getCart))
        createItemBox(Object.values(getCart))
    }

    cart.addEventListener('click', (e) => {

        if (e.target.closest('.cart__close')) {
            overlayCart.classList.remove('overlay_active')
        }

        if (e.target.closest('.cart__item')) {
            const cartID = e.target.closest('.cart__item').querySelector('.cart__name').textContent.trim()
            if (e.target.closest('.cart-counter__btn_plus')) {
                const getCart = JSON.parse(localStorage.getItem('box-cart'))

                const clickedGoods = Object.keys(getCart).find(good => good === cartID)

                if (clickedGoods) {
                    getCart[cartID]['count'] += 1
                }
                localStorage.setItem('box-cart', JSON.stringify(getCart))
                createItemBox(Object.values(getCart))
            }
            if (e.target.closest('.cart-counter__btn_minus')) {
                const getCart = JSON.parse(localStorage.getItem('box-cart'))

                const clickedGoods = Object.keys(getCart).find(good => good === cartID)

                if (clickedGoods && getCart[cartID]['count'] > 1) {
                    getCart[cartID]['count'] -= 1
                } else {
                    delete getCart[cartID]
                }
                localStorage.setItem('box-cart', JSON.stringify(getCart))
                createItemBox(Object.values(getCart))
            }
            if (e.target.closest('.cart__del')) {
                const getCart = JSON.parse(localStorage.getItem('box-cart'))

                const clickedGoods = Object.keys(getCart).find(good => good === cartID)

                if (clickedGoods) {
                    delete getCart[cartID]
                }
                localStorage.setItem('box-cart', JSON.stringify(getCart))
                createItemBox(Object.values(getCart))
            }
        }
    })

    skinColorItem.onclick = ((e) => {
        if (e.target.checked) {
            settings.skinColor = e.target.value
            validate()
        }
    })

    strColorItem.onclick = ((e) => {
        if (e.target.checked) {
            settings.strColor = e.target.value
            validate()
        }
    })

    endingColorItem.onclick = ((e) => {
        if (e.target.checked) {
            settings.endingColor = e.target.value
            validate()
        }
    })

    selects.forEach(item => {
        item.addEventListener('change', (e) => {
            validate()
            settings.size = e.target.options[e.target.selectedIndex].getAttribute('aria-label')
            settings.price = e.target.value
        })
    })

    cartBtn.addEventListener('click', () => {
        if (JSON.parse(localStorage.getItem('cart'))) {
            const keys = Object.values(JSON.parse(localStorage.getItem('box-cart')))
            createItemBox(keys)
        }
        overlayCart.classList.add('overlay_active')
    })

    cartClose.addEventListener('click', () => {
        overlayCart.classList.remove('overlay_active')
    })

    buttonBuy.addEventListener('click', (e) => {
        e.preventDefault()
        addProductToCart()
    })
}

boxCart()