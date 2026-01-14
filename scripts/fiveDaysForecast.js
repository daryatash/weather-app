import { fiveDaysData } from './data.js'

export const renderFiveDaysData = () => {
    const sliderList = document.querySelector('[data-js-5d]')
    sliderList.innerHTML = ""

    fiveDaysData.forEach(item => {
        const sliderItem = document.createElement('li')
        sliderItem.classList.add('slider__item')
        sliderItem.classList.add('slider__item--wide')

        sliderItem.innerHTML = `
            <p class="slider__item-time">${item.day}, <time datetime="${item.fullDate}">${item.date}</time></p>
            <img 
                src="${item.iconSrc}" 
                alt="${item.iconAlt}" 
                class="slider__item-icon"
                width="32" height="32"
            >
            <p class="slider__item-degrees">${item.degrees}</p>
        `

        sliderList.appendChild(sliderItem)
    })
}