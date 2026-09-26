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

const getActiveList = () => {
    const activePanel = document.querySelector('.slider__tabpanel.active')
    return activePanel.querySelector('.slider__list')
}

export const updateSlider = () => {
    const list = getActiveList()
    const prevButton = document.querySelector('.slider__button[aria-label="Назад"]')
    const nextButton = document.querySelector('.slider__button[aria-label="Вперед"]')
    const atStart = list.scrollLeft <= 0
    const atEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1
    const noScroll = list.scrollWidth <= list.clientWidth
    prevButton.disabled = atStart
    nextButton.disabled = atEnd
    list.classList.toggle('slider__list--fade-left', !atStart && !noScroll)
    list.classList.toggle('slider__list--fade-right', !atEnd && !noScroll)
}

export const scrollSlider = () => {
    const prevButton = document.querySelector('.slider__button[aria-label="Назад"]')
    const nextButton = document.querySelector('.slider__button[aria-label="Вперед"]')

    const scroll = (direction) => {
        const list = getActiveList()
        list.scrollBy({
            left: direction * list.clientWidth,
            behavior: "smooth"
        })
    }

    prevButton.addEventListener('click', () => scroll(-1))
    nextButton.addEventListener('click', () => scroll(1))

    document.querySelectorAll('.slider__list').forEach(list => {
        list.addEventListener('scroll', updateSlider)
    })

    updateSlider()
}