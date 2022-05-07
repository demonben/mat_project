'use strict'

const capesChoice = document.querySelector('.capes-choice')
const outPrice = document.querySelector('.box-constructor-price__sum')


const swiper = new Swiper('.box-constructor-slider', {
    loop: true,

    navigation: {
        nextEl: '.box-constructor-slider__button_right',
        prevEl: '.box-constructor-slider__button_left',
    }
})

capesChoice.addEventListener('click', (e) => {
    if (e.target.checked) {
        outPrice.textContent = e.target.value
    }
})
