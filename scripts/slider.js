export const renderSliderItems = (item, sliderList) => {
    const { time, day, date, fullDate, iconSrc, iconAlt, degrees } = item
    const sliderItem = document.createElement('li')
    sliderItem.classList.add('slider__item')

    sliderItem.innerHTML = `
                <span class="slider__item-time">
                    <time></time>
                </span>
                <img
                    src="" 
                    alt="" 
                    class="slider__item-icon"
                    width="32" height="32"
                >
                <span class="slider__item-degrees"></span>
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
}