import { getSavedCoords, saveCoords, isLocationAsked, markLocationAsked } from './storage.js'
import { getMeteoData, get5Days24HoursMeteoData } from './api.js'
import { mapWeather, mapWeatherCards, map24HoursCards, map5DaysCards } from './mappers.js'
import { renderSearch } from './search.js'
import { renderWeather, renderWeatherCards } from './weather.js'
import { scrollSlider, attachSliderScroll } from './slider.js'
import { renderTabs, toggleTabs } from './tabs.js'

const DEFAULT_COORDS = { lat: 55.7558, lon: 37.6173 } 

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error)
    )
  })
}

const loadWeather = async (lat, lon) => {
  const data = await getMeteoData(lat, lon)
  const data5Days24Hours = await get5Days24HoursMeteoData(lat, lon)
  const weather = mapWeather(data)
  const weatherCards = mapWeatherCards(data)
  const hours24Cards = map24HoursCards(data5Days24Hours)
  const days5Cards = map5DaysCards(data5Days24Hours)

  renderWeather(weather)
  renderWeatherCards(weatherCards)
  renderTabs(hours24Cards, days5Cards)
  toggleTabs()
  attachSliderScroll()
}

const init = async () => {
  renderSearch()
  scrollSlider()

  const saved = getSavedCoords()

  if (saved) {
    loadWeather(saved.lat, saved.lon)
    return
  }

  await loadWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon)

  if (isLocationAsked()) return

  markLocationAsked()

  getPosition()
    .then(coords => {
      const { latitude: lat, longitude: lon } = coords
      saveCoords({ lat, lon })
      loadWeather(coords.latitude, coords.longitude)
    })
    .catch(error => {
      console.warn('Геолокация недоступна:', error.message)
    })
}

init()