const latNsk = 55.0188
const lonNsk = 82.9340
const API_key = '01a4e64120ae63b6e8e5a12837f5c87f'

export async function getMeteoData(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=01a4e64120ae63b6e8e5a12837f5c87f`)
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Код ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Ошибка: ${error}`)
    throw error
  }
}

export async function get5Days3HoursMeteoData(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=01a4e64120ae63b6e8e5a12837f5c87f`)
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Код ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Ошибка: ${error}`)
    throw error
  }
}