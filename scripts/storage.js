const COORDS_KEY = 'weather:coords'
const IS_ASKED_KEY = 'weather:is-asked'

export const getSavedCoords = () => {
  const savedCoords = localStorage.getItem(COORDS_KEY)
  if (!savedCoords) return null
  try {
    return JSON.parse(savedCoords)
  } catch {
    localStorage.removeItem(COORDS_KEY)
    return null
  }
}

export const saveCoords = (coords) => {
  localStorage.setItem(COORDS_KEY, JSON.stringify(coords))
}

export const isLocationAsked = () => {
  return localStorage.getItem(IS_ASKED_KEY) === true
}

export const markLocationAsked = () => {
  localStorage.getItem(IS_ASKED_KEY, 'true')
}