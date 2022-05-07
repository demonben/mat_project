'use strict'

const setContainer = document.querySelector('.constructor-set__choice')
const constructorOther = document.querySelector('.constructor-set__add')
const footerCheckbox = document.querySelector('.constructor-footer__checkbox')
const outputSum = document.querySelector('.constructor-footer__sum > span')
const fillerChoice = document.querySelector('.constructor-filler__choice')
const fillerColors = document.querySelectorAll('.constructor-filler-view__fillers')
const fillerColor = document.querySelector('.constructor-filler-view__fillers')
const fillerColorEva = document.querySelector('.constructor-filler-view__fillers_eva')
const patterns = document.querySelector('.constructor-filler-view__patterns')
const endingFillerColors = document.getElementById('edging-filler-color')
const endingSkinColors = document.getElementById('edging-color')
const image = document.querySelector('.constructor-filler__img > img')
const error = document.querySelector('.constructor__error')
const addCart = document.querySelector('.constructor-footer__button')


const appData = {
    fullPrice: 0,
    setPrice: 0,
    otherServices: 0,
    accessories: 0,
    typeCarped: '1',
    skinColor: '0',
    typePatterns: '0',
    colorStr: '0',
    colorFiller: '0',
    colorEdgingFiller: '0',
    colorEdgingSkin: '0',
    imageNumber: '0',
    numberRugs: '',
    skinColorName: '',
    colorStrName: '',
    otherServiceName: {
        row: '',
        trunk: '',
        foot: '',
        nameplate: ''
    },
    checkExists: (imageUrl, callback) => {
        const img = new Image();

        img.onerror = function() {
            callback(false);
        };

        img.onload = function() {
            callback(true);
        };

        img.src = imageUrl;
    },
    getFullPrice: () => {
        appData.fullPrice = appData.setPrice + appData.otherServices + appData.accessories
        outputSum.textContent = appData.fullPrice
        appData.checkExists(`./img/rugs/${appData.imageNumber}.jpg`, (exits) => {
            if (exits && appData.numberRugs !== '') {
                addCart.classList.add('constructor-footer__button_active')
                error.classList.remove('constructor__error_active')
            } else {
                addCart.classList.remove('constructor-footer__button_active')
                error.classList.add('constructor__error_active')
            }
        })
    },
    addFillerPrice: () => {
        fillerChoice.querySelectorAll('input').forEach(item => {
            if (item.getAttribute('id') !== 'skin' && item.checked) {
                if (appData.setPrice === 10000) {
                    appData.setPrice = 13000
                } else if (appData.setPrice === 7000) {
                    appData.setPrice = 8000
                } else if (appData.setPrice === 3000) {
                    appData.setPrice = 4000
                }
            }
        })
    },
    getImageNumber: () => {
        appData.imageNumber = appData.typeCarped + appData.skinColor + appData.typePatterns + appData.colorStr + appData.colorFiller + appData.colorEdgingFiller + appData.colorEdgingSkin
        if (appData.imageNumber.length === 7) {
            appData.checkExists(`./img/rugs/${appData.imageNumber}.jpg`, (exits) => {
                if (exits) {
                    image.setAttribute('src', `./img/rugs/${appData.imageNumber}.jpg`)
                    if (appData.numberRugs !== '') {
                        addCart.classList.add('constructor-footer__button_active')
                        error.classList.remove('constructor__error_active')
                    }
                } else {
                    image.setAttribute('src', `./img/products/product.png`)
                    error.classList.add('constructor__error_active')
                    addCart.classList.remove('constructor-footer__button_active')
                }
            })
        }
    },
    cleanFillerSkinColor: () => {
        document.querySelectorAll('.constructor-filler-view__skin').forEach(item => {
            item.classList.remove('active_flex')
        })
    },
    checkColorStr: () => {
        const colorsActive = document.querySelector('.constructor-filler-view__skin.active_flex')

        colorsActive.onclick = (e) => {
            if (e.target.checked) {
                appData.colorStr = `${e.target.value}`
                appData.colorStrName = `${e.target.getAttribute('aria-label')}`
                appData.getImageNumber()
            }
        }
    },
    checkSkinColor: (select) => {
        select.addEventListener('change', (e) => {
            appData.skinColor = `${e.target.value}`
            appData.skinColorName = `${e.target.options[e.target.selectedIndex].getAttribute('aria-label')}`
            if (e.target.value !== 'Цвета') {
                appData.checkColorStr()
                appData.getImageNumber()
            } else {
                e.target.value = 'Цвета'
            }
        })
    },
    setColorStr: (getId) => {
        if (getId.getAttribute('id') === 'skin-color-selector-romb-1') {
            getId.addEventListener('change', (e) => {
                if (e.target.value === '1') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-black')
                        .classList.add('active_flex')
                } else if (e.target.value === '2') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-blue')
                        .classList.add('active_flex')
                } else if (e.target.value === '3') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-gold')
                        .classList.add('active_flex')
                } else if (e.target.value === '4') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-burgundy')
                        .classList.add('active_flex')
                } else if (e.target.value === '5') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-gray')
                        .classList.add('active_flex')
                } else if (e.target.value === '6') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-brown')
                        .classList.add('active_flex')
                } else if (e.target.value === '7') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-sand')
                        .classList.add('active_flex')
                } else {
                    appData.cleanFillerSkinColor()
                }
            })
        } else {
            appData.cleanFillerSkinColor()
        }
        if (getId.getAttribute('id') === 'skin-color-selector-romb-2') {
            getId.addEventListener('change', (e) => {
                if (e.target.value === '1') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-2-black')
                        .classList.add('active_flex')
                } else if (e.target.value === '5') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-2-gray')
                        .classList.add('active_flex')
                } else if (e.target.value === '6') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-2-brown')
                        .classList.add('active_flex')
                } else if (e.target.value === '7') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-sand')
                        .classList.add('active_flex')
                } else {
                    appData.cleanFillerSkinColor()
                }
            })
        } else {
            appData.cleanFillerSkinColor()
        }
        if (getId.getAttribute('id') === 'skin-color-selector-romb-3') {
            getId.addEventListener('change', (e) => {
                if (e.target.value === '1') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-3-black')
                        .classList.add('active_flex')
                } else if (e.target.value === '2') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-3-blue')
                        .classList.add('active_flex')
                } else if (e.target.value === '7') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_romb-1-sand')
                        .classList.add('active_flex')
                } else {
                    appData.cleanFillerSkinColor()
                }
            })
        } else {
            appData.cleanFillerSkinColor()
        }
        if (getId.getAttribute('id') === 'skin-color-selector-square') {
            getId.addEventListener('change', (e) => {
                if (e.target.value === '1') {
                    appData.cleanFillerSkinColor()
                    document.querySelector('.constructor-filler-view__skin_square-black')
                        .classList.add('active_flex')
                } else {
                    appData.cleanFillerSkinColor()
                }
            })
        } else {
            appData.cleanFillerSkinColor()
        }
        appData.checkSkinColor(getId)
    },
    init: () => {
        setContainer.addEventListener('click', (e) => {
            if (e.target.closest('input')) {
                if (e.target.checked) {
                    appData.setPrice = +e.target.value
                    appData.addFillerPrice()
                    appData.numberRugs = `${e.target.getAttribute('aria-label')}`
                }
                appData.getFullPrice()
            }
        })
        constructorOther.addEventListener('click', (e) => {
            if (e.target.closest('input')) {
                if (e.target.checked) {
                    if (e.target.closest('#row')) {
                        appData.otherServiceName['row'] = e.target.getAttribute('aria-label')
                    } else if (e.target.closest('#trunk')) {
                        appData.otherServiceName['trunk'] = e.target.getAttribute('aria-label')
                    }
                    appData.otherServices += +e.target.value
                } else {
                    if (e.target.closest('#row')) {
                        appData.otherServiceName['row'] = ''
                    } else if (e.target.closest('#trunk')) {
                        appData.otherServiceName['trunk'] = ''
                    }
                    appData.otherServices -= +e.target.value
                }
                appData.getFullPrice()

            }
        })
        footerCheckbox.addEventListener('click', (e) => {
            if (e.target.closest('input')) {
                if (e.target.checked) {
                    if (e.target.closest('#for-foot')) {
                        appData.otherServiceName['foot'] = e.target.getAttribute('aria-label')
                    } else if (e.target.closest('#nameplate')) {
                        appData.otherServiceName['nameplate'] = e.target.getAttribute('aria-label')
                    }
                    appData.accessories += +e.target.value
                } else {
                    if (e.target.closest('#for-foot')) {
                        appData.otherServiceName['foot'] = ''
                    } else if (e.target.closest('#nameplate')) {
                        appData.otherServiceName['nameplate'] = ''
                    }
                    appData.accessories -= +e.target.value
                }
                appData.getFullPrice()
            }
        })
        fillerChoice.onclick = (e) => {
            if (e.target.closest('input')) {
                if (e.target.checked) {
                    appData.addFillerPrice()
                    appData.typeCarped = `${e.target.value}`
                    document.querySelectorAll('.display_none')
                        .forEach(item => {
                        item.classList.remove('display_none')
                    })
                }
                if (e.target.getAttribute('id') === 'eva') {
                    fillerColor.classList.remove('active_flex')
                    fillerColorEva.classList.add('active_flex')
                } else {
                    fillerColor.classList.add('active_flex')
                    fillerColorEva.classList.remove('active_flex')
                }
            }
            appData.getFullPrice()
        }
        patterns.onclick = (e) => {
            if (e.target.closest('input')) {
                if (e.target.checked) {
                    appData.typePatterns = `${e.target.value}`

                    document.querySelectorAll('select[name="skin-color-selector"]').forEach(item => {
                        item.classList.remove('active')
                        item.value = 'Цвета'
                    })
                    const getId = document.getElementById(`${e.target.getAttribute('data-pattern')}`)

                    getId.classList.add('active')
                    appData.setColorStr(getId)
                    appData.getImageNumber()
                }
            }
        }
        fillerColors.forEach(item => {
            item.onclick = (e) => {
                if (e.target.checked) {
                    appData.colorFiller = `${e.target.value}`
                    appData.getImageNumber()
                }
            }
        })
        endingFillerColors.addEventListener('change', (e) => {
            if (e.target.value !== 'Наполнителя') {
                appData.colorEdgingFiller = `${e.target.value}`
                appData.getImageNumber()
            } else {
                appData.colorEdgingFiller = `0`
            }
        })
        endingSkinColors.addEventListener('change', (e) => {
            if (e.target.value !== 'Кожи') {
                appData.colorEdgingSkin = `${e.target.value}`
                appData.getImageNumber()
            } else {
                appData.colorEdgingSkin = `0`
            }
        })
    },
}

appData.init()

const swiper = new Swiper('.advertising-slider', {
    loop: true,

    navigation: {
        nextEl: '.box-constructor-slider__button_right',
        prevEl: '.box-constructor-slider__button_left',
    },

    pagination: {
        el: ".advertising-slider-pagination",
    },
})

const accordion = () => {
    const accordionItem = document.querySelector('.accordion-item')

    accordionItem.addEventListener('click', (e) => {
        if (e.target.closest('li') && !e.target.closest('li').classList.contains('active')) {
            e.target.closest('li').classList.add('active')
            e.target.closest('li').querySelector('.accordion-item__ask').style.display = 'block'
            e.target.closest('li').querySelector('.accordion-item__plus > span:last-of-type').style.transform = 'rotate(0)'
        } else {
            e.target.closest('li').classList.remove('active')
            e.target.closest('li').querySelector('.accordion-item__ask').style.display = ''
            e.target.closest('li').querySelector('.accordion-item__plus > span:last-of-type').style.transform = ''
        }
    })
}

accordion()