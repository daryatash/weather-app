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