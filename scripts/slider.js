import { sliderData } from './sliderData.js'

export const renderSlider = () => {
    sliderData.forEach((forecast) => {
        const tabContent = document.getElementById(forecast.id)
        const slider = tabContent.querySelector('.slider')

        const leftButton = document.createElement('button')
        leftButton.classList.add('slider__button', 'slider__button--left')
        leftButton.setAttribute('disabled', 'true')

        const leftButtonIcon = document.createElement('img')
        leftButtonIcon.classList.add('slider__button-icon')
        leftButtonIcon.src = '../../public/icons/arrow-left.svg'
        leftButtonIcon.alt = 'Назад'
        leftButtonIcon.width = 24
        leftButtonIcon.height = 24
        leftButton.appendChild(leftButtonIcon)

        const sliderList = document.createElement('ul')
        sliderList.classList.add('slider__list')

        forecast.items.forEach((item) => {
            const { time, day, date, fullDate, iconSrc, iconAlt, degrees } = item
            const sliderItem = document.createElement('li')
            sliderItem.classList.add('slider__item')

            sliderItem.innerHTML = `
                <p class="slider__item-time">
                    <time></time>
                </p>
                <img
                    src="" 
                    alt="" 
                    class="slider__item-icon"
                    width="32" height="32"
                >
                <p class="slider__item-degrees"></p>
            `

            const timeElement = sliderItem.querySelector('time')

            if (day) {
                sliderItem.querySelector('.slider__item-time').firstChild.textContent = `${day}, `
                timeElement.textContent = date
                timeElement.setAttribute('datetime', fullDate)
            }

            if (time) {
                timeElement.textContent = time
                timeElement.setAttribute('datetime', time)
            }

            sliderItem.querySelector('.slider__item-icon').src = iconSrc
            sliderItem.querySelector('.slider__item-icon').alt = iconAlt

            sliderItem.querySelector('.slider__item-degrees').textContent = degrees

            sliderList.appendChild(sliderItem)
        })

        const rightButton = document.createElement('button')
        rightButton.classList.add('slider__button', 'slider__button--right')

        const rightButtonIcon = document.createElement('img')
        rightButtonIcon.classList.add('slider__button-icon')
        rightButtonIcon.src = '../../public/icons/arrow-right.svg'
        rightButtonIcon.alt = 'Вперед'
        rightButtonIcon.width = 24
        rightButtonIcon.height = 24
        rightButton.appendChild(rightButtonIcon)

        slider.appendChild(leftButton)
        slider.appendChild(sliderList)
        slider.appendChild(rightButton)
    })
}