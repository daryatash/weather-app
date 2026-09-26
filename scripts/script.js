import { getMeteoData, get5Days24HoursMeteoData } from './api.js'
import { mapWeather, mapWeatherCards, map24HoursCards, map5DaysCards } from './mappers.js'
import { renderSearch } from './search.js'
import { renderWeather, renderWeatherCards } from './weather.js'
import { scrollSlider } from './slider.js'
import { renderTabs, toggleTabs } from './tabs.js'

const data = await getMeteoData(55.0188, 82.9340)
const data5Days24Hours = await get5Days24HoursMeteoData(55.0188, 82.9340)
const weather = mapWeather(data)
const weatherCards = mapWeatherCards(data)
const hours24Cards = map24HoursCards(data5Days24Hours)
const days5Cards = map5DaysCards(data5Days24Hours)

renderSearch()
renderWeather(weather)
renderWeatherCards(weatherCards)
renderTabs(hours24Cards, days5Cards)
toggleTabs()
scrollSlider()