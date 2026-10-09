const PROXY_URL = 'https://weather-proxy-daryatash.netlify.app'

export async function getMeteoData(lat, lon) {
  const response = await fetch(`${PROXY_URL}/.netlify/functions/weather?lat=${lat}&lon=${lon}`)
  if (!response.ok) {
    throw new Error(`HTTP ошибка! Код ${response.status}`)
  }
  const data = await response.json()
  return data
}

export async function get5Days24HoursMeteoData(lat, lon) {
  const response = await fetch(`${PROXY_URL}/.netlify/functions/forecast?lat=${lat}&lon=${lon}`)
  if (!response.ok) {
    throw new Error(`HTTP ошибка! Код ${response.status}`)
  }
  const data = await response.json()
  return data
}

export async function getCityByName(query, signal) {
  const response = await fetch(`${PROXY_URL}/.netlify/functions/geocode?q=${encodeURIComponent(query)}`, { signal })
  if (!response.ok) {
    throw new Error(`HTTP ошибка! Код ${response.status}`)
  }
  const data = await response.json()
  return data.features
}