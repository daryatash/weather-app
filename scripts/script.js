const searchInput = document.querySelector('.search__input')
const clearButton = document.querySelector('.search__clear-button')
const searchForm = document.querySelector('.search')

const onInput = (event) => {
    console.log(event.target.value)
    if (event.target.value.trim() !== '') {
        clearButton.classList.remove('hidden')
    } else {
        clearButton.classList.add('hidden')
    }
}

const onClearInput = (event) => {
    searchInput.value = ''
    clearButton.classList.add('hidden')
}

searchInput.addEventListener('input', onInput)

clearButton.addEventListener('click', onClearInput)

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
})

const renderMeteoData = () => {
    const cardsList = document.querySelector('.cards')
    cardsList.innerHTML = ''

    meteoData.forEach((card) => {
        const cardsItem = document.createElement('li')

        cardsItem.className = 'cards__item'
        cardsItem.innerHTML = `
            <h3 class="cards__item-title">${card.title}</h3>
            <img src="${card.icon}" alt="" class="cards__item-icon">
            <div class="cards__item-value">${card.value}</div>
            <div class="cards__item-more">
                ${card.more.progressBar 
                    ? `<div class="cards__item-progress progress">
                            <progress class="progress__bar ${card.title === 'Давление' ? 'progress__bar--pressure' : ''}" value="${card.more.progressValue}" max="${card.more.progressMax}">${card.value}</progress>
                            <span class="progress__value" style="left: ${(card.more.progressValue / card.more.progressMax) * 100}%"></span>
                        </div>`
                    : ''
                }
                ${card.more.secondDescription 
                    ? `<div class="cards__item-descriptions">
                            <div>${card.more.firstDescription}</div>
                            <div>${card.more.secondDescription ? card.more.secondDescription : ''}</div>
                        </div>`
                    : `<div class="cards__item-description">
                            ${card.more.firstDescription}
                        </div>`
                }
            </div>
        `
        cardsList.appendChild(cardsItem)
    })
}

document.addEventListener('DOMContentLoaded', function() {
  renderMeteoData()
})