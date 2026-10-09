import { getSavedCoords, saveCoords, isLocationAsked, markLocationAsked } from './storage.js'
import { getMeteoData, get5Days24HoursMeteoData, getCityByName } from './api.js'
import { mapWeather, mapWeatherCards, map24HoursCards, map5DaysCards } from './mappers.js'
import { renderSearch } from './search.js'
import { renderWeather, renderWeatherCards } from './weather.js'
import { scrollSlider, attachSliderScroll } from './slider.js'
import { renderTabs, toggleTabs } from './tabs.js'
import { showLoader, hideLoader } from './loader.js'

const DEFAULT_COORDS = { lat: 55.7558, lon: 37.6173 } 

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error)
    )
  })
}

const loadWeather = async (lat, lon, cityName) => {
  showLoader()
  try {
    const data = await getMeteoData(lat, lon)
    const data5Days24Hours = await get5Days24HoursMeteoData(lat, lon)
    const weather = mapWeather(data, cityName)
    const weatherCards = mapWeatherCards(data)
    const hours24Cards = map24HoursCards(data5Days24Hours)
    const days5Cards = map5DaysCards(data5Days24Hours)

    renderWeather(weather)
    renderWeatherCards(weatherCards)
    renderTabs(hours24Cards, days5Cards)
    toggleTabs()
    attachSliderScroll()
  } finally {
    hideLoader()
  }
}

const handleSearch = async (query, signal) => {
  const results = await getCityByName(query, signal)
  return results.map(item => ({
    lat: item.properties.coordinates.latitude,
    lon: item.properties.coordinates.longitude,
    label: `${item.properties.name}, ${item.properties.place_formatted ?? ''}`,
    name: item.properties.name
  }))
}

const handleSelect = async (item) => {
  const { lat, lon, name } = item
  saveCoords({ lat, lon, name })
  await loadWeather(lat, lon, name)
}

const init = async () => {
  renderSearch(handleSearch, handleSelect)
  scrollSlider()

  const saved = getSavedCoords()

  if (saved) {
    loadWeather(saved.lat, saved.lon, saved.name)
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