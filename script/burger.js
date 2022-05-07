'use strict'

const burger  = (burgerBtn, closeBtn, modal, activeClass) => {
    const menuOpen = document.querySelector(`.${burgerBtn}`)
    const menuClose = document.querySelector(`.${closeBtn}`)
    const menu = document.querySelector(`.${modal}`)

    menuOpen.addEventListener('click', () => {
        menu.classList.add(`${activeClass}`)
    })
    menuClose.addEventListener('click', () => {
        menu.classList.remove(`${activeClass}`)
    })
}

burger('header-burger', 'header__close', 'header__wr', 'header__wr_active')