import { renderSliderItems, updateSlider } from './slider.js'
import { sliderHoursData, sliderDaysData } from './sliderData.js'

const stateClasses = {
  active: "active",
}

const stateAttributes = {
  dataTab: "data-tab",
  role: "role",
  ariaControls: "aria-controls",
  ariaSelected: "aria-selected",
  ariaLabelledBy: "aria-labelledby",
  id: "id",
  type: "type",
}

const createTabsButtonElement = (id, tabButtonId, title) => {
    const button = document.createElement('button')
    button.classList.add('tabs__button')
    button.setAttribute(stateAttributes.type, 'button')
    button.setAttribute(stateAttributes.dataTab, id)
    button.setAttribute(stateAttributes.id, tabButtonId)
    button.setAttribute(stateAttributes.role, 'tab')
    button.setAttribute(stateAttributes.ariaControls, id)
    button.setAttribute(stateAttributes.ariaSelected, 'false')
    button.textContent = `${title}`

    return button
}

const createTabsPanelElement = (id, tabButtonId) => {
    const panel = document.createElement('div')
    panel.classList.add('slider__tabpanel')
    panel.setAttribute(stateAttributes.id, id)
    panel.setAttribute(stateAttributes.ariaLabelledBy, tabButtonId)
    panel.setAttribute(stateAttributes.role, 'tabpanel')

    return panel
}

export const renderTabs = (data1, data2) => {
    const tabsMenu = document.querySelector('.tabs__menu')
    const sliderContent = document.querySelector('.slider__content')

    const sliderData = [data1, data2]

    sliderData.forEach((forecast, index) => {
        const { id, title } = forecast

        const tabsItem = document.createElement('li')
        tabsItem.classList.add('tabs__item')
        tabsMenu.appendChild(tabsItem)

        const tabButtonId = `button-${id}`

        const tabsButton = createTabsButtonElement(id, tabButtonId, title)
        const sliderTabPanel = createTabsPanelElement(id, tabButtonId)

        const sliderList = document.createElement('ul')
        sliderList.classList.add('slider__list')

        forecast.items.forEach((item) => renderSliderItems(item, sliderList))

        sliderTabPanel.appendChild(sliderList)

        if (index === 0) {
            tabsButton.classList.add(stateClasses.active)
            tabsButton.setAttribute(stateAttributes.ariaSelected, 'true')
            sliderTabPanel.classList.add(stateClasses.active)
        }

        tabsItem.appendChild(tabsButton)
        sliderContent.appendChild(sliderTabPanel)
    })
}

export const toggleTabs = () => {
    const tabsButtons = document.querySelectorAll('.tabs__button')

    tabsButtons.forEach(button => { 
        button.addEventListener('click', () => {
            const prevActiveTabButton = document.querySelector(`.tabs__button.${stateClasses.active}`)
            const prevActiveTabPanel = document.querySelector(`.slider__tabpanel.${stateClasses.active}`)

            if (prevActiveTabButton) {
                prevActiveTabButton.classList.remove(stateClasses.active)
                prevActiveTabButton.setAttribute(stateAttributes.ariaSelected, 'false')
            }

            if (prevActiveTabPanel) {
                prevActiveTabPanel.classList.remove(stateClasses.active)
            }

            button.classList.add(stateClasses.active)
            button.setAttribute(stateAttributes.ariaSelected, 'true')
            
            const nextActiveTabPanel = document.getElementById(button.getAttribute(stateAttributes.dataTab))
            nextActiveTabPanel.classList.add(stateClasses.active)

            updateSlider()
        })
    })
}