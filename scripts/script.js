import { getMeteoData } from './api.js'
import { mapWeather, mapWeatherCards } from './mappers.js'
import { renderSearch } from './search.js'
import { renderWeather, renderWeatherCards } from './weather.js'
import { renderTabs, toggleTabs } from './tabs.js'

const data = await getMeteoData(55.0188, 82.9340)
const weather = mapWeather(data)
const weatherCards = mapWeatherCards(data)
renderSearch()
renderWeather(weather)
renderWeatherCards(weatherCards)
renderTabs()
toggleTabs()