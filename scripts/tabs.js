export const tabs = () => {
    const tabsButons = document.querySelectorAll('.tabs__button')

    tabsButons.forEach(button => { 
        button.addEventListener('click', () => {
            const prevActiveTabButton = document.querySelector('.tabs__button.active')
            const prevActiveTabContent = document.querySelector('.tabs__content.active')

            if (prevActiveTabButton) {
                prevActiveTabButton.classList.remove('active')
            }

            if (prevActiveTabContent) {
                prevActiveTabContent.classList.remove('active')
            }

            button.classList.add('active')
            
            const nextActiveTabContent = document.getElementById(button.getAttribute('data-tab'))
            nextActiveTabContent.classList.add('active')
        })
    })
}