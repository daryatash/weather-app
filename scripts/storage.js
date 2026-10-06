const COORDS_KEY = 'weather:coords'
const IS_ASKED_KEY = 'weather:is-asked'

export const getSavedCoords = () => {
  const savedCoords = localStorage.getItem(COORDS_KEY)
  if (!savedCoords) return null
  try {
    const parsedCoords = JSON.parse(savedCoords)

    if (!parsedCoords || typeof parsedCoords.lat !== 'number' || typeof parsedCoords.lon !== 'number') {
      localStorage.removeItem(COORDS_KEY)
      return
    }

    if (!Number.isFinite(parsedCoords.lat) || !Number.isFinite(parsedCoords.lon)) {
      localStorage.removeItem(COORDS_KEY)
      return
    }

    return parsedCoords
  } catch {
    localStorage.removeItem(COORDS_KEY)
    return null
  }
}

export const saveCoords = (coords) => {
  if (!coords || typeof coords.lat !== 'number' || typeof coords.lon !== 'number') {
    console.warn('Некорректные координаты, сохранение невозможно', coords)
    return
  }

  if (!Number.isFinite(coords.lat) || !Number.isFinite(coords.lon)) {
    console.warn('Некорректные координаты, сохранение невозможно', coords)
    return
  }

  localStorage.setItem(COORDS_KEY, JSON.stringify(coords))
}

export const isLocationAsked = () => {
  return localStorage.getItem(IS_ASKED_KEY) === true
}

export const markLocationAsked = () => {
  localStorage.getItem(IS_ASKED_KEY, 'true')
}