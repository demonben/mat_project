'use strict'

const buttonsType = document.querySelector('.box-constructor-toggle')
const selects = document.querySelectorAll('.box-constructor__select')
const sumOut = document.querySelector('.box-constructor-price__sum')


const swiper = new Swiper('.box-constructor-slider', {
    loop: true,

    navigation: {
        nextEl: '.box-constructor-slider__button_right',
        prevEl: '.box-constructor-slider__button_left',
    }
})

const boxType = (e) => {
    selects.forEach(item => {
        item.classList.remove('box-constructor__select_active')
        if (e.target.getAttribute('data-eco-btn') === item.getAttribute('data-select-skin')) {
            item.classList.add('box-constructor__select_active')
            item.value = '0'
        }
    })
    sumOut.textContent = '0'
}


buttonsType.addEventListener('click', (e) => {
    if (e.target.checked) {
        boxType(e)
    }
})

selects.forEach(item => {
    item.addEventListener('change', (e) => {
        sumOut.textContent = e.target.value
    })
})