import { sliderData } from './sliderData.js'

export const renderTabs = () => {
    const stateClasses = {
        active: 'active'
    }

    const stateAttributes = {
        dataTab: 'data-tab',
        role: 'role',
        ariaControls: 'aria-controls',
        ariaSelected: 'aria-selected',
        id: 'id'
    }

    const tabsMenu = document.querySelector('.tabs__menu')
    const tabsBody = document.querySelector('.tabs__body')

    sliderData.forEach((forecast, index) => {
        const { id, title } = forecast

        const tabsButton = document.createElement('button')
        tabsButton.classList.add('tabs__button')
        tabsButton.setAttribute(stateAttributes.dataTab, id)
        tabsButton.setAttribute(stateAttributes.role, 'tab')
        tabsButton.setAttribute(stateAttributes.ariaControls, id)
        tabsButton.setAttribute(stateAttributes.ariaSelected, 'false')
        tabsButton.textContent = `${title}`

        const tabsContent = document.createElement('div')
        tabsContent.classList.add('tabs__content')
        tabsContent.setAttribute(stateAttributes.id, id)
        tabsContent.setAttribute(stateAttributes.role, 'tabpanel')

        const tabsSlider = document.createElement('div')
        tabsSlider.classList.add('tabs__slider')
        tabsSlider.classList.add('slider')

        tabsContent.appendChild(tabsSlider)

        if (index === 0) {
            tabsButton.classList.add(stateClasses.active)
            tabsButton.setAttribute(stateAttributes.ariaSelected, 'true')
            tabsContent.classList.add(stateClasses.active)
        }

        tabsMenu.appendChild(tabsButton)
        tabsBody.appendChild(tabsContent)
    })

    const tabsButtons = document.querySelectorAll('.tabs__button')

    tabsButtons.forEach(button => { 
        button.addEventListener('click', () => {
            const prevActiveTabButton = document.querySelector(`.tabs__button.${stateClasses.active}`)
            const prevActiveTabContent = document.querySelector(`.tabs__content.${stateClasses.active}`)

            if (prevActiveTabButton) {
                prevActiveTabButton.classList.remove(stateClasses.active)
                prevActiveTabButton.setAttribute(stateAttributes.ariaSelected, 'false')
            }

            if (prevActiveTabContent) {
                prevActiveTabContent.classList.remove(stateClasses.active)
            }

            button.classList.add(stateClasses.active)
            button.setAttribute(stateAttributes.ariaSelected, 'true')
            
            const nextActiveTabContent = document.getElementById(button.getAttribute(stateAttributes.dataTab))
            nextActiveTabContent.classList.add(stateClasses.active)
        })
    })
}